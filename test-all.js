#!/usr/bin/env node
/**
 * Master Test Runner - Runs all MVP tests
 * Run: node test-all.js
 */

const { execSync } = require('child_process');
const path = require('path');

const mvpDirs = [
  'mvp22-url-encoder',
  'mvp23-password-strength', 
  'mvp24-markdown-preview'
];

console.log('🧪 MVP Test Suite - All Tests\n' + '='.repeat(50));

let totalPassed = 0;
let totalFailed = 0;

mvpDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  console.log(`\n📁 Testing: ${dir}`);
  console.log('-'.repeat(40));
  try {
    execSync('node test-runner.js', { cwd: dirPath, stdio: 'inherit' });
    totalPassed++;
  } catch (e) {
    totalFailed++;
  }
});

console.log('\n' + '='.repeat(50));
console.log(`🎯 Overall: ${totalPassed}/${mvpDirs.length} test suites passed`);
process.exit(totalFailed > 0 ? 1 : 0);