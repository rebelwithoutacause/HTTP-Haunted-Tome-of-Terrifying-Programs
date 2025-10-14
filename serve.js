import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3001;

const server = http.createServer((req, res) => {
  // Serve index.html for all requests
  const filePath = path.join(process.cwd(), 'index.html');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`🎃 Frontend server running on http://localhost:${PORT}`);
  console.log(`🧙‍♀️ Backend API running on http://localhost:5000`);
  console.log(`✨ Open your browser to http://localhost:${PORT}`);
});