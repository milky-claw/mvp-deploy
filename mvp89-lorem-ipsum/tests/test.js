// Test Suite: Lorem Ipsum Generator
const tests = [
  {
    name: "Generate paragraphs on load",
    fn: () => {
      return document.getElementById('output').textContent.length > 0;
    }
  },
  {
    name: "Generate button produces output",
    fn: () => {
      const initial = document.getElementById('output').textContent;
      generate();
      return document.getElementById('output').textContent.length > 0;
    }
  },
  {
    name: "Paragraph count respected",
    fn: () => {
      document.getElementById('paragraphs').value = 5;
      document.getElementById('type').value = 'paras';
      generate();
      const output = document.getElementById('output').textContent;
      // 5 paragraphs = ~5+ line breaks
      return (output.match(/\n\n/g) || []).length >= 4;
    }
  },
  {
    name: "Words type produces single line",
    fn: () => {
      document.getElementById('type').value = 'words';
      generate();
      const output = document.getElementById('output').textContent;
      return !output.includes('\n\n');
    }
  }
];

let passed = 0;
tests.forEach(t => {
  const result = t.fn();
  console.log(`${result ? '✓' : '✗'} ${t.name}`);
  if (result) passed++;
});
console.log(`\n${passed}/${tests.length} tests passed`);