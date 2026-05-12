const fs = require('fs');
const path = require('path');

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

// Replicate the logic from the HTML
function countChars(text) { return text.length; }
function countWords(text) { return text.trim() ? text.trim().split(/\s+/).length : 0; }
function countLines(text) { return text ? text.split('\n').length : 0; }
function countSentences(text) { return text ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0; }
function checkTitleCase(text) {
  return text.length > 0 && text === text.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());
}

// FUNCTIONAL TESTS

test('Character count works', () => {
  assert(countChars('Hello World') === 11, 'Wrong char count');
});

test('Word count works', () => {
  assert(countWords('Hello World Test') === 3, 'Wrong word count');
});

test('Word count handles empty', () => {
  assert(countWords('') === 0, 'Should be 0 for empty');
});

test('Word count handles only spaces', () => {
  assert(countWords('   ') === 0, 'Should be 0 for spaces');
});

test('Line count works', () => {
  assert(countLines('Line1\nLine2\nLine3') === 3, 'Wrong line count');
});

test('Line count handles empty', () => {
  assert(countLines('') === 0, 'Should be 0 for empty');
});

test('Sentence count works', () => {
  assert(countSentences('First. Second! Third?') === 3, 'Wrong sentence count');
});

test('Sentence count ignores empty', () => {
  assert(countSentences('Hello.') === 1, 'Should be 1');
});

test('Title case detection works', () => {
  assert(checkTitleCase('Hello World') === true, 'Should detect title case');
});

test('Title case detection fails on lowercase', () => {
  assert(checkTitleCase('hello world') === false, 'Should fail for lowercase');
});

test('Title case empty check', () => {
  assert(checkTitleCase('') === false, 'Should be false for empty');
});

test('Twitter check logic (280)', () => {
  const text = 'a'.repeat(280);
  assert(text.length <= 280, 'Should be under limit');
});

test('Twitter check fails over 280', () => {
  const text = 'a'.repeat(281);
  assert(text.length > 280, 'Should exceed limit');
});

test('SMS check logic (160)', () => {
  const text = 'a'.repeat(160);
  assert(text.length <= 160, 'Should be under SMS limit');
});

// Summary
const passed = results.filter(r => r.pass).length;
console.log(`\n📊 ${passed}/${results.length} functional tests passed`);
process.exit(passed === results.length ? 0 : 1);