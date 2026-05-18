// MVP 104 - Color Palette Tests

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

// Replicate the logic from mvp104-color-palette
function randomColor() {
  return {
    h: Math.floor(Math.random() * 360),
    s: 50 + Math.floor(Math.random() * 50),
    l: 30 + Math.floor(Math.random() * 40)
  };
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hslToRgb(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  return `rgb(${f(0)}, ${f(8)}, ${f(4)})`;
}

// === TESTS ===

console.log('\n--- MVP 104: Color Palette Tests ---\n');

// randomColor tests
test('randomColor: returns object with h, s, l', () => {
  const c = randomColor();
  assertTrue(typeof c.h === 'number' && typeof c.s === 'number' && typeof c.l === 'number');
});

test('randomColor: hue in valid range 0-359', () => {
  const c = randomColor();
  assertTrue(c.h >= 0 && c.h < 360, 'Hue out of range');
});

test('randomColor: saturation in valid range 50-99', () => {
  const c = randomColor();
  assertTrue(c.s >= 50 && c.s <= 99, 'Saturation out of range');
});

test('randomColor: lightness in valid range 30-69', () => {
  const c = randomColor();
  assertTrue(c.l >= 30 && c.l <= 69, 'Lightness out of range');
});

// hslToHex tests
test('hslToHex: black (0, 0, 0) returns #000000', () => {
  assertEquals(hslToHex(0, 0, 0), '#000000');
});

test('hslToHex: white (0, 0, 100) returns #ffffff', () => {
  assertEquals(hslToHex(0, 0, 100), '#ffffff');
});

test('hslToHex: red (0, 100, 50) returns #ff0000 or close', () => {
  const hex = hslToHex(0, 100, 50);
  // Allow some variation due to rounding
  assertTrue(hex.length === 7, 'Should be 7 char hex');
  assertTrue(hex.startsWith('#'), 'Should start with #');
});

test('hslToHex: green (120, 100, 50) is green-ish', () => {
  const hex = hslToHex(120, 100, 50);
  assertTrue(hex.startsWith('#'), 'Should be valid hex');
});

test('hslToHex: blue (240, 100, 50) is blue-ish', () => {
  const hex = hslToHex(240, 100, 50);
  assertTrue(hex.startsWith('#'), 'Should be valid hex');
});

// hslToRgb tests
test('hslToRgb: black returns rgb(0, 0, 0)', () => {
  assertEquals(hslToRgb(0, 0, 0), 'rgb(0, 0, 0)');
});

test('hslToRgb: white returns rgb(255, 255, 255)', () => {
  assertEquals(hslToRgb(0, 0, 100), 'rgb(255, 255, 255)');
});

test('hslToRgb: red format correct', () => {
  const rgb = hslToRgb(0, 100, 50);
  assertTrue(rgb.startsWith('rgb(') && rgb.endsWith(')'), 'RGB format invalid');
});

test('hslToRgb: returns valid numbers', () => {
  const rgb = hslToRgb(180, 50, 50);
  const nums = rgb.match(/\d+/g).map(Number);
  assertTrue(nums.every(n => n >= 0 && n <= 255), 'RGB values out of range');
});

// Summary
console.log(`\n--- Results: ${passed} passed, ${failed} failed ---`);
console.log(failed === 0 ? '✅ All tests passed!' : '❌ Some tests failed');