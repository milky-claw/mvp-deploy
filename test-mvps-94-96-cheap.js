// Cheap tests - verify HTML files have required elements
const fs = require('fs');
const path = require('path');

const mvpTests = {
  'mvp94-jwt-decoder': () => {
    const html = fs.readFileSync('mvp94-jwt-decoder/index.html', 'utf8');
    return html.includes('input') && html.includes('JWT');
  },
  'mvp95-sql-formatter': () => {
    const html = fs.readFileSync('mvp95-sql-formatter/index.html', 'utf8');
    return html.includes('textarea') && html.includes('SQL');
  },
  'mvp96-json-to-ts': () => {
    const html = fs.readFileSync('mvp96-json-to-ts/index.html', 'utf8');
    return html.includes('textarea') && (html.includes('TypeScript') || html.includes('JSON'));
  }
};

console.log('=== MVP 94-96 Cheap Tests ===\n');
let allPassed = true;

Object.entries(mvpTests).forEach(([name, test]) => {
  try {
    const result = test();
    console.log(`${result ? '✅' : '❌'} ${name}: ${result ? 'PASS' : 'FAIL'}`);
    if (!result) allPassed = false;
  } catch (e) {
    console.log(`❌ ${name}: ERROR - ${e.message}`);
    allPassed = false;
  }
});

console.log('\n=== Test Summary ===');
console.log(allPassed ? '✅ All tests passed!' : '❌ Some tests failed');

process.exit(allPassed ? 0 : 1);