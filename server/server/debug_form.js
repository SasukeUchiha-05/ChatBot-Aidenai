const express = require('express');
const app = express();
app.use(express.json());

// Simple test extraction function
const testExtraction = (text) => {
  const data = {};
  console.log('🔍 Testing extraction on:', text);
  
  // Name patterns
  const namePatterns = [
    /(?:name|myself)\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)?)/i,
    /(?:my\s+name\s+is|i\s+am)\s+([a-zA-Z]+(?:\s+[a-zA-Z]+)?)/i
  ];
  
  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      data.name = match[1].trim();
      console.log('✅ Name found:', data.name);
      break;
    }
  }
  
  // Email extraction
  const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (emailMatch) {
    data.email = emailMatch[1];
    console.log('✅ Email found:', data.email);
  }
  
  // Phone extraction
  const phonePatterns = [
    /phone\s+([0-9-+\s()]{7,20})/i,
    /contact\s+(?:is|number)?\s*([0-9-+\s()]{7,20})/i
  ];
  
  for (const pattern of phonePatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const cleanPhone = match[1].replace(/[^0-9+]/g, '');
      if (cleanPhone.length >= 7) {
        data.phone = match[1].trim();
        console.log('✅ Phone found:', data.phone);
        break;
      }
    }
  }
  
  console.log('🔍 Final data:', data);
  return data;
};

// Test cases
const testCases = [
  'name John Doe, email john@test.com, phone 1234567890',
  'My name is Alice, email alice@example.com, contact is 555123456',
  'I am Bob, email bob@test.com, phone 9876543210'
];

console.log('🧪 Testing Form Extraction Patterns Directly...\n');

testCases.forEach((test, index) => {
  console.log(`📝 Test ${index + 1}: "${test}"`);
  const result = testExtraction(test);
  console.log('📋 Extracted:', JSON.stringify(result, null, 2));
  console.log('---\n');
});
