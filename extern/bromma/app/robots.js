// Indexering på (Mathias "Byt domän" 2026-11-09). Sidorna har self-canonical (kopiera.mjs).
// AI- och svarsmotorer tillåts uttryckligen, som på den gamla sajten.
const BOTAR = ['Google-Extended', 'Applebot-Extended', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot'];
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }, ...BOTAR.map((userAgent) => ({ userAgent, allow: '/' }))],
    sitemap: 'https://brommatradgardsservice.se/sitemap.xml',
    host: 'https://brommatradgardsservice.se',
  };
}
