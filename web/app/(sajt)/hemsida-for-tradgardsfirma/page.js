import NischSida from '../../komponenter/NischSida';
import { NISCHER } from '../../nischer';

const nisch = NISCHER.find((n) => n.slug === 'hemsida-for-tradgardsfirma');

export const metadata = {
  // Ort i titeln (SEO-disken 2026-11-04). Kortad under 65 tecken inkl. suffix (2026-11-17).
  // nisch.title används också i footern, därför sätts sidtiteln här.
  title: 'Hemsida för trädgårdsfirma i Jönköping',
  description: nisch.beskrivning,
  alternates: { canonical: `/${nisch.slug}/` },
};

export default function Tradgardsfirma() {
  return <NischSida nisch={nisch} />;
}
