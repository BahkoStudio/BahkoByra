#!/usr/bin/env node
/**
 * server.js — Lokal dev-server för Bahko Byrå
 * Kör: node server.js → http://localhost:3001
 * Speglar Vercel: webbroot = bahkobyra/ (precis som i produktion).
 * Öppnar automatiskt i Edge.
 */

import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3001;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.mp4':  'video/mp4',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
};

const server = createServer((req, res) => {
  let urlPath = req.url.split('?')[0];

  // API: serve outreach state
  if (urlPath === '/api/state') {
    const statePath = join(__dirname, '.tmp', 'outreach_state.json');
    if (existsSync(statePath)) {
      const data = readFileSync(statePath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(data);
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('{}');
    }
    return;
  }

  // API: serve LinkedIn profile data
  if (urlPath === '/api/linkedin') {
    const liPath = join(__dirname, '.tmp', 'linkedin_data.json');
    if (existsSync(liPath)) {
      const data = readFileSync(liPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(data);
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('{}');
    }
    return;
  }

  if (urlPath === '/') urlPath = '/index.html';

  // Webbroot = bahkobyra/ (matchar Vercels outputDirectory). Repo-rotens
  // .tmp/ förblir nåbar för lokala rapporter.
  const base = urlPath.startsWith('/.tmp/') ? __dirname : join(__dirname, 'bahkobyra');
  let filePath = join(base, urlPath);

  // Serve index.html for directory requests
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html');
  }

  if (!existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found: ' + urlPath);
    return;
  }

  const ext = extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';

  try {
    const content = readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('500 Server Error');
  }
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log('\n══════════════════════════════════════');
  console.log('  Bahko Byrå — Dev Server');
  console.log('══════════════════════════════════════');
  console.log(`  ${url}`);
  console.log('──────────────────────────────────────');
  console.log(`  Byrå:      ${url}/`);
  console.log(`  Analys:    ${url}/foretag/gratis-granskning.html`);
  console.log(`  Guide:     ${url}/foretag/gratis-guide.html`);
  console.log(`  Demo:      ${url}/cloud/`);
  console.log(`  Dashboard: ${url}/dashboard/`);
  console.log(`  Pitch:     ${url}/pitchdeck.html`);
  console.log('──────────────────────────────────────');
  console.log('  Ctrl+C för att stänga\n');

  // Öppna Edge automatiskt
  exec(`start msedge ${url}`, err => {
    if (err) exec(`start ${url}`);
  });
});
