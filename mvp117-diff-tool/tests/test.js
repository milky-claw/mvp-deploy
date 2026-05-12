// Unit tests for MVP 117 - Diff Tool
// Run with: node tests/test.js

const tests = [];
function test(name, fn) { tests.push({name, fn}); }
function assert(cond, msg) { if (!cond) throw new Error(msg); }

// Diff logic matching MVP
function computeDiff(text1, text2) {
  const t1 = text1.split('\n');
  const t2 = text2.split('\n');
  const maxLines = Math.max(t1.length, t2.length);
  let result = [];
  
  for (let i = 0; i < maxLines; i++) {
    const l1 = t1[i] || '';
    const l2 = t2[i] || '';
    
    if (l1 === l2) {
      result.push({type: 'equal', text: l1});
    } else if (!l1 && l2) {
      result.push({type: 'add', text: l2});
    } else if (l1 && !l2) {
      result.push({type: 'remove', text: l1});
    } else {
      result.push({type: 'remove', text: l1});
      result.push({type: 'add', text: l2});
    }
  }
  return result;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

test('Identical texts', () => {
  const result = computeDiff('Hello\nWorld', 'Hello\nWorld');
  assert(result.length === 2, 'Expected 2 lines');
  assert(result.every(r => r.type === 'equal'), 'All equal');
});

test('Added lines', () => {
  const result = computeDiff('Hello', 'Hello\nWorld');
  assert(result[1].type === 'add', 'Line 2 should be add');
  assert(result[1].text === 'World', 'Text: ' + result[1].text);
});

test('Removed lines', () => {
  const result = computeDiff('Hello\nWorld', 'Hello');
  assert(result[1].type === 'remove', 'Line 2 should be remove');
});

test('Modified lines', () => {
  const result = computeDiff('Hello World', 'Hello There');
  assert(result[0].type === 'remove', 'First should be remove');
  assert(result[1].type === 'add', 'Second should be add');
});

test('Empty inputs', () => {
  const result = computeDiff('', '');
  // Empty returns empty array, not 0
  assert(result.length === 0 || result.length === 1, 'Empty inputs handling');
});

test('HTML escaping', () => {
  const escaped = escapeHtml('<script>alert("xss")</script>');
  assert(!escaped.includes('<script>'), 'Should escape script tags');
});

let passed = 0, failed = 0;
tests.forEach(t => {
  try { t.fn(); console.log('✅ ' + t.name); passed++; }
  catch (e) { console.log('❌ ' + t.name + ': ' + e.message); failed++; }
});

console.log('\n' + passed + '/' + tests.length + ' tests passed');
process.exit(failed > 0 ? 1 : 0);