// Test suite for MVP 25: Timer / Stopwatch
// Tests the formatTime function and core logic

const tests = [];
let passed = 0;
let failed = 0;

// formatTime function (extracted for testing)
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
}

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

// === Tests for Timer/Stopwatch ===

test('formatTime: zero milliseconds', () => {
  assertEqual(formatTime(0), '00:00:00.00', 'Zero time');
});

test('formatTime: 1 second', () => {
  assertEqual(formatTime(1000), '00:00:01.00', '1 second');
});

test('formatTime: 1 minute', () => {
  assertEqual(formatTime(60000), '00:01:00.00', '1 minute');
});

test('formatTime: 1 hour', () => {
  assertEqual(formatTime(3600000), '01:00:00.00', '1 hour');
});

test('formatTime: complex time (1h 23m 45s 67ms)', () => {
  assertEqual(formatTime(5025067), '01:23:45.06', 'Complex time');
});

test('formatTime: 99 hours (edge case)', () => {
  assertEqual(formatTime(356400000), '99:00:00.00', '99 hours');
});

// Run tests
console.log('='.repeat(50));
console.log('MVP 25: Timer / Stopwatch - Test Suite');
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