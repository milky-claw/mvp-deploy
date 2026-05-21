// Test runner for MVP133 JSON-YAML Converter
const jsyaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (e) {
    console.log(`❌ ${name}: ${e.message}`);
    failed++;
  }
}

function assertEqual(actual, expected, msg = '') {
  if (actual !== expected) {
    throw new Error(`${msg}\nExpected: ${expected}\nActual: ${actual}`);
  }
}

// Load js-yaml (using node module if available, or vendor)
let yaml;
try {
  yaml = require('js-yaml');
} catch {
  console.log('js-yaml not installed via npm, skipping npm tests');
  process.exit(failed > 0 ? 1 : 0);
}

// Tests
test('JSON to YAML - simple object', () => {
  const json = { name: 'test', value: 123 };
  const result = yaml.dump(json);
  assertEqual(result.trim(), 'name: test\nvalue: 123');
});

test('JSON to YAML - nested object', () => {
  const json = { user: { name: 'John', age: 30 } };
  const result = yaml.dump(json);
  assertEqual(result.trim(), 'user:\n  name: John\n  age: 30');
});

test('YAML to JSON - simple', () => {
  const yamlStr = 'name: test\nvalue: 123';
  const result = yaml.load(yamlStr);
  assertEqual(JSON.stringify(result), '{"name":"test","value":123}');
});

test('JSON array to YAML', () => {
  const json = { items: ['a', 'b', 'c'] };
  const result = yaml.dump(json);
  if (!result.includes('items:')) throw new Error('Should contain items key');
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);