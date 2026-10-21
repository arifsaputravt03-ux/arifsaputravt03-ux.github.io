const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.pdf': 'application/pdf',
  '.svg': 'image/svg+xml'
};

http.createServer((req, res) => {
  const cleanUrl = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(__dirname, cleanUrl === '/' ? 'index.html' : cleanUrl);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      let ext = path.extname(filePath);
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'text/plain',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(data);
    }
  });
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
