// MVP 99: Color Mixer - Unit Tests

// Core functions extracted from the HTML
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c+c).join('');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return { r, g, b };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function mixColors(c1, c2, blend) {
  const rgb1 = hexToRgb(c1);
  const rgb2 = hexToRgb(c2);
  
  const r = rgb1.r * (1 - blend) + rgb2.r * blend;
  const g = rgb1.g * (1 - blend) + rgb2.g * blend;
  const b = rgb1.b * (1 - blend) + rgb2.b * blend;
  
  return rgbToHex(r, g, b);
}

const tests = {
  testHexToRgbRed: () => {
    const rgb = hexToRgb('#ff0000');
    return rgb.r === 255 && rgb.g === 0 && rgb.b === 0;
  },
  
  testHexToRgbBlue: () => {
    const rgb = hexToRgb('#0000ff');
    return rgb.r === 0 && rgb.g === 0 && rgb.b === 255;
  },
  
  testHexToRgbShort: () => {
    const rgb = hexToRgb('#f00');
    return rgb.r === 255 && rgb.g === 0 && rgb.b === 0;
  },
  
  testRgbToHex: () => {
    return rgbToHex(255, 0, 0) === '#ff0000';
  },
  
  testRgbToHexBlue: () => {
    return rgbToHex(0, 0, 255) === '#0000ff';
  },
  
  testMix50WhiteBlack: () => {
    const result = mixColors('#000000', '#ffffff', 0.5);
    return result === '#808080';
  },
  
  testMixRedBlue: () => {
    const result = mixColors('#ff0000', '#0000ff', 0.5);
    // Red(255,0,0) + Blue(0,0,255) at 50% = (127.5, 0, 127.5) -> #800080 (rounded)
    return result === '#800080';
  },
  
  testMix0Percent: () => {
    const result = mixColors('#ff0000', '#0000ff', 0);
    return result === '#ff0000';
  },
  
  testMix100Percent: () => {
    const result = mixColors('#ff0000', '#0000ff', 1);
    return result === '#0000ff';
  },
  
  testHexValidation: () => {
    const valid = '#ff0000'.match(/^#[0-9a-f]{3,6}$/i);
    return valid !== null;
  }
};

// Run tests
console.log('🧪 Running MVP 99 Tests...\n');
let passed = 0;
let failed = 0;

for (const [name, test] of Object.entries(tests)) {
  try {
    const result = test();
    if (result) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
      failed++;
    }
  } catch(e) {
    console.log(`❌ ${name}: ${e.message}`);
    failed++;
  }
}

console.log(`\n📊 ${passed}/${passed+failed} tests passed`);
process.exit(failed > 0 ? 1 : 0);