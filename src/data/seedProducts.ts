import { Product } from '../types';
import { TRAVEL_PACKAGES } from './travelPackages';
import { VILLAS_DATA } from './villas';
import { GOLF_TOURS_DATA } from './golfTours';

export const INITIAL_PRODUCTS: Product[] = [
  ...TRAVEL_PACKAGES,
  ...VILLAS_DATA,
  ...GOLF_TOURS_DATA
];

export const SAMPLE_PRODUCTS: Product[] = INITIAL_PRODUCTS;
