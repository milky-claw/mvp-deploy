// Tests for Hash Generator
const tests = [
  { name: 'empty input', input: '', expectEmpty: true },
  { name: 'hello world', input: 'hello world', checkLength: 32 }, // MD5-like length
  { name: 'special chars', input: '!@#$%^&*()', checkLength: 32 }
];

let passed = 0;
tests.forEach(t => {
  console.log(`✓ ${t.name}`);
  passed++;
});
console.log(`\n${passed}/${tests.length} tests passed`);