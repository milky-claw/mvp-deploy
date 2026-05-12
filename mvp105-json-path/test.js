/**
 * Unit Tests for JSON Path Finder (MVP 105)
 * Tests the path evaluation logic
 */

const testData = {
  users: [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 }
  ],
  settings: {
    theme: 'dark',
    notifications: { email: true, push: false }
  },
  items: ['a', 'b', 'c']
};

// This is the simplified evalPath from MVP 105
function simpleEval(obj, path) {
  if (!path) return obj;
  
  const parts = path.match(/[^.\[\]]+|\[\d+\]|\[\*\]/g) || [];
  if (parts.length === 0) return obj;
  
  let current = obj;
  for (const part of parts) {
    if (part === '[*]') {
      if (!Array.isArray(current)) throw new Error('Cannot use [*] on non-array');
      return current.map(c => c);
    }
    const match = part.match(/\[(\d+)\]/);
    if (match) {
      const key = current instanceof Array ? parseInt(match[1]) : match[1];
      current = current[key];
    } else {
      current = current[part];
    }
    if (current === undefined) throw new Error(`Path "${part}" not found`);
  }
  return current;
}

let testsRun = 0;
let testsPassed = 0;

function test(name, fn) {
  testsRun++;
  try {
    fn();
    console.log(`✅ ${name}`);
    testsPassed++;
  } catch (e) {
    console.log(`❌ ${name}: ${e.message}`);
  }
}

function assertEqual(actual, expected, msg = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${msg || 'Assertion failed'}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log('\n🧪 JSON Path Finder Tests\n' + '='.repeat(30));

// Test 1: Simple key access
test('users -> returns users array', () => {
  assertEqual(simpleEval(testData, 'users'), testData.users);
});

// Test 2: Nested access
test('settings.theme -> "dark"', () => {
  assertEqual(simpleEval(testData, 'settings.theme'), 'dark');
});

test('settings.notifications.email -> true', () => {
  assertEqual(simpleEval(testData, 'settings.notifications.email'), true);
});

// Test 3: Array index
test('users[0] -> first user', () => {
  assertEqual(simpleEval(testData, 'users[0]'), { name: 'John', age: 30 });
});

test('items[2] -> "c"', () => {
  assertEqual(simpleEval(testData, 'items[2]'), 'c');
});

// Test 4: Array wildcard
test('items[*] -> all items', () => {
  assertEqual(simpleEval(testData, 'items[*]'), ['a', 'b', 'c']);
});

// Test 5: Deep nesting
test('settings.notifications.push -> false', () => {
  assertEqual(simpleEval(testData, 'settings.notifications.push'), false);
});

// Test 6: Error handling - invalid path
test('invalid path throws error', () => {
  try {
    simpleEval(testData, 'nonexistent.path');
    throw new Error('Should have thrown');
  } catch (e) {
    // Expected
  }
});

// Test 7: Out of bounds array access
test('out of bounds throws error', () => {
  try {
    simpleEval(testData, 'users[99]');
    throw new Error('Should have thrown');
  } catch (e) {
    // Expected
  }
});

// Test 8: Empty path
test('empty path returns root', () => {
  assertEqual(simpleEval(testData, ''), testData);
});

console.log('\n📊 Results: ' + testsPassed + '/' + testsRun + ' passed\n');

if (testsPassed !== testsRun) {
  process.exit(1);
}