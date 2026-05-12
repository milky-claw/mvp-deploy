#!/usr/bin/env node
// MVP 113: JWT Test CLI - Decode and validate JWT tokens

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf-8');
}

function decodeJWT(token) {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  
  try {
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    const signature = parts[2];
    return { header, payload, signature };
  } catch (e) {
    return null;
  }
}

function expStatus(payload) {
  if (!payload.exp && !payload.iat) return "⚪ No expiry";
  const exp = payload.exp || payload.iat + 3600;
  const now = Math.floor(Date.now() / 1000);
  return exp > now ? "🟢 Valid" : "🔴 Expired";
}

console.log("🧪 MVP 113: JWT Test CLI\n");

// Test tokens
const testTokens = [
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZXhwIjoxNjAwMDAwMDAwfQ.签名",
  "invalid.token.here"
];

testTokens.forEach((token, i) => {
  console.log(`\n--- Test ${i+1} ---`);
  console.log("Token:", token.substring(0, 50) + "...");
  
  const decoded = decodeJWT(token);
  if (decoded) {
    console.log("✅ Header:", JSON.stringify(decoded.header));
    console.log("✅ Payload:", JSON.stringify(decoded.payload));
    console.log("📊 Status:", expStatus(decoded.payload));
    if (decoded.payload.iss) console.log("   Issuer:", decoded.payload.iss);
    if (decoded.payload.sub) console.log("   Subject:", decoded.payload.sub);
  } else {
    console.log("❌ Failed to decode");
  }
});

// CLI mode
const args = process.argv.slice(2);
if (args.length > 0) {
  const token = args.join(" ");
  console.log("\n📝 Decoding:", token);
  const decoded = decodeJWT(token);
  if (decoded) {
    console.log("Header:", JSON.stringify(decoded.header, null, 2));
    console.log("Payload:", JSON.stringify(decoded.payload, null, 2));
    console.log("Status:", expStatus(decoded.payload));
  } else {
    console.log("❌ Invalid JWT format");
  }
}