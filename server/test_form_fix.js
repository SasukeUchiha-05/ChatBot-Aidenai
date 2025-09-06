const fetch = require('node-fetch');

async function testFormExtraction() {
  console.log('🧪 Testing Form Extraction with Various Patterns...\n');
  
  const testCases = [
    'I want to fill form with name John Doe, email john@test.com, phone 1234567890',
    'My name is Alice, email alice@example.com, contact is 555123456',
    'Fill form: name Bob Smith, email bob@email.com, phone 9876543210, description Need urgent help',
    'name Sarah, email sarah@test.com, phone 555-0123',
    'I am Mike, email mike@domain.com, contact number is 123456789'
  ];
  
  for (const query of testCases) {
    console.log(`📝 Testing: "${query}"`);
    
    try {
      const response = await fetch('http://localhost:5001/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      const result = await response.json();
      
      if (result.specialAction === 'fill_form') {
        console.log('✅ FORM DETECTED!');
        console.log('📋 Form Data:', JSON.stringify(result.formData, null, 2));
        console.log('💬 Message:', result.message);
      } else {
        console.log('❌ No form detected');
        console.log('🎯 Service Match:', result.internal?.match || 'None');
      }
      
    } catch (error) {
      console.error('❌ API Error:', error.message);
    }
    
    console.log('---\n');
  }
}

testFormExtraction();
