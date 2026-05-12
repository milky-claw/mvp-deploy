// Unit tests for MVP 116 - YAML Parser
// Run with: node tests/test.js

const tests = [];
function test(name, fn) { tests.push({name, fn}); }
function assert(cond, msg) { if (!cond) throw new Error(msg); }

// Inline YAML parser matching MVP logic
function parseQuickYAML(yaml) {
  const lines = yaml.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
  let obj = {};
  let stack = [{obj: obj, indent: -1}];
  
  for (let line of lines) {
    let indent = line.match(/\S/)?.[0]?.length ?? 0;
    let content = line.trim();
    
    while (stack.length > 1 && stack[stack.length-1].indent >= indent) {
      stack.pop();
    }
    let current = stack[stack.length-1].obj;
    
    if (content.startsWith('- ')) {
      let val = content.substring(2).trim();
      let lastKey = Object.keys(current).pop();
      if (lastKey && Array.isArray(current[lastKey])) {
        current[lastKey].push(parseValue(val));
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
      current[key] = parseValue(val);
    }
  }
  return obj;
}

function parseValue(v) {
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (v === 'null' || v === '~') return null;
  if (!isNaN(v)) return Number(v);
  return v.replace(/^["']|["']$/g, '');
}

test('Simple key-value', () => {
  const obj = parseQuickYAML('name: John\nage: 30');
  assert(obj.name === 'John', 'Name: ' + obj.name);
  assert(obj.age === 30, 'Age: ' + obj.age);
});

test('Boolean values', () => {
  const obj = parseQuickYAML('active: true\ndeleted: null');
  assert(obj.active === true, 'Active: ' + obj.active);
  assert(obj.deleted === null, 'Deleted: ' + obj.deleted);
});

test('Number parsing', () => {
  const obj = parseQuickYAML('count: 42\nprice: 19.99');
  assert(obj.count === 42, 'Count: ' + obj.count);
  assert(obj.price === 19.99, 'Price: ' + obj.price);
});

test('Quoted strings', () => {
  const obj = parseQuickYAML('name: "John Doe"');
  assert(obj.name === 'John Doe', 'Name: ' + obj.name);
});

test('Nested objects', () => {
  const obj = parseQuickYAML('user:\n  name: Alice');
  assert(obj.user && obj.user.name === 'Alice', 'Nested failed');
});

let passed = 0, failed = 0;
tests.forEach(t => {
  try { t.fn(); console.log('✅ ' + t.name); passed++; }
  catch (e) { console.log('❌ ' + t.name + ': ' + e.message); failed++; }
});

console.log('\n' + passed + '/' + tests.length + ' tests passed');
process.exit(failed > 0 ? 1 : 0);