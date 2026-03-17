#!/usr/bin/env node
/**
 * export_to_google_docs.js — Bahko Byrå
 *
 * Exporterar rapport-innehåll från .tmp/rapport_content.json till Google Docs eller Sheets.
 *
 * Krav:
 *   credentials.json (OAuth2 Desktop app) i projektroten
 *   Aktiverade APIs: Google Docs API, Google Sheets API, Google Drive API
 *
 * Usage:
 *   node tools/export_to_google_docs.js --type=docs --title="Konkurrensanalys mars 2026"
 *   node tools/export_to_google_docs.js --type=sheets --title="Lead-profiler mars 2026"
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CREDENTIALS_FILE = join(ROOT, "credentials.json");
const TOKEN_FILE = join(ROOT, "token.json");
const CONTENT_FILE = join(ROOT, ".tmp", "rapport_content.json");

// ── Args ──────────────────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith("--"))
    .map(a => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; })
);

const TYPE = args.type || "docs";   // "docs" | "sheets"
const TITLE = args.title || `Rapport ${new Date().toISOString().slice(0,10)}`;

// ── Check prerequisites ───────────────────────────────────────────────────────
if (!existsSync(CREDENTIALS_FILE)) {
  console.error(`
❌ credentials.json saknas!

Gör så här:
1. Gå till https://console.cloud.google.com
2. Skapa ett nytt projekt (eller välj befintligt)
3. Aktivera: Google Docs API, Google Sheets API, Google Drive API
4. Gå till "APIs & Services" → "Credentials"
5. Klicka "Create Credentials" → "OAuth client ID" → välj "Desktop app"
6. Ladda ner JSON-filen och döp om den till credentials.json
7. Lägg filen i projektets root: ${ROOT}
8. Kör scriptet igen
`);
  process.exit(1);
}

if (!existsSync(CONTENT_FILE)) {
  console.error(`❌ ${CONTENT_FILE} saknas. Kör research-steget först.`);
  process.exit(1);
}

// ── Load googleapis dynamically ───────────────────────────────────────────────
let google;
try {
  const mod = await import("googleapis");
  google = mod.google;
} catch {
  console.error(`
❌ googleapis inte installerat. Kör:
   npm install googleapis
`);
  process.exit(1);
}

const credentials = JSON.parse(readFileSync(CREDENTIALS_FILE, "utf-8"));
const { client_id, client_secret, redirect_uris } = credentials.installed || credentials.web;
const REDIRECT_URI = "http://localhost:3456/oauth2callback";

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, REDIRECT_URI);

// ── Token handling ────────────────────────────────────────────────────────────
async function getToken() {
  if (existsSync(TOKEN_FILE)) {
    const token = JSON.parse(readFileSync(TOKEN_FILE, "utf-8"));
    oAuth2Client.setCredentials(token);

    // Refresh if expired
    if (token.expiry_date && token.expiry_date < Date.now()) {
      const { credentials } = await oAuth2Client.refreshAccessToken();
      writeFileSync(TOKEN_FILE, JSON.stringify(credentials));
      oAuth2Client.setCredentials(credentials);
    }
    return;
  }

  // First-time OAuth flow
  const scopes = [
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
  ];

  const authUrl = oAuth2Client.generateAuthUrl({ access_type: "offline", scope: scopes });
  console.log("\n🔐 Öppnar browser för Google-autentisering...");
  console.log("Om browsern inte öppnas automatiskt, gå till:\n", authUrl);

  // Open browser
  const { exec } = await import("child_process");
  exec(`start "${authUrl}"`, () => {});

  // Start local server to catch callback
  const code = await new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      if (req.url?.startsWith("/oauth2callback")) {
        const url = new URL(req.url, "http://localhost:3456");
        const code = url.searchParams.get("code");
        res.end("<h1>✅ Klar! Du kan stänga detta fönster.</h1>");
        server.close();
        if (code) resolve(code); else reject(new Error("No code in callback"));
      }
    }).listen(3456);
    setTimeout(() => { server.close(); reject(new Error("OAuth timeout")); }, 120_000);
  });

  const { tokens } = await oAuth2Client.getToken(code);
  writeFileSync(TOKEN_FILE, JSON.stringify(tokens));
  oAuth2Client.setCredentials(tokens);
  console.log("✅ Autentiserad! token.json sparad.\n");
}

// ── Export to Google Docs ─────────────────────────────────────────────────────
async function exportToDocs(content) {
  const docs = google.docs({ version: "v1", auth: oAuth2Client });
  const drive = google.drive({ version: "v3", auth: oAuth2Client });

  // Create document
  const doc = await docs.documents.create({ requestBody: { title: TITLE } });
  const docId = doc.data.documentId;

  // Build requests to insert content
  const text = content.markdown || content.text || JSON.stringify(content, null, 2);
  const requests = [
    {
      insertText: {
        location: { index: 1 },
        text: text,
      },
    },
  ];

  await docs.documents.batchUpdate({
    documentId: docId,
    requestBody: { requests },
  });

  const url = `https://docs.google.com/document/d/${docId}/edit`;
  console.log(`\n✅ Google Docs skapat: ${TITLE}`);
  console.log(`📄 Länk: ${url}\n`);

  // Open in browser
  const { exec } = await import("child_process");
  exec(`start "${url}"`, () => {});

  return url;
}

// ── Export to Google Sheets ───────────────────────────────────────────────────
async function exportToSheets(content) {
  const sheets = google.sheets({ version: "v4", auth: oAuth2Client });

  const rows = content.rows || [];
  const headers = content.headers || Object.keys(rows[0] || {});

  const values = [
    headers,
    ...rows.map(r => headers.map(h => r[h] ?? "")),
  ];

  const sheet = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title: TITLE },
      sheets: [{ properties: { title: "Rapport" } }],
    },
  });

  const sheetId = sheet.data.spreadsheetId;

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: "Rapport!A1",
    valueInputOption: "RAW",
    requestBody: { values },
  });

  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
  console.log(`\n✅ Google Sheets skapat: ${TITLE}`);
  console.log(`📊 Länk: ${url}\n`);

  const { exec } = await import("child_process");
  exec(`start "${url}"`, () => {});

  return url;
}

// ── Main ──────────────────────────────────────────────────────────────────────
try {
  await getToken();

  const content = JSON.parse(readFileSync(CONTENT_FILE, "utf-8"));

  if (TYPE === "sheets") {
    await exportToSheets(content);
  } else {
    await exportToDocs(content);
  }
} catch (err) {
  console.error("❌ Export misslyckades:", err.message);
  if (err.message.includes("invalid_grant")) {
    console.error("Token ogiltig. Ta bort token.json och kör igen.");
  }
  process.exit(1);
}
