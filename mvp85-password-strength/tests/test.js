// Test suite for Password Strength Checker
// Run in browser console or via Node.js with jsdom

const testCases = [
  { password: '', expected: 0, desc: 'empty' },
  { password: 'abc', expected: 1, desc: 'too short' },
  { password: 'abcdefgh', expected: 1, desc: 'only lowercase' },
  { password: 'ABCDEFGH', expected: 1, desc: 'only uppercase' },
  { password: '12345678', expected: 1, desc: 'only numbers' },
  { password: 'abcdef', expected: 1, desc: 'lowercase 6 chars' },
  { password: 'Abcdefgh', expected: 2, desc: 'lower + upper' },
  { password: 'Abcdef12', expected: 3, desc: 'lower + upper + number' },
  { password: 'Abcdef12!', expected: 4, desc: 'lower + upper + number + special' },
  { password: 'MyStr0ng!Pass', expected: 5, desc: 'all criteria met' },
];

function calculateScore(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

console.log('🧪 Password Strength Checker Tests\n');
let passed = 0;
let failed = 0;

testCases.forEach(tc => {
  const score = calculateScore(tc.password);
  const status = score === tc.expected ? '✅ PASS' : '❌ FAIL';
  if (score === tc.expected) passed++; else failed++;
  console.log(`${status}: "${tc.password}" -> score ${score} (expected ${tc.expected}) - ${tc.desc}`);
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);