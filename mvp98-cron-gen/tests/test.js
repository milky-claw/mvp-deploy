// MVP 98: Cron Generator - Unit Tests

describeCron = (cron) => {
  const parts = cron.split(' ');
  const [min, hour, day, month, wday] = parts;
  
  let desc = '';
  
  // Minute
  if (min === '*') desc += 'Every minute';
  else if (min.includes('/')) desc += `Every ${min.split('/')[1]} minutes`;
  else desc += `At minute ${min}`;
  
  // Hour
  if (hour === '*') desc += ' of every hour';
  else if (hour.includes('/')) desc += `, every ${hour.split('/')[1]} hours`;
  else desc += ` at ${hour}:00`;
  
  // Day
  if (day !== '*') desc += ` on day ${day}`;
  
  // Month
  if (month !== '*') desc += ` in month ${month}`;
  
  // Weekday
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  if (wday !== '*') {
    if (wday.includes('-')) {
      const [start, end] = wday.split('-');
      desc += ` on ${days[start]} through ${days[end]}`;
    } else {
      desc += ` on ${days[wday]}`;
    }
  } else {
    desc += ' every day';
  }
  
  return desc;
};

const tests = {
  testEveryMinute: () => {
    const result = describeCron('* * * * *');
    return result.includes('Every minute') && result.includes('every day');
  },
  
  testHourly: () => {
    const result = describeCron('0 * * * *');
    return result.includes('At minute 0');
  },
  
  testDaily9AM: () => {
    const result = describeCron('0 9 * * *');
    return result.includes(' at 9:00');
  },
  
  testWeekdays9AM: () => {
    const result = describeCron('0 9 * * 1-5');
    return result.includes('Mon') && result.includes('Fri');
  },
  
  testMonthly: () => {
    const result = describeCron('0 0 1 * *');
    return result.includes('on day 1');
  },
  
  testCronParsing: () => {
    const cron = '0 9 * * 1-5';
    const parts = cron.split(' ');
    return parts.length === 5 && parts[4] === '1-5';
  }
};

// Run tests
console.log('🧪 Running MVP 98 Tests...\n');
let passed = 0;
let failed = 0;

for (const [name, test] of Object.entries(tests)) {
  try {
    const result = test();
    if (result) {
      console.log(`✅ ${name}`);
      passed++;
    } else {
      console.log(`❌ ${name}`);
      failed++;
    }
  } catch(e) {
    console.log(`❌ ${name}: ${e.message}`);
    failed++;
  }
}

console.log(`\n📊 ${passed}/${passed+failed} tests passed`);
process.exit(failed > 0 ? 1 : 0);