// Test suite for MVP 26: QR Code Generator
// Tests QR URL generation logic

const tests = [];
let passed = 0;
let failed = 0;

// Test helper
function test(name, fn) {
  try {
    fn();
    tests.push({ name, status: 'PASS' });
    passed++;
  } catch (e) {
    tests.push({ name, status: 'FAIL', error: e.message });
    failed++;
  }
}

function assertEqual(actual, expected, msg = '') {
  if (actual !== expected) {
    throw new Error(`${msg || 'Assertion failed'}: expected ${expected}, got ${actual}`);
  }
}

function assertContains(str, substring, msg = '') {
  if (!str.includes(substring)) {
    throw new Error(`${msg || 'Assertion failed'}: expected "${str}" to contain "${substring}"`);
  }
}

function assertTrue(val, msg = '') {
  if (!val) {
    throw new Error(`${msg || 'Assertion failed'}: expected true, got ${val}`);
  }
}

// Simulate QR generation logic
function generateQRUrl(text, size) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
}

// === Tests for QR Code Generator ===

test('generateQRUrl: basic URL', () => {
  const url = generateQRUrl('https://example.com', 200);
  assertContains(url, 'api.qrserver.com');
  assertContains(url, 'size=200x200');
  assertContains(url, 'data=https%3A%2F%2Fexample.com');
});

test('generateQRUrl: plain text', () => {
  const url = generateQRUrl('Hello World', 150);
  assertContains(url, 'data=Hello%20World');
});

test('generateQRUrl: special characters', () => {
  const url = generateQRUrl('Test @#$%!', 300);
  // Note: encodeURIComponent doesn't encode ! by default (RFC 3986)
  assertContains(url, 'data=Test%20%40%23%24%25');
});

test('generateQRUrl: different sizes', () => {
  const s150 = generateQRUrl('test', 150);
  const s400 = generateQRUrl('test', 400);
  assertContains(s150, 'size=150x150');
  assertContains(s400, 'size=400x400');
});

test('generateQRUrl: empty string', () => {
  const url = generateQRUrl('', 200);
  assertContains(url, 'data=');
});

// Validate URL structure
test('URL validation: valid URL structure', () => {
  const url = generateQRUrl('test', 200);
  assertTrue(url.startsWith('https://'), 'Should be HTTPS');
  assertTrue(url.includes('qrserver.com'), 'Should use qrserver API');
});

// Run tests
console.log('='.repeat(50));
console.log('MVP 26: QR Code Generator - Test Suite');
console.log('='.repeat(50));

tests.forEach(t => {
  const icon = t.status === 'PASS' ? '✅' : '❌';
  console.log(`${icon} ${t.name}`);
  if (t.error) console.log(`   Error: ${t.error}`);
});

console.log('-'.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('');

process.exit(failed > 0 ? 1 : 0);