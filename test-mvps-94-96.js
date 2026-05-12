// Integration tests for MVPs 94-96 using Playwright
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const mvpFolders = ['mvp94-jwt-decoder', 'mvp95-sql-formatter', 'mvp96-json-to-ts'];

function startServer(folder) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(__dirname, folder, req.url === '/' ? 'index.html' : req.url);
      const ext = path.extname(filePath);
      const contentTypes = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' };
      
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not found');
        } else {
          res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
          res.end(data);
        }
      });
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function runTests() {
  const browser = await chromium.launch();
  let results = [];

  for (const folder of mvpFolders) {
    const server = await startServer(folder);
    const page = await browser.newPage();
    let passed = 0;

    try {
      await page.goto(`http://localhost:${PORT}`);
      const title = await page.title();
      console.log(`[${folder}] Title: ${title}`);
      passed++;
    } catch (e) {
      console.log(`[${folder}] FAIL: ${e.message}`);
    }

    try {
      // Check form/textarea exists
      const hasInput = await page.locator('input, textarea').count() > 0;
      if (hasInput) passed++;
    } catch (e) {}

    await page.close();
    server.close();
    results.push(`${folder}: ${passed}/2`);
  }

  await browser.close();
  console.log('\n--- Results ---');
  results.forEach(r => console.log(r));
}

runTests().catch(console.error);