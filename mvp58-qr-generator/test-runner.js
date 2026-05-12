// Test runner for QR Generator MVP
const tests = [
  { name: 'Empty input shows error', fn: () => {
    const input = document.getElementById('text');
    input.value = '';
    generateQR();
    return document.getElementById('error').textContent === 'Please enter some text';
  }},
  { name: 'URL input generates QR', fn: () => {
    document.getElementById('text').value = 'https://example.com';
    generateQR();
    return document.getElementById('qr-result').style.display === 'block';
  }},
  { name: 'Text input generates QR', fn: () => {
    document.getElementById('text').value = 'Hello World';
    generateQR();
    const img = document.getElementById('qr-img');
    return img.src && img.src.startsWith('data:image/png');
  }}
];
console.log('QR Generator Tests:', tests.map(t => ({ name: t.name, pass: t.fn() })));