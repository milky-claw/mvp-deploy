// Test Suite: Color Converter
const tests = [
  {
    name: "Default color loads correctly",
    fn: () => {
      return document.getElementById('preview').textContent === '#A55EEA';
    }
  },
  {
    name: "HEX input updates all formats",
    fn: () => {
      document.getElementById('hexInput').value = '#FF0000';
      fromHex();
      return document.getElementById('rgbInput').value === 'rgb(255, 0, 0)';
    }
  },
  {
    name: "RGB input updates HEX",
    fn: () => {
      document.getElementById('rgbInput').value = 'rgb(0, 255, 0)';
      fromRgb();
      return document.getElementById('hexInput').value === '#00FF00';
    }
  },
  {
    name: "HSL conversion works",
    fn: () => {
      document.getElementById('hslInput').value = 'hsl(0, 100%, 50%)';
      fromHsl();
      return document.getElementById('rgbInput').value === 'rgb(255, 0, 0)';
    }
  },
  {
    name: "Random color changes values",
    fn: () => {
      const initialR = r;
      randomColor();
      return r !== initialR; // should change
    }
  }
];

let passed = 0;
tests.forEach(t => {
  const result = t.fn();
  console.log(`${result ? '✓' : '✗'} ${t.name}`);
  if (result) passed++;
});
console.log(`\n${passed}/${tests.length} tests passed`);