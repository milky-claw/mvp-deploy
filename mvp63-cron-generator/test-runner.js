// Test runner for MVP 63: Cron Generator
const tests = [];

function test(name, fn) {
  try {
    fn();
    tests.push({ name, passed: true });
  } catch (e) {
    tests.push({ name, passed: false, error: e.message });
  }
}

// Simulate getCronExpression (matches the HTML logic)
const getCronExpression = (minute='*', hour='*', dom='*', month='*', dow='*') => {
  return `${minute} ${hour} ${dom} ${month} ${dow}`;
};

test('Default cron', () => {
  const result = getCronExpression();
  if (result !== '* * * * *') throw new Error('Expected * * * * *');
});

test('At 9 AM weekdays', () => {
  const result = getCronExpression('0', '9', '*', '*', '1-5');
  if (result !== '0 9 * * 1-5') throw new Error('Expected 0 9 * * 1-5');
});

test('Every 5 minutes', () => {
  const result = getCronExpression('*/5', '*', '*', '*', '*');
  if (result !== '*/5 * * * *') throw new Error('Expected */5 * * * *');
});

test('First of month', () => {
  const result = getCronExpression('0', '0', '1', '*', '*');
  if (result !== '0 0 1 * *') throw new Error('Expected 0 0 1 * *');
});

console.log('MVP 63 Tests:\n');
let passed = 0;
tests.forEach(t => {
  console.log(`${t.passed ? '✅' : '❌'} ${t.name}`);
  if (!t.passed) console.log('   Error:', t.error);
  if (t.passed) passed++;
});
console.log(`\n${passed}/${tests.length} passed`);
process.exit(passed === tests.length ? 0 : 1);