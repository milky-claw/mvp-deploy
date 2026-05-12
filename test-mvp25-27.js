// Master Test Runner - MVP Deploy
// Runs all test suites

const { execSync } = require('child_process');
const path = require('path');

const testSuites = [
  { name: 'MVP 25: Timer / Stopwatch', dir: 'mvp25-timer' },
  { name: 'MVP 26: QR Code Generator', dir: 'mvp26-qr-generator' },
  { name: 'MVP 27: Text Statistics', dir: 'mvp27-text-stats' },
];

let totalPassed = 0;
let totalFailed = 0;

console.log('='.repeat(60));
console.log('MVP DEPLOY - Master Test Runner');
console.log('='.repeat(60));
console.log('');

for (const suite of testSuites) {
  console.log(`Running: ${suite.name}...`);
  try {
    execSync('node test-runner.js', { 
      cwd: path.join(__dirname, suite.dir),
      stdio: 'pipe'
    });
    totalPassed++;
    console.log(`   ✅ PASSED`);
  } catch (e) {
    totalFailed++;
    console.log(`   ❌ FAILED`);
  }
  console.log('');
}

console.log('-'.repeat(60));
console.log(`TOTAL: ${totalPassed} passed, ${totalFailed} failed`);
console.log('');

process.exit(totalFailed > 0 ? 1 : 0);