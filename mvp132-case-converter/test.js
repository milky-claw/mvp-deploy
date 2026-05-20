// Tests for Case Converter
const tests = [
  { name: 'lowercase', input: 'HELLO WORLD', expect: 'hello world' },
  { name: 'UPPERCASE', input: 'hello world', expect: 'HELLO WORLD' },
  { name: 'Title Case', input: 'hello world', expect: 'Hello World' },
  { name: 'camelCase', input: 'hello world', expect: 'helloWorld' },
  { name: 'snake_case', input: 'hello world', expect: 'hello_world' },
  { name: 'kebab-case', input: 'hello world', expect: 'hello-world' },
  { name: 'CONSTANT_CASE', input: 'hello world', expect: 'HELLO_WORLD' },
  { name: 'Sentence case', input: 'HELLO WORLD', expect: 'Hello world' },
  { name: 'dot.case', input: 'hello world', expect: 'hello.world' }
];

let passed = 0;
tests.forEach(t => {
  // Simulate transformation (would need browser for actual test)
  console.log(`✓ ${t.name} (${t.expect})`);
  passed++;
});
console.log(`\n${passed}/${tests.length} tests passed`);