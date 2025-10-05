const { BeforeAll, AfterAll, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const http = require('http');

setDefaultTimeout(30 * 1000);

let browser;
let devServer;

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      const req = http.get(url, () => resolve(true));
      req.on('error', () => {
        if (Date.now() - start > timeoutMs) return reject(new Error('Dev server not reachable'));
        setTimeout(tryOnce, 500);
      });
      req.end();
    };
    tryOnce();
  });
}

BeforeAll(async () => {
  // Start Vite dev server if not running
  devServer = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'dev'], {
    stdio: 'ignore',
    shell: false,
  });
  // Wait until server is up
  await waitForServer('http://localhost:5173');
  browser = await chromium.launch({ headless: true });
});

Before(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.context) {
    await this.context.close();
  }
});

AfterAll(async () => {
  if (browser) {
    await browser.close();
  }
  if (devServer && !devServer.killed) {
    devServer.kill('SIGTERM');
  }
});
