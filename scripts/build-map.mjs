// Builds src/data/india-map.json: a dissolved India outline plus the states where the
// foundation is active, projected and simplified for a ~600px wide illustration.
// Source: datameet (https://github.com/datameet/maps), official India boundaries.
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import mapshaper from 'mapshaper';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'assets-src/maps/states.geojson');
const out = path.join(root, 'src/data/india-map.json');

// Dataset name → name as written in the content.
const ACTIVE = {
  Chhattisgarh: 'Chhattisgarh',
  Tripura: 'Tripura',
  Maharashtra: 'Maharashtra',
  'Andhra Pradesh': 'Andhra Pradesh',
  Rajasthan: 'Rajasthan',
  Gujarat: 'Gujarat',
  'NCT of Delhi': 'Delhi',
};

if (!existsSync(src)) {
  const res = await fetch('https://raw.githubusercontent.com/datameet/maps/master/website/docs/data/geojson/states.geojson');
  await fs.mkdir(path.dirname(src), { recursive: true });
  await fs.writeFile(src, Buffer.from(await res.arrayBuffer()));
}

const active = JSON.stringify(Object.keys(ACTIVE));
const cmd = [
  '-i states.geojson name=states',
  '-proj +proj=lcc +lat_1=12.5 +lat_2=32 +lat_0=22 +lon_0=82 +datum=WGS84',
  '-simplify 0.9% keep-shapes',
  '-dissolve + name=country',
  `-filter '${active}.indexOf(ST_NM) > -1' target=states`,
  '-points inner + name=dots target=states',
  '-style r=3 target=dots',
  '-o india.svg format=svg target=country,states,dots id-field=ST_NM width=600 margin=4 precision=0.1',
].join(' ');

const output = await mapshaper.applyCommands(cmd, { 'states.geojson': await fs.readFile(src, 'utf8') });
const svg = output['india.svg'].toString();

const viewBox = svg.match(/viewBox="([^"]+)"/)[1];
const group = (id) => svg.match(new RegExp(`<g id="${id}"[^>]*>([\\s\\S]*?)</g>`))[1];
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (id, name) => [...group(id).matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map((m) => attrs(m[0]));
const country = tags('country', 'path').map((t) => t.d).join(' ');
const states = tags('states', 'path').map((t) => ({ name: ACTIVE[t.id], d: t.d }));
const dots = tags('dots', 'circle').map((t) => ({ name: ACTIVE[t.id], x: Number(t.cx), y: Number(t.cy) }));

await fs.writeFile(out, `${JSON.stringify({ viewBox, country, states, dots })}\n`);
console.log(`india-map.json: ${states.length} states, ${dots.length} dots, ${(JSON.stringify({ country, states }).length / 1024).toFixed(1)} KB`);
