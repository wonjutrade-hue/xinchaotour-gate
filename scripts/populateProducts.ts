import fs from 'fs';
import path from 'path';
import { ALL_COMPREHENSIVE_PRODUCTS } from '../src/data/seedProducts';

const productsJson = JSON.stringify(ALL_COMPREHENSIVE_PRODUCTS, null, 2);

const rootPath = path.join(process.cwd(), 'stored_products.json');
const backupPath = path.join(process.cwd(), 'stored_products.backup.json');
const srcDataDir = path.join(process.cwd(), 'src', 'data');
const srcDataPath = path.join(srcDataDir, 'stored_products.json');

if (!fs.existsSync(srcDataDir)) {
  fs.mkdirSync(srcDataDir, { recursive: true });
}

fs.writeFileSync(rootPath, productsJson, 'utf-8');
fs.writeFileSync(backupPath, productsJson, 'utf-8');
fs.writeFileSync(srcDataPath, productsJson, 'utf-8');

console.log(`[Populate] Successfully populated ${ALL_COMPREHENSIVE_PRODUCTS.length} products to stored_products.json!`);
