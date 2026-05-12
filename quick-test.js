// Simple quick test
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log('✅ ' + name);
    passed++;
  } catch (e) {
    console.log('❌ ' + name + ': ' + e.message);
    failed++;
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Assertion failed');
}

// Test 1
test('Regex basic word match', () => {
  const pattern = /\b\w+\b/;
  const text = 'Hello World';
  const matches = text.match(pattern);
  assert(matches !== null, 'Should have matches');
});

// Test 2  
test('YAML simple key-value', () => {
  const yaml = 'name: John\nage: 30';
  const lines = yaml.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
  assert(lines.length === 2, 'Should have 2 lines');
});

// Test 3
test('Diff identical texts', () => {
  const result = computeDiff('Hello\nWorld', 'Hello\nWorld');
  assert(result.length === 2, 'Expected 2 lines');
  assert(result.every(r => r.type === 'equal'), 'All should be equal');
});

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

console.log('\nResults:', passed, 'passed,', failed, 'failed');
process.exit(failed > 0 ? 1 : 0);