import NischSida from '../../komponenter/NischSida';
import { NISCHER } from '../../nischer';

const nisch = NISCHER.find((n) => n.slug === 'hemsida-for-malerifirma');

export const metadata = {
  // Ort i titeln (SEO-disken 2026-11-04). nisch.title används också i footern, därför här.
  title: `${nisch.title} i Jönköping och hela Sverige`,
  description: nisch.beskrivning,
  alternates: { canonical: `/${nisch.slug}/` },
};

export default function Malerifirma() {
  return <NischSida nisch={nisch} />;
}
