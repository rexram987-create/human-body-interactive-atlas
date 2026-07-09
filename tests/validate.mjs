import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const read = path => readFileSync(join(root, path), 'utf8');
const app = read('js/app.js');
const organPage = read('js/organ-page.js');
const index = read('index.html');
const organ = read('organ.html');

const organKeys = [...app.matchAll(/\borgan\('([^']+)'/g)].map(match => match[1]);
const uniqueKeys = new Set(organKeys);
assert.equal(organKeys.length, 61, 'Expected 61 atlas hotspots');
assert.equal(uniqueKeys.size, organKeys.length, 'Organ keys must be unique');

const systems = [...app.matchAll(/^  ([a-z][a-z-]+): \{$/gm)].map(match => match[1]);
assert.equal(systems.length, 8, 'Expected eight body systems');

const imagePaths = [
  ...app.matchAll(/(?:image|[a-z'-]+): '(images\/[^']+)'/g),
  ...organPage.matchAll(/(?:image|fallbackImage)\s*[=:]\s*'(images\/[^']+)'/g)
].map(match => match[1]);

for (const imagePath of new Set(imagePaths)) {
  assert.ok(existsSync(join(root, imagePath)), `Missing image: ${imagePath}`);
}

assert.match(organPage, /catalogOrgan\(organKey\)/, 'Detail pages must fall back to the canonical atlas catalog');
assert.match(index, /class="medical-disclaimer"/, 'Homepage must include a medical disclaimer');
assert.match(organ, /class="medical-disclaimer"/, 'Organ page must include a medical disclaimer');
assert.ok(existsSync(join(root, 'SOURCES.md')), 'SOURCES.md is required');
assert.ok(existsSync(join(root, 'LICENSE')), 'LICENSE is required');

console.log(`Validated ${systems.length} systems, ${organKeys.length} organs, and ${new Set(imagePaths).size} image references.`);
