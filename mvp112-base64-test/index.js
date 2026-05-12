#!/usr/bin/env node
// MVP 112: Base64 Test CLI - Test encode/decode with edge cases

const testCases = [
  { input: "Hello", expected: "SGVsbG8=" },
  { input: "World", expected: "V29ybGQ=" },
  { input: "", expected: "" },
  { input: "A", expected: "QQ==" },
  { input: "AB", expected: "QUI=" },
  { input: "ABC", expected: "QUJD" },
  { input: "Test 123!@#", special: true },
  { input: "日本語", special: true },
  { input: "🚀", emoji: true }
];

function encode64(s) {
  return Buffer.from(s, 'utf-8').toString('base64');
}

function decode64(s) {
  return Buffer.from(s, 'base64').toString('utf-8');
}

console.log("🧪 MVP 112: Base64 Test CLI\n");
console.log("Running", testCases.length, "test cases...\n");

let passed = 0;
let failed = 0;

testCases.forEach((tc, i) => {
  const encoded = encode64(tc.input);
  const decoded = decode64(encoded);
  
  const ok = decoded === tc.input;
  
  if (tc.expected && encoded !== tc.expected) {
    console.log(`❌ Test ${i+1}: Expected ${tc.expected}, got ${encoded}`);
    failed++;
  } else if (ok) {
    console.log(`✅ Test ${i+1}: "${tc.input}" → "${encoded}" → "${decoded}"`);
    passed++;
  } else {
    console.log(`❌ Test ${i+1}: Roundtrip failed`);
    failed++;
  }
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

// CLI mode: if args provided, encode/decode them
const args = process.argv.slice(2);
if (args.length > 0) {
  const mode = args[0];
  const value = args.slice(1).join(" ");
  
  if (mode === "encode") {
    console.log("\n📝 encode:", encode64(value));
  } else if (mode === "decode") {
    console.log("\n📝 decode:", decode64(value));
  }
}