// Test runner for MVP134 Unix Time Converter
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

function assertEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error(`Expected: ${expected}, Got: ${actual}`);
  }
}

// Tests (simulating the JS logic)
const timestampInput = 1750483200;
const date = new Date(timestampInput * 1000);

test('Timestamp to Date conversion', () => {
  const ts = 1750483200;
  const d = new Date(ts * 1000);
  assertEqual(d.getFullYear(), 2025);
});

test('Date to timestamp conversion', () => {
  const d = new Date('2025-06-21T10:00:00Z');
  const ts = Math.floor(d.getTime() / 1000);
  assertEqual(ts, 1750500000);
});

test('Unix epoch start', () => {
  const d = new Date(0);
  assertEqual(d.toUTCString(), 'Thu, 01 Jan 1970 00:00:00 GMT');
});

test('Current timestamp format', () => {
  const now = Math.floor(Date.now() / 1000);
  const d = new Date(now * 1000);
  const today = new Date();
  assertEqual(d.getDate(), today.getDate());
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);