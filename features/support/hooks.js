const { BeforeAll, AfterAll, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

setDefaultTimeout(30 * 1000);

let browser;
let viteServer;

BeforeAll(async () => {
  // Importar Vite dinámicamente (ESM) para usarlo desde CommonJS
  const vite = await import('vite');
  // Start Vite programmatically to avoid Windows spawn issues
  viteServer = await vite.createServer({
    root: process.cwd(),
    server: { port: 5173, strictPort: true },
    logLevel: 'error'
  });
  await viteServer.listen();
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
  if (viteServer) {
    await viteServer.close();
  }
});
