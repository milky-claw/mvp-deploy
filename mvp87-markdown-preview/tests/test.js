// Test suite for Markdown Preview
// Tests markdown parsing functions

const testCases = [
  { 
    input: '# Hello World', 
    expected: '<h1>Hello World</h1>', 
    desc: 'H1 header'
  },
  { 
    input: '## Subtitle', 
    expected: '<h2>Subtitle</h2>', 
    desc: 'H2 header'
  },
  { 
    input: '**bold text**', 
    expected: '<strong>bold text</strong>', 
    desc: 'Bold text'
  },
  { 
    input: '*italic text*', 
    expected: '<em>italic text</em>', 
    desc: 'Italic text'
  },
  { 
    input: '`code`', 
    expected: '<code>code</code>', 
    desc: 'Inline code'
  },
  { 
    input: '[link text](https://example.com)', 
    expected: '<a href="https://example.com">link text</a>', 
    desc: 'Link'
  },
  { 
    input: '> quoted text', 
    expected: '<blockquote>quoted text</blockquote>', 
    desc: 'Blockquote'
  },
  { 
    input: '- list item', 
    expected: '<li>list item</li>', 
    desc: 'Unordered list item'
  },
  { 
    input: '1. numbered item', 
    expected: '<li>numbered item</li>', 
    desc: 'Ordered list item'
  },
  {
    input: '---\nSome text',
    expected: '<hr>',
    desc: 'Horizontal rule'
  }
];

// Simple markdown parser (matches the one in index.html)
const md = {
  process: text => {
    let html = text
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="lang-$1">$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^######\s+(.*)$/gm, '<h6>$1</h6>')
      .replace(/^#####\s+(.*)$/gm, '<h5>$1</h5>')
      .replace(/^####\s+(.*)$/gm, '<h4>$1</h4>')
      .replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
      .replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
      .replace(/^#\s+(.*)$/gm, '<h1>$1</h1>')
      .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/___(.+?)___/g, '<strong><em>$1</em></strong>')
      .replace(/__(.+?)__/g, '<strong>$1</strong>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      .replace(/^>\s+(.*)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^---$/gm, '<hr>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/^[\-\*]\s+(.*)$/gm, '<li>$1</li>')
      .replace(/^\d+\.\s+(.*)$/gm, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>');
    html = html.replace(/(<li>.*<\/li>)+/g, '<ul>$&</ul>');
    return '<p>' + html + '</p>';
  }
};

console.log('🧪 Markdown Preview Tests\n');
let passed = 0;
let failed = 0;

testCases.forEach(tc => {
  const result = md.process(tc.input);
  const status = result.includes(tc.expected) ? '✅ PASS' : '❌ FAIL';
  
  if (result.includes(tc.expected)) {
    passed++;
  } else {
    failed++;
  }
  
  console.log(`${status}: ${tc.desc}`);
  console.log(`   Input: "${tc.input}"`);
  console.log(`   Expected: ${tc.expected}`);
  console.log(`   Got: ${result.substring(0, 100)}...\n`);
});

console.log(`📊 Results: ${passed} passed, ${failed} failed`);