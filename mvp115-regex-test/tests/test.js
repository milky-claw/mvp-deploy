// Unit tests for MVP 115 - Regex Tester
// Run with: node tests/test.js

const tests = [];
function test(name, fn) { tests.push({name, fn}); }
function assert(cond, msg) { if (!cond) throw new Error(msg); }

test('Basic word matching', () => {
  const pattern = /\b\w+\b/g;
  const text = 'Hello World';
  const matches = [];
  let match;
  while ((match = pattern.exec(text)) !== null) {
    matches.push(match[0]);
    if (match.index === pattern.lastIndex) pattern.lastIndex++;
  }
  assert(matches.length === 2, 'Expected 2 matches');
  assert(matches.includes('Hello') && matches.includes('World'), 'Should have Hello and World');
});

test('Case insensitive flag', () => {
  const pattern = /hello/i;
  const matches = 'Hello World'.match(pattern);
  assert(matches !== null, 'Should match');
  assert(matches[0] === 'Hello', 'Matched: ' + matches[0]);
});

test('Invalid regex throws', () => {
  let threw = false;
  try { new RegExp('[invalid'); }
  catch (e) { threw = true; }
  assert(threw, 'Should throw on invalid regex');
});

test('Number matching', () => {
  const pattern = /\d+/g;
  const matches = 'abc123def456'.match(pattern);
  assert(matches.length === 2, 'Expected 2 number matches');
  assert(matches[0] === '123' && matches[1] === '456', 'Number matches failed');
});

let passed = 0, failed = 0;
tests.forEach(t => {
  try { t.fn(); console.log('✅ ' + t.name); passed++; }
  catch (e) { console.log('❌ ' + t.name + ': ' + e.message); failed++; }
});

console.log('\n' + passed + '/' + tests.length + ' tests passed');
process.exit(failed > 0 ? 1 : 0);