// Simple test runner (no window dependency)
const base64Encode = (str) => btoa(unescape(encodeURIComponent(str)));
const base64Decode = (b64) => decodeURIComponent(escape(atob(b64)));

const tests = [];

function test(name, fn) {
  try {
    fn();
    tests.push({ name, passed: true });
  } catch (e) {
    tests.push({ name, passed: false, error: e.message });
  }
}

// Test 1
test('Encode "Hello"', () => {
  const result = base64Encode('Hello');
  if (result !== 'SGVsbG8=') throw new Error('Expected SGVsbG8=, got ' + result);
});

// Test 2
test('Decode "SGVsbG8="', () => {
  const result = base64Decode('SGVsbG8=');
  if (result !== 'Hello') throw new Error('Expected Hello, got ' + result);
});

// Test 3
test('Round-trip', () => {
  const original = 'Test string with special chars!@#';
  const encoded = base64Encode(original);
  const decoded = base64Decode(encoded);
  if (decoded !== original) throw new Error('Round-trip failed');
});

console.log('MVP 61 Tests:\n');
let passed = 0;
tests.forEach(t => {
  console.log(`${t.passed ? '✅' : '❌'} ${t.name}`);
  if (!t.passed) console.log('   Error:', t.error);
  if (t.passed) passed++;
});
console.log(`\n${passed}/${tests.length} passed`);
process.exit(passed === tests.length ? 0 : 1);