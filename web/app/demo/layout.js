/**
 * Alla kunddemos hålls utanför sökmotorerna. De är säljmaterial riktat till en
 * enda mottagare, inte publika sidor.
 *
 * Meta-noindex, inte robots.txt: en Disallow-regel hindrar crawlern från att
 * ens läsa taggen, och då kan URL:en indexeras ändå — utan innehåll.
 */
export const metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function DemoLayout({ children }) {
  return children;
}
