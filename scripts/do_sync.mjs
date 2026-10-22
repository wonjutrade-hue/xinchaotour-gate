import fs from 'fs';
import { UPDATED_KOREAN_FLIGHT_PHUQUOC_TOURS } from './update_phuquoc_korean_flights.mjs';

const files = ['stored_products.json', 'src/data/stored_products.json', 'stored_products.backup.json'];
for (const f of files) {
  const list = JSON.parse(fs.readFileSync(f, 'utf8'));
  const map = new Map(list.map((p) => [p.id, p]));
  for (const up of UPDATED_KOREAN_FLIGHT_PHUQUOC_TOURS) {
    map.set(up.id, up);
  }
  const newList = Array.from(map.values());
  fs.writeFileSync(f, JSON.stringify(newList, null, 2), 'utf8');
  console.log('Updated', f, 'with length', newList.length);
}

const seedPath = 'src/data/seedProducts.ts';
const allProds = JSON.parse(fs.readFileSync('stored_products.json', 'utf8'));
const seedContent = `import { Product } from '../types';\n\nexport const ALL_COMPREHENSIVE_PRODUCTS: Product[] = ${JSON.stringify(allProds, null, 2)};\n\nexport const INITIAL_PRODUCTS: Product[] = ALL_COMPREHENSIVE_PRODUCTS;\nexport const SAMPLE_PRODUCTS: Product[] = ALL_COMPREHENSIVE_PRODUCTS;\n`;
fs.writeFileSync(seedPath, seedContent, 'utf8');
console.log('Updated seedProducts.ts with', allProds.length, 'products!');
