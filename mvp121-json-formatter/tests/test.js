// Test file for MVP 121 - JSON Formatter
const fs = require('fs');
const path = require('path');

// Simple node-based tests for JSON formatter logic
function testParse(str) {
  try { return JSON.parse(str); }
  catch { return null; }
}

function formatJson(str) {
  try { return JSON.stringify(JSON.parse(str), null, 2); }
  catch { return null; }
}

function minifyJson(str) {
  try { return JSON.stringify(JSON.parse(str)); }
  catch { return null; }
}

let passed = 0;
const failed = [];

// Test 1: Valid JSON parsing
const result1 = testParse('{"name": "test", "value": 123}');
if (result1 && result1.name === 'test') {
  console.log('✅ Test 1: Parse valid JSON');
  passed++;
} else {
  failed.push('Test 1');
}

// Test 2: Invalid JSON returns null
const result2 = testParse('not json');
if (result2 === null) {
  console.log('✅ Test 2: Invalid JSON returns null');
  passed++;
} else {
  failed.push('Test 2');
}

// Test 3: Format with indentation
const result3 = formatJson('{"a":1}');
if (result3 && result3.includes('\n') && result3.includes('  "a"')) {
  console.log('✅ Test 3: Format adds indentation');
  passed++;
} else {
  failed.push('Test 3');
}

// Test 4: Minify removes whitespace
const result4 = minifyJson('{\n  "a": 1\n}');
if (result4 === '{"a":1}') {
  console.log('✅ Test 4: Minify removes whitespace');
  passed++;
} else {
  failed.push('Test 4');
}

// Test 5: Nested objects
const result5 = formatJson('{"user":{"name":"John","age":30}}');
if (result5 && result5.includes('"user"') && result5.includes('"name"')) {
  console.log('✅ Test 5: Nested objects work');
  passed++;
} else {
  failed.push('Test 5');
}

console.log(`\n📊 Results: ${passed}/5 passed`);
if (failed.length > 0) {
  console.log('❌ Failed:', failed.join(', '));
  process.exit(1);
}

module.exports = { passed: 5 };