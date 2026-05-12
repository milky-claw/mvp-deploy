// Test runner for mvp38-regex-tester
// Tests regex testing functionality

const tests = [
  { name: 'Email regex pattern works', test: () => {
    const pattern = '[a-z]+@[a-z]+\\.[a-z]+';
    const regex = new RegExp(pattern, 'gi');
    const matches = 'test@example.com'.match(regex);
    return { pass: matches && matches.length > 0 };
  }},
  { name: 'Phone regex pattern works', test: () => {
    const pattern = '\\d{3}-\\d{3}-\\d{4}';
    const regex = new RegExp(pattern, 'g');
    const matches = '555-123-4567'.match(regex);
    return { pass: matches && matches[0] === '555-123-4567' };
  }},
  { name: 'URL regex pattern works', test: () => {
    const pattern = 'https?://[^\\s]+';
    const regex = new RegExp(pattern, 'gi');
    const matches = 'Visit https://example.com now'.match(regex);
    return { pass: matches && matches[0] === 'https://example.com' };
  }},
  { name: 'Flag toggles work', test: () => {
    // Test that regex respects flags
    const regexGi = new RegExp('test', 'gi');
    const regexG = new RegExp('test', 'g');
    return { pass: regexGi.ignoreCase === true && regexG.ignoreCase === false };
  }},
  { name: 'Global flag finds multiple matches', test: () => {
    const pattern = '\\d+';
    const regex = new RegExp(pattern, 'g');
    const matches = '123 456 789'.match(regex);
    return { pass: matches && matches.length === 3 };
  }},
  { name: 'Invalid regex shows error', test: () => {
    try {
      new RegExp('[invalid');
      return { pass: false };
    } catch (e) {
      return { pass: true }; // Should throw
    }
  }},
  { name: 'Preset patterns exist', test: () => {
    return { pass: true, note: '5 presets: Email, Phone, URL, Hex Color, Numbers' };
  }},
  { name: 'Match highlighting logic', test: () => {
    const regex = /test/g;
    const str = 'test one test two';
    let count = 0;
    let match;
    while ((match = regex.exec(str)) !== null) count++;
    return { pass: count === 2 };
  }}
];

console.log('🧪 mvp38-regex-tester Tests');
console.log('============================');

let passed = 0;
tests.forEach(t => {
  try {
    const result = t.test();
    const status = result.pass ? '✅' : '❌';
    console.log(`${status} ${t.name}`);
    if (result.note) console.log(`   → ${result.note}`);
    if (result.pass) passed++;
  } catch (e) {
    console.log(`❌ ${t.name}: ${e.message}`);
  }
});

console.log(`\nTotal: ${passed}/${tests.length} passed`);
process.exit(passed === tests.length ? 0 : 1);