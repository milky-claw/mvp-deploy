// Test suite for MVP 27: Text Statistics
// Tests word count, character count, sentence count, etc.

const tests = [];
let passed = 0;
let failed = 0;

// Test helper
function test(name, fn) {
  try {
    fn();
    tests.push({ name, status: 'PASS' });
    passed++;
  } catch (e) {
    tests.push({ name, status: 'FAIL', error: e.message });
    failed++;
  }
}

function assertEqual(actual, expected, msg = '') {
  if (actual !== expected) {
    throw new Error(`${msg || 'Assertion failed'}: expected ${expected}, got ${actual}`);
  }
}

// Extract stats logic from the app
function getStats(text) {
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const sentences = text ? text.split(/[.!?]+(?:\s+|$)/).filter(s => s.trim()).length : 0;
  const paragraphs = text ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
  const paragraphsFinal = paragraphs || (text.trim() ? 1 : 0);
  const minutes = words / 200;
  const readingTime = minutes < 1 
    ? Math.ceil(minutes * 60) + 's' 
    : minutes < 60 
      ? Math.ceil(minutes) + 'm' 
      : Math.floor(minutes / 60) + 'h ' + Math.ceil(minutes % 60) + 'm';
  return { words, chars, charsNoSpace, sentences, paragraphs: paragraphsFinal, readingTime };
}

// === Tests for Text Stats ===

test('empty string', () => {
  const { words, chars, charsNoSpace, sentences, paragraphs } = getStats('');
  assertEqual(words, 0, 'words');
  assertEqual(chars, 0, 'chars');
  assertEqual(charsNoSpace, 0, 'charsNoSpace');
  assertEqual(sentences, 0, 'sentences');
  assertEqual(paragraphs, 0, 'paragraphs');
});

test('single word', () => {
  const { words, chars } = getStats('Hello');
  assertEqual(words, 1, 'words');
  assertEqual(chars, 5, 'chars');
});

test('two words', () => {
  const { words, charsNoSpace } = getStats('Hello World');
  assertEqual(words, 2, 'words');
  assertEqual(charsNoSpace, 10, 'charsNoSpace (no spaces)');
});

test('sentence with period', () => {
  const { sentences } = getStats('Hello world.');
  assertEqual(sentences, 1, 'sentences');
});

test('multiple sentences', () => {
  const { sentences } = getStats('Hello world. How are you? I am fine!');
  assertEqual(sentences, 3, 'sentences');
});

test('single paragraph', () => {
  const { paragraphs } = getStats('This is a single paragraph.');
  assertEqual(paragraphs, 1, 'paragraphs');
});

test('multiple paragraphs', () => {
  const { paragraphs } = getStats('Para 1.\n\nPara 2.\n\nPara 3.');
  assertEqual(paragraphs, 3, 'paragraphs');
});

test('reading time: short text', () => {
  const { readingTime } = getStats('One two three four five six seven eight nine ten');
  // 10 words = 10/200 min = 0.05 min = 3 seconds
  assertEqual(readingTime, '3s', 'reading time');
});

test('reading time: long text', () => {
  const text = Array(200).fill('word').join(' ');
  const { readingTime } = getStats(text);
  assertEqual(readingTime, '1m', 'reading time 200 words = 1 min');
});

test('reading time: very long text', () => {
  const text = Array(12000).fill('word').join(' '); // 12000 words = 60 mins
  const { readingTime } = getStats(text);
  assertEqual(readingTime, '1h 0m', 'reading time');
});

test('special characters only', () => {
  const { words, chars } = getStats('!@#$%^&*()');
  assertEqual(words, 1, 'special chars count as 1 word');
  assertEqual(chars, 10, 'chars');
});

test('newlines and tabs', () => {
  const { words } = getStats('hello\n\tworld');
  assertEqual(words, 2, 'words with whitespace');
});

// Run tests
console.log('='.repeat(50));
console.log('MVP 27: Text Statistics - Test Suite');
console.log('='.repeat(50));

tests.forEach(t => {
  const icon = t.status === 'PASS' ? '✅' : '❌';
  console.log(`${icon} ${t.name}`);
  if (t.error) console.log(`   Error: ${t.error}`);
});

console.log('-'.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('');

process.exit(failed > 0 ? 1 : 0);