import { Product } from '../types';
import { COMPREHENSIVE_CATALOG } from './seedCatalog';
import { COMPREHENSIVE_CATALOG_PART2 } from './seedCatalogPart2';
import { COMPREHENSIVE_CATALOG_PART3 } from './seedCatalogPart3';

export const ALL_COMPREHENSIVE_PRODUCTS: Product[] = [
  ...COMPREHENSIVE_CATALOG,
  ...COMPREHENSIVE_CATALOG_PART2,
  ...COMPREHENSIVE_CATALOG_PART3
];

export const INITIAL_PRODUCTS: Product[] = ALL_COMPREHENSIVE_PRODUCTS;
export const SAMPLE_PRODUCTS: Product[] = ALL_COMPREHENSIVE_PRODUCTS;

