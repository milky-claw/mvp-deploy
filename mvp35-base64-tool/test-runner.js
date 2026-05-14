#!/usr/bin/env node
/**
 * Test Runner for Base64 Tool MVP
 * Run: node test-runner.js
 * 
 * Tests the encode/decode logic from the MVP
 */

// These match the logic in index.html
function encode(text) {
  if (!text) return '';
  return btoa(unescape(encodeURIComponent(text)));
}

function decode(b64) {
  if (!b64) return '';
  return decodeURIComponent(escape(atob(b64)));
}

const tests = [
  // Encode tests
  { name: 'Encode simple ASCII', input: 'Hello', expected: 'SGVsbG8=', fn: encode },
  { name: 'Encode email', input: 'test@example.com', expected: 'dGVzdEBleGFtcGxlLmNvbQ==', fn: encode },
  { name: 'Encode empty', input: '', expected: '', fn: encode },
  { name: 'Encode Unicode (emoji)', input: '👋 Hello', expected: '8J+RiyBIZWxsbw==', fn: encode }, // Node.js escapes slightly differently
  { name: 'Encode Unicode (Lithuanian)', input: 'Lietuva', expected: 'TGlldHV2YQ==', fn: encode },
  
  // Decode tests
  { name: 'Decode simple Base64', input: 'SGVsbG8=', expected: 'Hello', fn: decode },
  { name: 'Decode email', input: 'dGVzdEBleGFtcGxlLmNvbQ==', expected: 'test@example.com', fn: decode },
  { name: 'Decode empty', input: '', expected: '', fn: decode },
  { name: 'Decode Unicode emoji', input: '8J+RiyBIZWxsbw==', expected: '👋 Hello', fn: decode },
  
  // Round-trip tests
  { name: 'Round-trip: ASCII', input: 'Test 123', fn: (s) => decode(encode(s)), expected: 'Test 123' },
  { name: 'Round-trip: Unicode', input: 'Japonskas', fn: (s) => decode(encode(s)), expected: 'Japonskas' },
  { name: 'Round-trip: Emoji', input: '🎉 Party!', fn: (s) => decode(encode(s)), expected: '🎉 Party!' },
];

console.log('🧪 Base64 Tool Test Suite\n' + '='.repeat(45));

let passed = 0;
let failed = 0;

tests.forEach(t => {
  let result;
  try {
    result = t.fn(t.input);
  } catch (e) {
    result = 'ERROR: ' + e.message;
  }
  const ok = result === t.expected;
  
  console.log(`${ok ? '✅' : '❌'} ${t.name}`);
  if (!ok) {
    console.log(`   Input: "${t.input}"`);
    console.log(`   Expected: ${JSON.stringify(t.expected)}`);
    console.log(`   Got:      ${JSON.stringify(result)}`);
    failed++;
  } else {
    passed++;
  }
});

console.log('\n' + '='.repeat(45));
console.log(`📊 Results: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);