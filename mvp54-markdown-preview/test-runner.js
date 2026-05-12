// Test runner for MVP 54: Markdown Previewer
const tests = [];

// Simple markdown parser (subset)
function parseMd(text) {
  return text
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/^\* (.*$)/gm, '<li>$1</li>')
    .replace(/\n/g, '<br>');
}

// Tests
function testParse(md, expected) {
  const result = parseMd(md);
  const passed = result === expected;
  tests.push({ name: `parse "${md.replace(/\n/g, '\\n')}"`, expected, result, passed });
}

// Run tests
testParse('# Hello', '<h1>Hello</h1>');
testParse('## World', '<h2>World</h2>');
testParse('**bold**', '<strong>bold</strong>');
testParse('*italic*', '<em>italic</em>');
testParse('`code`', '<code>code</code>');
testParse('* item', '<li>item</li>');
testParse('**Hello World**', '<strong>Hello World</strong>');

// Report
console.log('\n=== Markdown Previewer Tests ===\n');
let passed = 0;
tests.forEach(t => {
  const status = t.passed ? '✅' : '❌';
  console.log(`${status} ${t.name}`);
  if (!t.passed) {
    console.log(`   Expected: ${t.expected}`);
    console.log(`   Got:      ${t.result}`);
  }
  if (t.passed) passed++;
});
console.log(`\n${passed}/${tests.length} tests passed`);