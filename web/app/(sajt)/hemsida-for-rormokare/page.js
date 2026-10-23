import NischSida from '../../komponenter/NischSida';
import { NISCHER } from '../../nischer';

const nisch = NISCHER.find((n) => n.slug === 'hemsida-for-rormokare');

export const metadata = {
  title: nisch.title,
  description: nisch.beskrivning,
  alternates: { canonical: `/${nisch.slug}/` },
};

export default function Rormokare() {
  return <NischSida nisch={nisch} />;
}
