import NischSida from '../../komponenter/NischSida';
import { NISCHER } from '../../nischer';

const nisch = NISCHER.find((n) => n.slug === 'hemsida-for-snickare');

export const metadata = {
  title: nisch.title,
  description: nisch.beskrivning,
  alternates: { canonical: `/${nisch.slug}/` },
};

export default function Snickare() {
  return <NischSida nisch={nisch} />;
}
