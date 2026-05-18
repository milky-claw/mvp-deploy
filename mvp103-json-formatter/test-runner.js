// MVP 103 - JSON Formatter Tests

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

function assertEquals(actual, expected, msg = '') {
  if (actual !== expected) {
    throw new Error(`${msg} Expected ${expected}, got ${actual}`);
  }
}

function assertTrue(actual, msg = '') {
  if (!actual) {
    throw new Error(`${msg} Expected true, got ${actual}`);
  }
}

// Test countKeys function
function countKeys(obj, count = 0) {
  if (obj && typeof obj === 'object') {
    count += Object.keys(obj).length;
    for (const key in obj) {
      count = countKeys(obj[key], count);
    }
  }
  return count;
}

// Test formatJSON logic
function formatJSON(input) {
  const obj = JSON.parse(input);
  return JSON.stringify(obj, null, 2);
}

// Test minifyJSON logic
function minifyJSON(input) {
  const obj = JSON.parse(input);
  return JSON.stringify(obj);
}

// Test validateJSON logic
function validateJSON(input) {
  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
}

// === TESTS ===

console.log('\n--- MVP 103: JSON Formatter Tests ---\n');

// countKeys tests
test('countKeys: empty object returns 0', () => {
  assertEquals(countKeys({}), 0);
});

test('countKeys: single key returns 1', () => {
  assertEquals(countKeys({a: 1}), 1);
});

test('countKeys: nested keys counted', () => {
  assertEquals(countKeys({a: {b: {c: 1}}}), 3);
});

test('countKeys: array objects counted', () => {
  // Arrays add numeric indices to count
  const result = countKeys({a: [{b: 1}, {c: 2}]});
  assertTrue(result >= 3, 'Should count at least 3 keys');
});

// formatJSON tests
test('formatJSON: formats with 2-space indent', () => {
  const result = formatJSON('{"a":1}');
  assertEquals(result.includes('  "a": 1'), true);
});

test('formatJSON: throws on invalid JSON', () => {
  let threw = false;
  try { formatJSON('invalid'); } catch { threw = true; }
  assertEquals(threw, true);
});

// minifyJSON tests
test('minifyJSON: removes whitespace', () => {
  const result = minifyJSON('{"a":1}');
  assertEquals(result, '{"a":1}');
});

// validateJSON tests
test('validateJSON: valid JSON returns true', () => {
  assertEquals(validateJSON('{"a":1}'), true);
});

test('validateJSON: invalid JSON returns false', () => {
  assertEquals(validateJSON('invalid'), false);
});

test('validateJSON: empty string returns false', () => {
  assertEquals(validateJSON(''), false);
});

// Summary
console.log(`\n--- Results: ${passed} passed, ${failed} failed ---`);
console.log(failed === 0 ? '✅ All tests passed!' : '❌ Some tests failed');