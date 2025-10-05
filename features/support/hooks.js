// @ts-nocheck
const { BeforeAll, AfterAll, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

setDefaultTimeout(60 * 1000);

let browser;
let staticServer;

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.js': return 'text/javascript; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.svg': return 'image/svg+xml';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    default: return 'text/plain; charset=utf-8';
  }
}

async function isServerUp(url) {
  return new Promise((resolve) => {
    const req = http.get(url, () => resolve(true));
    req.on('error', () => resolve(false));
    req.end();
  });
}

BeforeAll(async () => {
  // Simple static server to serve project root on port 5173
  const rootDir = process.cwd();
  staticServer = http.createServer((req, res) => {
    try {
      let reqPath = decodeURIComponent(req.url || '/');
      if (reqPath === '/' || reqPath === '/index' || reqPath === '/index.html') {
        reqPath = '/index.html';
      }
      // Prevent directory traversal
      const resolved = path.join(rootDir, reqPath);
      if (!resolved.startsWith(rootDir)) {
        res.statusCode = 403; res.end('Forbidden'); return;
      }
      let filePath = resolved;
      if (!fs.existsSync(filePath)) {
        // try under src for SPA pages
        const alt = path.join(rootDir, 'src', reqPath);
        if (fs.existsSync(alt)) filePath = alt;
      }
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
      if (!fs.existsSync(filePath)) {
        res.statusCode = 404; res.end('Not found'); return;
      }
      res.setHeader('Content-Type', contentTypeFor(filePath));
      fs.createReadStream(filePath).pipe(res);
    } catch (e) {
      res.statusCode = 500; res.end('Server error');
    }
  });
  // If another instance is already serving, skip listen
  serverAlreadyRunning = await isServerUp('http://localhost:5173');
  if (!serverAlreadyRunning) {
    await new Promise((resolve) => {
      staticServer.listen(5173, () => resolve());
    });
  }
  browser = await chromium.launch({ headless: true });
});

Before(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.context) {
    try {
      await this.context.close();
    } catch (e) {
      // swallow close errors to avoid failing After hook
    }
  }
});

AfterAll(async () => {
  if (browser) {
    await browser.close();
  }
  if (staticServer && !serverAlreadyRunning) {
    await new Promise((resolve) => staticServer.close(() => resolve()));
  }
});
