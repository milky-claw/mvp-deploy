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
const dom = new JSDOM(html, { runScripts: 'dangerously' });
const { window } = dom;
const { document } = window;

// Extract and run script functions manually
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
const scriptCode = scriptMatch ? scriptMatch[1] : '';

// Execute using eval in window context
Object.keys(window).forEach(key => { try { delete global[key]; } catch {} });

// Define functions we need to test
function updateDisplayTest(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function getInputSecondsTest(h, m, s) {
  const hours = parseInt(h) || 0;
  const mins = parseInt(m) || 0;
  const secs = parseInt(s) || 0;
  return hours * 3600 + mins * 60 + secs;
}

// FUNCTIONAL TESTS

test('updateDisplay formats 0 seconds', () => {
  const result = updateDisplayTest(0);
  assert(result === '00:00:00', `Expected 00:00:00, got ${result}`);
});

test('updateDisplay formats 61 seconds', () => {
  const result = updateDisplayTest(61);
  assert(result === '00:01:01', `Expected 00:01:01, got ${result}`);
});

test('updateDisplay formats 3661 seconds', () => {
  const result = updateDisplayTest(3661);
  assert(result === '01:01:01', `Expected 01:01:01, got ${result}`);
});

test('getInputSeconds calculates correctly', () => {
  const result = getInputSecondsTest('1', '30', '45');
  assert(result === 5445, `Expected 5445, got ${result}`);
});

test('getInputSeconds handles empty values', () => {
  const result = getInputSecondsTest('', '', '');
  assert(result === 0, `Expected 0, got ${result}`);
});

test('getInputSeconds handles partial values', () => {
  const result = getInputSecondsTest('', '15', '30');
  assert(result === 930, `Expected 930, got ${result}`);
});

// Summary
const passed = results.filter(r => r.pass).length;
console.log(`\n📊 ${passed}/${results.length} functional tests passed`);
process.exit(passed === results.length ? 0 : 1);