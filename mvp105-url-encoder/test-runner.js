// MVP 105 - URL Encoder Tests

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

function assertEquals(actual, expected, msg = '') {
  if (actual !== expected) {
    throw new Error(`${msg} Expected "${expected}", got "${actual}"`);
  }
}

function assertTrue(actual, msg = '') {
  if (!actual) {
    throw new Error(`${msg} Expected true, got ${actual}`);
  }
}

// Replicate the logic from mvp105-url-encoder
function encodeURL(input) {
  return encodeURIComponent(input);
}

function decodeURL(input) {
  return decodeURIComponent(input);
}

// === TESTS ===

console.log('\n--- MVP 105: URL Encoder Tests ---\n');

// encodeURL tests
test('encodeURL: plain text unchanged', () => {
  assertEquals(encodeURL('hello'), 'hello');
});

test('encodeURL: spaces become %20', () => {
  assertEquals(encodeURL('hello world'), 'hello%20world');
});

test('encodeURL: special chars encoded', () => {
  assertEquals(encodeURL('a/b'), 'a%2Fb');
});

test('encodeURL: unicode chars encoded', () => {
  assertEquals(encodeURL('€'), '%E2%82%AC');
});

test('encodeURL: ampersand encoded', () => {
  assertEquals(encodeURL('a&b'), 'a%26b');
});

test('encodeURL: question mark encoded', () => {
  assertEquals(encodeURL('a?b'), 'a%3Fb');
});

test('encodeURL: hash encoded', () => {
  assertEquals(encodeURL('a#b'), 'a%23b');
});

// decodeURL tests
test('decodeURL: plain text unchanged', () => {
  assertEquals(decodeURL('hello'), 'hello');
});

test('decodeURL: %20 becomes spaces', () => {
  assertEquals(decodeURL('hello%20world'), 'hello world');
});

test('decodeURL: encoded special chars decoded', () => {
  assertEquals(decodeURL('a%2Fb'), 'a/b');
});

test('decodeURL: unicode decoded', () => {
  assertEquals(decodeURL('%E2%82%AC'), '€');
});

// Round-trip tests
test('encode/decode round-trip: original preserved', () => {
  const original = 'Hello World! Test @#$';
  const encoded = encodeURL(original);
  const decoded = decodeURL(encoded);
  assertEquals(decoded, original);
});

test('encode/decode round-trip: unicode preserved', () => {
  const original = 'Привет мир 🔥';
  const encoded = encodeURL(original);
  const decoded = decodeURL(encoded);
  assertEquals(decoded, original);
});

// Error handling
test('decodeURL: invalid encoding throws or returns error', () => {
  let result;
  try {
    result = decodeURL('%ZZ');
  } catch (e) {
    result = 'error';
  }
  // Either throws or returns error string
  assertTrue(result === 'error' || result.includes('Error'), 'Should handle invalid input');
});

// Summary
console.log(`\n--- Results: ${passed} passed, ${failed} failed ---`);
console.log(failed === 0 ? '✅ All tests passed!' : '❌ Some tests failed');