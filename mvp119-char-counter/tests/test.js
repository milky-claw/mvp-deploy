const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const results = [];

function test(name, fn) {
  try {
    fn();
    results.push({ name, pass: true });
    console.log(`✅ ${name}`);
  } catch (e) {
    results.push({ name, pass: false, error: e.message });
    console.log(`❌ ${name}: ${e.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const dom = new JSDOM(html);
const { window } = dom;
const { document } = window;

test('Page loads', () => {
  assert(document.querySelector('h1').textContent.includes('Character Counter'), 'Title not found');
});

test('Textarea exists', () => {
  const textarea = document.getElementById('input');
  assert(textarea !== null, 'Textarea not found');
});

test('Character counter displays', () => {
  const chars = document.getElementById('chars');
  assert(chars.textContent === '0', 'Default chars should be 0');
});

test('Word counter displays', () => {
  const words = document.getElementById('words');
  assert(words.textContent === '0', 'Default words should be 0');
});

test('Stats display elements exist', () => {
  assert(document.getElementById('chars') !== null, 'Chars element not found');
  assert(document.getElementById('words') !== null, 'Words element not found');
  assert(document.getElementById('lines') !== null, 'Lines element not found');
  assert(document.getElementById('sentences') !== null, 'Sentences element not found');
});

const passed = results.filter(r => r.pass).length;
console.log(`\n📊 ${passed}/${results.length} tests passed`);
process.exit(passed === results.length ? 0 : 1);