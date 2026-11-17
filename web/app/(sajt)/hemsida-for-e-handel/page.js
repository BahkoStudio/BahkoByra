import NischSida from '../../komponenter/NischSida';
import { NISCHER } from '../../nischer';

const nisch = NISCHER.find((n) => n.slug === 'hemsida-for-e-handel');

export const metadata = {
  // Ort i titeln (SEO-disken 2026-11-04). Kortad under 65 tecken inkl. suffix (2026-11-17).
  // nisch.title används också i footern, därför sätts sidtiteln här.
  title: 'Hemsida för e-handel med en produkt i Jönköping',
  description: nisch.beskrivning,
  alternates: { canonical: `/${nisch.slug}/` },
};

export default function EHandel() {
  return <NischSida nisch={nisch} />;
}
