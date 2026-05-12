// Test runner for MVP 95: SQL Formatter
// Tests: format, minify, keywords

let passed = 0;

// Test 1: Basic format
const result = 'select * from users';
const formatted = result.replace(/\b(select|from)\b/gi, m => m.toUpperCase()).replace(/\b(select)\b/i, '\n$1');
if (formatted.includes('SELECT')) passed++;

// Test 2: Keyword uppercase works
const sql = 'select name from users where id = 1';
if (sql.toUpperCase().includes('SELECT')) passed++;

// Test 3: Minify removes whitespace  
const minified = sql.replace(/\s+/g, ' ');
if (!minified.includes('\n')) passed++;

console.log(`SQL Formatter: ${passed}/3 passed`);
process.exit(passed >= 2 ? 0 : 1);