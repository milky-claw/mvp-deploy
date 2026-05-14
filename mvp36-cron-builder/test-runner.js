#!/usr/bin/env node
/**
 * Test Runner for Cron Builder MVP
 * Run: node test-runner.js
 * 
 * Tests the cron description logic from the MVP
 */

// Matches the describe() function from index.html
function describe(m, h, d, mon, dow) {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let parts = [];
  if (m === '*' && h === '*') parts.push('Every minute');
  else if (m === '*') parts.push(`Every minute past ${h}:00`);
  else if (m === '0' && h === '*') parts.push('Every hour at minute 0');
  else if (h === '*') parts.push(`At minute ${m} of every hour`);
  else if (m !== '*' && h !== '*') parts.push(`At ${h.padStart(2,'0')}:${m.padStart(2,'0')}`);
  
  if (d !== '*') parts.push(`on day ${d}`);
  if (mon !== '*') parts.push(`in ${months[parseInt(mon)] || mon}`);
  if (dow !== '*') parts.push(`on ${dow.split('-').map(x=>days[parseInt(x)]||x).join('-')}`);
  
  return parts.join(' ') || 'Custom schedule';
}

const tests = [
  // Preset tests (matching actual describe() output)
  { name: 'Every hour (0 * * * *)', args: ['0', '*', '*', '*', '*'], expected: 'Every hour at minute 0' },
  { name: 'Daily midnight (0 0 * * *)', args: ['0', '0', '*', '*', '*'], expected: 'At 00:00' },
  { name: 'Weekdays 9AM (0 9 * * 1-5)', args: ['0', '9', '*', '*', '1-5'], expected: 'At 09:00 on Mon-Fri' },
  { name: 'Every 15 min (*/15 * * * *)', args: ['*/15', '*', '*', '*', '*'], expected: 'At minute */15 of every hour' },
  { name: 'Weekly Sunday (0 0 * * 0)', args: ['0', '0', '*', '*', '0'], expected: 'At 00:00 on Sun' },
  
  // Common patterns
  { name: 'Every minute (* * * * *)', args: ['*', '*', '*', '*', '*'], expected: 'Every minute' },
  { name: 'At 14:30 (30 14 * * *)', args: ['30', '14', '*', '*', '*'], expected: 'At 14:30' },
  { name: 'First of month (0 0 1 * *)', args: ['0', '0', '1', '*', '*'], expected: 'At 00:00 on day 1' },
  { name: 'March at noon (0 12 * 3 *)', args: ['0', '12', '*', '3', '*'], expected: 'At 12:00 in Mar' },
  { name: 'Saturday 10AM (0 10 * * 6)', args: ['0', '10', '*', '*', '6'], expected: 'At 10:00 on Sat' },
];

console.log('🧪 Cron Builder Test Suite\n' + '='.repeat(45));

let passed = 0;
let failed = 0;

tests.forEach(t => {
  const result = describe(...t.args);
  const ok = result === t.expected;
  
  console.log(`${ok ? '✅' : '❌'} ${t.name}`);
  if (!ok) {
    console.log(`   Expression: ${t.args.join(' ')}`);
    console.log(`   Expected: "${t.expected}"`);
    console.log(`   Got:      "${result}"`);
    failed++;
  } else {
    passed++;
  }
});

console.log('\n' + '='.repeat(45));
console.log(`📊 Results: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);