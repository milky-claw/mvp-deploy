#!/usr/bin/env node
// Unified test runner for MVPs 97-99

const { execSync } = require('child_process');
const path = require('path');

const mvps = [
  { id: 97, name: 'Base64 Image Tool', dir: 'mvp97-base64-img' },
  { id: 98, name: 'Cron Generator', dir: 'mvp98-cron-gen' },
  { id: 99, name: 'Color Mixer', dir: 'mvp99-color-mixer' }
];

console.log('🧪 Running All MVP Tests (97-99)\n');
console.log('═'.repeat(50));

let allPassed = true;

for (const mvp of mvps) {
  console.log(`\n📦 ${mvp.name} (MVP ${mvp.id})`);
  console.log('-'.repeat(30));
  
  try {
    execSync(`cd ${path.join(__dirname, mvp.dir, 'tests')} && node test.js`, { 
      stdio: 'inherit'
    });
  } catch(e) {
    allPassed = false;
  }
}

console.log('\n' + '═'.repeat(50));
console.log(allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED');
process.exit(allPassed ? 0 : 1);