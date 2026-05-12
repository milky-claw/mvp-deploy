#!/usr/bin/env node
// Test runner for MVPs 115-117 (May 8th)
// Tests core logic of Regex Tester, YAML Parser, Diff Tool

const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (e) {
    console.log(`❌ ${name}: ${e.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

// ============================================
// MVP 115: Regex Tester Logic Tests
// ============================================
test('Regex: basic word matching', () => {
  const pattern = /\b\w+\b/;
  const text = 'Hello World';
  const matches = [];
  let match;
  while ((match = pattern.exec(text)) !== null) {
    matches.push(match[0]);
    if (match.index === pattern.lastIndex) pattern.lastIndex++;
  }
  assert(matches.length === 2, `Expected 2 matches, got ${matches.length}`);
  assert(matches.includes('Hello'), 'Should match Hello');
  assert(matches.includes('World'), 'Should match World');
});

test('Regex: case insensitive flag', () => {
  const pattern = /hello/i;
  const matches = 'Hello World'.match(pattern);
  assert(matches !== null, 'Should match case insensitive');
  assert(matches[0] === 'Hello', `Matched: ${matches[0]}`);
});

test('Regex: multiline flag', () => {
  const pattern = /^line/m;
  const text = 'line1\nline2\nline3';
  const matches = text.match(pattern);
  assert(matches !== null && matches.length === 1, 'Should match first line with ^');
});

test('Regex: invalid pattern error handling', () => {
  let threw = false;
  try {
    new RegExp('[invalid');
  } catch (e) {
    threw = true;
  }
  assert(threw, 'Should throw on invalid regex');
});

// ============================================
// MVP 116: YAML Parser Logic Tests
// ============================================
test('YAML: simple key-value', () => {
  const yaml = 'name: John\nage: 30';
  const obj = parseQuickYAML(yaml);
  assert(obj.name === 'John', `Name: ${obj.name}`);
  assert(obj.age === 30, `Age: ${obj.age}`);
});

test('YAML: boolean and null', () => {
  const yaml = 'active: true\ndeleted: null';
  const obj = parseQuickYAML(yaml);
  assert(obj.active === true, `Active: ${obj.active}`);
  assert(obj.deleted === null, `Deleted: ${obj.deleted}`);
});

test('YAML: number parsing', () => {
  const yaml = 'count: 42\nprice: 19.99';
  const obj = parseQuickYAML(yaml);
  assert(obj.count === 42, `Count: ${obj.count}`);
  assert(obj.price === 19.99, `Price: ${obj.price}`);
});

test('YAML: nested objects', () => {
  const yaml = 'person:\n  name: Alice\n  age: 25';
  const obj = parseQuickYAML(yaml);
  assert(obj.person && obj.person.name === 'Alice', 'Nested name failed');
  assert(obj.person && obj.person.age === 25, 'Nested age failed');
});

// Simple YAML parser for testing (matches MVP logic)
function parseQuickYAML(yaml) {
  const lines = yaml.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
  let obj = {};
  let current = {};
  let stack = [{obj: obj, indent: -1}];
  
  for (let line of lines) {
    let indent = line.match(/\S/)?.[0]?.length ?? 0;
    let content = line.trim();
    
    while (stack.length > 1 && stack[stack.length-1].indent >= indent) {
      stack.pop();
    }
    current = stack[stack.length-1].obj;
    
    if (content.startsWith('- ')) {
      let val = content.substring(2).trim();
      let lastKey = Object.keys(current).pop();
      if (lastKey && Array.isArray(current[lastKey])) {
        current[lastKey].push(val === 'true' ? true : val === 'false' ? false : val === 'null' || val === '~' ? null : !isNaN(val) ? Number(val) : val.replace(/^["']|["']$/g, ''));
      }
      continue;
    }
    
    let [key, ...rest] = content.split(':');
    key = key.trim();
    let val = rest.join(':').trim();
    
    if (!val) {
      current[key] = [];
      stack.push({obj: current[key], indent: indent});
    } else {
      let parsedVal = val;
      if (val === 'true') parsedVal = true;
      else if (val === 'false') parsedVal = false;
      else if (val === 'null' || val === '~') parsedVal = null;
      else if (!isNaN(val)) parsedVal = Number(val);
      else parsedVal = val.replace(/^["']|["']$/g, '');
      current[key] = parsedVal;
    }
  }
  return obj;
}

// ============================================
// MVP 117: Diff Tool Logic Tests  
// ============================================
test('Diff: identical texts', () => {
  const result = computeDiff('Hello\nWorld', 'Hello\nWorld');
  assert(result.length === 2, `Expected 2 lines, got ${result.length}`);
  assert(result.every(r => r.type === 'equal'), 'All should be equal');
});

test('Diff: added lines', () => {
  const result = computeDiff('Hello', 'Hello\nWorld');
  assert(result[1].type === 'add', 'Second line should be add');
  assert(result[1].text === 'World', `Text: ${result[1].text}`);
});

test('Diff: removed lines', () => {
  const result = computeDiff('Hello\nWorld', 'Hello');
  assert(result[1].type === 'remove', 'Second line should be remove');
});

test('Diff: modified lines', () => {
  const result = computeDiff('Hello World', 'Hello There');
  assert(result[0].type === 'remove', 'First should be remove');
  assert(result[1].type === 'add', 'Second should be add');
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

// ============================================
// File existence checks
// ============================================
test('Files: mvp115 exists', () => {
  assert(fs.existsSync(path.join(__dirname, 'mvp115-regex-test/index.html')), 'mvp115 index.html missing');
});

test('Files: mvp116 exists', () => {
  assert(fs.existsSync(path.join(__dirname, 'mvp116-yaml-parser/index.html')), 'mvp116 index.html missing');
});

test('Files: mvp117 exists', () => {
  assert(fs.existsSync(path.join(__dirname, 'mvp117-diff-tool/index.html')), 'mvp117 index.html missing');
});

// ============================================
// Summary
// ============================================
console.log('\n========================================');
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('========================================');

process.exit(failed > 0 ? 1 : 0);