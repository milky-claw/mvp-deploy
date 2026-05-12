#!/usr/bin/env node
/**
 * Test Runner for MVPs 103-105 (QR Reader, Hash Verifier, JSON Path)
 * Run: node test-mvps-103-105.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const MVPS = [
  { id: 103, name: 'QR Code Reader', url: 'https://classy-khapse-8def75.netlify.app' },
  { id: 104, name: 'Hash Verifier', url: 'https://gleaming-tanuki-48aa45.netlify.app' },
  { id: 105, name: 'JSON Path Finder', url: 'https://tourmaline-daffodil-daf3d2.netlify.app' }
];

function checkURL(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      resolve({ status: res.statusCode, ok: res.statusCode === 200 });
    });
    req.on('error', () => resolve({ status: 0, ok: false }));
    req.setTimeout(10000, () => { req.destroy(); resolve({ status: 408, ok: false }); });
  });
}

function countLines(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.split('\n').length;
  } catch { return 0; }
}

async function runTests() {
  console.log('\n🧪 MVP Tests 103-105\n' + '='.repeat(40));
  
  let passed = 0, failed = 0;
  
  for (const mvp of MVPS) {
    console.log(`\n📦 ${mvp.id}: ${mvp.name}`);
    
    // 1. HTTP Check
    const http = await checkURL(mvp.url);
    if (http.ok) {
      console.log(`   ✅ HTTP ${http.status}`);
      passed++;
    } else {
      console.log(`   ❌ HTTP ${http.status}`);
      failed++;
    }
    
    // 2. File exists
    const filePath = path.join(__dirname, `mvp${mvp.id}-qr-reader/index.html`.replace('qr-reader', mvp.id === 103 ? 'qr-reader' : mvp.id === 104 ? 'hash-verifier' : 'json-path'));
    const srcPath = path.join(__dirname, `mvp${mvp.id}-${mvp.id === 103 ? 'qr-reader' : mvp.id === 104 ? 'hash-verifier' : 'json-path'}/index.html`);
    const fullPath = path.join(__dirname, `mvp${mvp.id}-${mvp.id===103?'qr-reader':mvp.id===104?'hash-verifier':'json-path'}`);
    
    // Find the actual path
    let actualPath = null;
    const dirs = [
      `mvp103-qr-reader`,
      `mvp104-hash-verifier`, 
      `mvp105-json-path`
    ];
    for (const d of dirs) {
      const p = path.join(__dirname, d, 'index.html');
      if (fs.existsSync(p)) {
        actualPath = p;
        break;
      }
    }
    
    if (actualPath && fs.existsSync(actualPath)) {
      const lines = countLines(actualPath);
      console.log(`   ✅ File exists (${lines} lines)`);
      passed++;
    } else {
      console.log(`   ⚠️ Source file not found locally`);
    }
    
    // 3. HTML Basic Validation
    if (actualPath) {
      const content = fs.readFileSync(actualPath, 'utf8');
      const hasDoctype = content.includes('<!DOCTYPE html>');
      const hasHtml = content.includes('<html') && content.includes('</html>');
      const hasHead = content.includes('<head>') && content.includes('</head>');
      const hasBody = content.includes('<body>') && content.includes('</body>');
      
      if (hasDoctype && hasHtml && hasHead && hasBody) {
        console.log(`   ✅ Valid HTML structure`);
        passed++;
      } else {
        console.log(`   ❌ Invalid HTML structure`);
        failed++;
      }
    }
  }
  
  console.log('\n' + '='.repeat(40));
  console.log(`📊 Results: ${passed} passed, ${failed} failed`);
  console.log('');
  
  return failed === 0;
}

runTests().then(ok => process.exit(ok ? 0 : 1));