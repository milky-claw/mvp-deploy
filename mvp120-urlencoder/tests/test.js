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
  assert(document.querySelector('h1').textContent.includes('URL Encoder'), 'Title not found');
});

test('Input textarea exists', () => {
  assert(document.getElementById('input') !== null, 'Input not found');
});

test('Output textarea exists', () => {
  assert(document.getElementById('output') !== null, 'Output not found');
});

test('Encode button exists', () => {
  const btn = document.querySelector('.btn-encode');
  assert(btn !== null, 'Encode button not found');
});

test('Decode button exists', () => {
  const btn = document.querySelector('.btn-decode');
  assert(btn !== null, 'Decode button not found');
});

const passed = results.filter(r => r.pass).length;
console.log(`\n📊 ${passed}/${results.length} tests passed`);
process.exit(passed === results.length ? 0 : 1);