
const crypto = require('crypto');

/**
 * A simple utility script to test webhook signatures
 * Usage: node test-webhook-signature.js <secret> <payload>
 */

// Get command line arguments
const secret = process.argv[2];
const payload = process.argv[3] || '{"test":"payload"}';

if (!secret) {
  console.error('Error: Secret is required');
  console.log('Usage: node test-webhook-signature.js <secret> <payload>');
  process.exit(1);
}

// Calculate signature
const hmac = crypto.createHmac('sha256', secret);
const signature = hmac.update(payload).digest('hex');

console.log('=== Webhook Signature Test ===');
console.log('Secret:', secret);
console.log('Payload:', payload);
console.log('Signature:', signature);
console.log('\nTo test with curl:');
console.log(`curl -X POST \\
  -H "Content-Type: application/json" \\
  -H "sanity-webhook-signature: ${signature}" \\
  -d '${payload}' \\
  http://localhost:3000/api/sanity-webhook`);

console.log('\nTo use with Postman or other API tools:');
console.log('Set header "sanity-webhook-signature" to:', signature);

// Create a different payload to show invalid signature
const invalidPayload = JSON.stringify({...JSON.parse(payload), tampered: true});
const invalidSignature = crypto.createHmac('sha256', secret).update(invalidPayload).digest('hex');

console.log('\n=== Invalid Signature Example ===');
console.log('Modified payload:', invalidPayload);
console.log('Invalid signature:', invalidSignature);
console.log('Using this signature with the original payload should be rejected');
