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

// Load HTML
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const dom = new JSDOM(html);
const { window } = dom;
const { document } = window;

test('Page loads without error', () => {
  assert(document.querySelector('h1').textContent.includes('COUNTDOWN'), 'Title not found');
});

test('Display shows default time', () => {
  const display = document.getElementById('display');
  assert(display.textContent !== '', 'Display is empty');
});

test('Preset buttons exist', () => {
  const presets = document.querySelectorAll('.preset');
  assert(presets.length === 5, 'Expected 5 preset buttons');
});

test('Start button exists', () => {
  const startBtn = document.querySelector('.btn-start');
  assert(startBtn !== null, 'Start button not found');
});

test('Stop button exists', () => {
  const stopBtn = document.querySelector('.btn-stop');
  assert(stopBtn !== null, 'Stop button not found');
});

// Summary
const passed = results.filter(r => r.pass).length;
console.log(`\n📊 ${passed}/${results.length} tests passed`);
process.exit(passed === results.length ? 0 : 1);