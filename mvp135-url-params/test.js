// Test runner for MVP135 URL Parameter Extractor
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

function assertEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error(`Expected: ${expected}, Got: ${actual}`);
  }
}

// Tests (simulating URLSearchParams logic)
test('Extract single param', () => {
  const url = new URL('https://example.com?q=test');
  const params = {};
  url.searchParams.forEach((v, k) => params[k] = v);
  assertEqual(params.q, 'test');
});

test('Extract multiple params', () => {
  const url = new URL('https://example.com?a=1&b=2&c=3');
  const params = {};
  url.searchParams.forEach((v, k) => params[k] = v);
  assertEqual(Object.keys(params).length, 3);
  assertEqual(params.a, '1');
  assertEqual(params.b, '2');
  assertEqual(params.c, '3');
});

test('URL without params', () => {
  const url = new URL('https://example.com/page');
  const params = {};
  url.searchParams.forEach((v, k) => params[k] = v);
  assertEqual(Object.keys(params).length, 0);
});

test('Encode special characters', () => {
  const url = new URL('https://example.com?q=hello world');
  assertEqual(url.searchParams.get('q'), 'hello world');
});

test('Build URL with params', () => {
  const url = new URL('https://example.com');
  url.searchParams.set('name', 'John');
  url.searchParams.set('age', '30');
  assertEqual(url.toString(), 'https://example.com/?name=John&age=30');
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);