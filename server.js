// Simple static server for local development
// Usage: node server.js [port]
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT || process.argv[2], 10) || 5173;
const ROOT = process.cwd();

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

const server = http.createServer((req, res) => {
  try {
    let reqPath = decodeURIComponent(req.url || '/');
    if (reqPath === '/' || reqPath === '/index' || reqPath === '/index.html') {
      reqPath = '/index.html';
    }
    // Prevent directory traversal
    const resolved = path.join(ROOT, reqPath);
    if (!resolved.startsWith(ROOT)) {
      res.statusCode = 403; res.end('Forbidden'); return;
    }
    let filePath = resolved;
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (!fs.existsSync(filePath)) {
      // Try under src/ as a fallback (for demo pages)
      const alt = path.join(ROOT, 'src', reqPath);
      if (fs.existsSync(alt)) filePath = alt;
    }
    if (!fs.existsSync(filePath)) {
      // Try under src/pages for multipage HTML
      const clean = reqPath.startsWith('/') ? reqPath.slice(1) : reqPath;
      let alt2 = path.join(ROOT, 'src', 'pages', clean);
      if (fs.existsSync(alt2)) filePath = alt2;
      // Legacy auth routes mapping
      if (!fs.existsSync(filePath)) {
        const authMap = {
          '/login.html': path.join(ROOT, 'src', 'pages', 'users', 'login.html'),
          '/registro.html': path.join(ROOT, 'src', 'pages', 'users', 'registro.html'),
          '/recuperar.html': path.join(ROOT, 'src', 'pages', 'users', 'recuperar.html'),
        };
        if (authMap[reqPath] && fs.existsSync(authMap[reqPath])) {
          filePath = authMap[reqPath];
        }
      }
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

server.listen(PORT, () => {
  console.log(`Static server running at http://localhost:${PORT}`);
});
