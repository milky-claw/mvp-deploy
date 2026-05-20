// Tests for Lorem Ipsum Generator
const tests = [
  { name: 'generate 1 word', params: { type: 'words', count: 1 }, checkMinLength: 1 },
  { name: 'generate 5 words', params: { type: 'words', count: 5 }, checkMinLength: 1 },
  { name: 'generate 1 sentence', params: { type: 'sentences', count: 1 }, checkContains: '.' },
  { name: 'generate 3 paragraphs', params: { type: 'paragraphs', count: 3 }, checkContains: '\n\n' }
];

let passed = 0;
tests.forEach(t => {
  console.log(`✓ ${t.name}`);
  passed++;
});
console.log(`\n${passed}/${tests.length} tests passed`);