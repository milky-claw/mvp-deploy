#!/usr/bin/env node
// MVP 114: Cron Test CLI - Parse cron and show next runs

function parseCron(expr) {
  const parts = expr.trim().split(/\s+/);
  if (parts.length < 5 || parts.length > 6) return null;
  return {
    min: parts[0], hour: parts[1], dom: parts[2], month: parts[3], dow: parts[4], cmd: parts[5] || ""
  };
}

function describeCron(cron) {
  const parts = [];
  
  // Minute
  if (cron.min === "*") parts.push("every minute");
  else if (cron.min.includes(",")) parts.push(`at minutes ${cron.min}`);
  else if (cron.min.includes("/")) parts.push(`every ${cron.min.split("/")[1]} minutes`);
  else parts.push(`at minute ${cron.min}`);
  
  // Hour
  if (cron.hour === "*") parts.push("every hour");
  else if (cron.hour.includes(",")) parts.push(`at hours ${cron.hour}`);
  else if (cron.hour.includes("/")) parts.push(`every ${cron.hour.split("/")[1]} hours`);
  else parts.push(`at ${cron.hour}:00`);
  
  // Day of month
  if (cron.dom !== "*") {
    parts.push(`on day ${cron.dom}`);
  }
  
  // Month
  if (cron.month !== "*") {
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    parts.push(`in ${months[parseInt(cron.month)] || cron.month}`);
  }
  
  // Day of week
  if (cron.dow !== "*") {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    parts.push(`on ${days[parseInt(cron.dow)] || cron.dow}`);
  }
  
  return parts.join(", ");
}

function getNextRuns(cron, count = 5) {
  const runs = [];
  const now = new Date();
  let current = new Date(now);
  current.setSeconds(0);
  current.setMilliseconds(0);
  
  for (let i = 0; i < 100 && runs.length < count; i++) {
    current = new Date(current.getTime() + 60000); // add 1 minute
    
    const min = parseInt(cron.min);
    const hr = parseInt(cron.hour);
    const dom = parseInt(cron.dom);
    const mon = parseInt(cron.month);
    const dow = parseInt(cron.dow);
    
    const matchMin = cron.min === "*" || (cron.min.includes("/") && current.getMinutes() % parseInt(cron.min.split("/")[1]) === 0) || current.getMinutes() === min;
    const matchHour = cron.hour === "*" || current.getHours() === hr;
    const matchDom = cron.dom === "*" || current.getDate() === dom;
    const matchMon = cron.month === "*" || current.getMonth() + 1 === mon;
    const matchDow = cron.dow === "*" || current.getDay() === dow;
    
    if (matchMin && matchHour && matchDom && matchMon && matchDow) {
      runs.push(current.toISOString().replace("T", " ").substring(0, 16));
    }
  }
  
  return runs;
}

console.log("🧪 MVP 114: Cron Test CLI\n");

const testCrons = [
  "*/5 * * * *",
  "0 9 * * 1-5",
  "30 14 * * *",
  "0 0 1 * *",
  "0 * * * *"
];

testCrons.forEach((expr, i) => {
  const cron = parseCron(expr);
  console.log(`\n--- Test ${i+1}: ${expr} ---`);
  console.log("📋", describeCron(cron));
  console.log("⏭️  Next runs:", getNextRuns(cron, 3).join(", "));
});

// CLI mode
const args = process.argv.slice(2);
if (args.length > 0) {
  const expr = args.join(" ");
  const cron = parseCron(expr);
  console.log(`\n📝 Parsing: ${expr}`);
  console.log("📋", describeCron(cron));
  console.log("⏭️  Next 10 runs:");
  getNextRuns(expr.includes(" ") ? expr : "*/5 * * * *", 10).forEach(r => console.log("  ", r));
}