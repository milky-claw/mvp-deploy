const fs = require('fs');
const path = require('path');

const results = [];

function test(name, fn) {
  try {
    fn();
    results.push({ name, pass: true });
    console.log(`✅ ${name}`);
  } catch (e) {
    results.push({ name, pass: false, error: e.message });
    console.log(`❌ ${name}: ${e.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

// Test the URL encoding/decoding logic
function encode(text) {
  try {
    return encodeURIComponent(text);
  } catch (e) {
    return 'Error: ' + e.message;
  }
}

function decode(text) {
  try {
    return decodeURIComponent(text);
  } catch (e) {
    return 'Error: Invalid encoded string';
  }
}

// FUNCTIONAL TESTS

test('encodeURIComponent basic text', () => {
  assert(encode('hello world') === 'hello%20world', 'Failed');
});

test('encodeURIComponent URL', () => {
  const result = encode('https://example.com?q=hello world');
  const expected = 'https%3A%2F%2Fexample.com%3Fq%3Dhello%20world';
  assert(result === expected, `Got ${result}`);
});

test('encodeURIComponent special chars', () => {
  assert(encode('test&foo=bar') === 'test%26foo%3Dbar', 'Failed');
});

test('encodeURIComponent unicode', () => {
  assert(encode('žemė') === '%C5%BEem%C4%97', 'Failed for unicode');
});

test('decodeURIComponent reverse', () => {
  assert(decode('hello%20world') === 'hello world', 'Failed');
});

test('decodeURIComponent URL', () => {
  const result = decode('https%3A%2F%2Fexample.com%3Fq%3Dhello%20world');
  assert(result === 'https://example.com?q=hello world', 'Failed');
});

// Summary
const passed = results.filter(r => r.pass).length;
console.log(`\n📊 ${passed}/${results.length} functional tests passed`);
process.exit(passed === results.length ? 0 : 1);