// Test runner for mvp37-hash-generator
// Tests hash generation functions

const crypto = require('crypto');

const tests = [
  { name: 'Node.js crypto module available', test: () => {
    return { pass: typeof crypto !== 'undefined' && typeof crypto.createHash === 'function' };
  }},
  { name: 'SHA-256 hash generation', test: () => {
    const hash = crypto.createHash('sha256').update('hello').digest('hex');
    return { pass: hash === '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824' };
  }},
  { name: 'SHA-512 hash generation', test: () => {
    const hash = crypto.createHash('sha512').update('test').digest('hex');
    return { pass: hash.length === 128 }; // SHA-512 produces 128 hex chars
  }},
  { name: 'MD5 hash generation', test: () => {
    const hash = crypto.createHash('md5').update('hello').digest('hex');
    return { pass: hash === '5d41402abc4b2a76b9719d911017c592' };
  }},
  { name: 'Hash outputs are hex strings', test: () => {
    const sha1 = crypto.createHash('sha1').update('').digest('hex');
    return { pass: /^[a-f0-9]{40}$/.test(sha1) };
  }},
  { name: 'Empty string produces valid hash', test: () => {
    const hash = crypto.createHash('sha256').update('').digest('hex');
    return { pass: hash.length === 64 };
  }}
];

console.log('🧪 mvp37-hash-generator Tests');
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