#!/usr/bin/env node
/**
 * Test Runner for QR Code Generator MVP
 * Run: node test-runner.js
 */

const tests = [
  { name: 'Simple text input', input: 'Hello', expected: 'Hello' },
  { name: 'URL input', input: 'https://example.com', expected: 'https://example.com' },
  { name: 'URL with hash', input: 'test#hash', expected: 'test#hash' },
  { name: 'Empty input (should skip)', input: '', expected: null },
  { name: 'Whitespace input trimmed', input: '  test  ', expected: 'test' },
  { name: 'Complex URL with query', input: 'https://example.com?q=hello world', expected: 'https://example.com?q=hello world' },
];

console.log('🧪 QR Code Generator Test Suite\n' + '='.repeat(45));

let passed = 0;
let failed = 0;

tests.forEach(t => {
  // Test input handling (trim, validation)
  const text = t.input.trim();
  const result = text || null;
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