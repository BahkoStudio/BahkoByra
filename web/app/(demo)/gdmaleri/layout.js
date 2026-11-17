import './gdmaleri-lcp.css';

/* Hero-texten ska synas direkt (SEO-audit 2026-11-17, LCP 4,2 s).
   CSS:en ligger här och inte i _mall/, så bara GD Måleri påverkas. */
export default function GdMaleriLayout({ children }) {
  return children;
}
