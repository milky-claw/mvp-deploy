// Test runner for MVP 62: JWT Decoder (Node-compatible)
const decodeJWT = (token) => {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  return {
    header: JSON.parse(Buffer.from(parts[0], 'base64').toString()),
    payload: JSON.parse(Buffer.from(parts[1], 'base64').toString())
  };
};

const tests = [];

function test(name, fn) {
  try {
    fn();
    tests.push({ name, passed: true });
  } catch (e) {
    tests.push({ name, passed: false, error: e.message });
  }
}

const testJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

test('Decode valid JWT', () => {
  const result = decodeJWT(testJWT);
  if (!result) throw new Error('Result is null');
});

test('Extract header alg', () => {
  const result = decodeJWT(testJWT);
  if (result.header.alg !== 'HS256') throw new Error('Expected HS256');
});

test('Extract payload sub', () => {
  const result = decodeJWT(testJWT);
  if (result.payload.sub !== '1234567890') throw new Error('Expected sub');
});

test('Extract payload name', () => {
  const result = decodeJWT(testJWT);
  if (result.payload.name !== 'John Doe') throw new Error('Expected John Doe');
});

test('Invalid JWT returns null', () => {
  const result = decodeJWT('not-a-valid-jwt');
  if (result !== null) throw new Error('Should return null');
});

console.log('MVP 62 Tests:\n');
let passed = 0;
tests.forEach(t => {
  console.log(`${t.passed ? '✅' : '❌'} ${t.name}`);
  if (!t.passed) console.log('   Error:', t.error);
  if (t.passed) passed++;
});
console.log(`\n${passed}/${tests.length} passed`);
process.exit(passed === tests.length ? 0 : 1);