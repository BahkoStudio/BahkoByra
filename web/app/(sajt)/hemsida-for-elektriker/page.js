import NischSida from '../../komponenter/NischSida';
import { NISCHER } from '../../nischer';

const nisch = NISCHER.find((n) => n.slug === 'hemsida-for-elektriker');

export const metadata = {
  title: nisch.title,
  description: nisch.beskrivning,
  alternates: { canonical: `/${nisch.slug}/` },
};

export default function Elektriker() {
  return <NischSida nisch={nisch} />;
}
