import { Product, ConsultationRequest } from '../types';

const DB_NAME = 'XinChaoTourDB_v2';
const DB_VERSION = 1;
const STORE_PRODUCTS = 'products';
const STORE_INQUIRIES = 'inquiries';
const STORE_META = 'metadata';

let dbInstance: IDBDatabase | null = null;

function openDatabase(): Promise<IDBDatabase> {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB is not supported in this environment'));
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_PRODUCTS)) {
        db.createObjectStore(STORE_PRODUCTS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_INQUIRIES)) {
        db.createObjectStore(STORE_INQUIRIES, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META, { keyPath: 'key' });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = (event.target as IDBOpenDBRequest).result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error('IndexedDB open error:', event);
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

/**
 * Save all products to IndexedDB permanently
 */
export async function saveProductsToIndexedDB(products: Product[]): Promise<void> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_PRODUCTS, STORE_META], 'readwrite');
      const store = tx.objectStore(STORE_PRODUCTS);
      const metaStore = tx.objectStore(STORE_META);

      // Clear old entries and insert new list
      store.clear();
      for (const prod of products) {
        store.put(prod);
      }

      metaStore.put({
        key: 'products_last_saved',
        timestamp: Date.now(),
        count: products.length
      });

      tx.oncomplete = () => resolve();
      tx.onerror = (e) => reject((e.target as any).error);
    });
  } catch (err) {
    console.warn('[IndexedDB] Failed to save products:', err);
  }
}

/**
 * Load all products from IndexedDB
 */
export async function loadProductsFromIndexedDB(): Promise<Product[]> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_PRODUCTS], 'readonly');
      const store = tx.objectStore(STORE_PRODUCTS);
      const request = store.getAll();

      request.onsuccess = () => {
        const result = request.result || [];
        resolve(result as Product[]);
      };
      request.onerror = (e) => reject((e.target as any).error);
    });
  } catch (err) {
    console.warn('[IndexedDB] Failed to load products:', err);
    return [];
  }
}

/**
 * Save inquiries to IndexedDB
 */
export async function saveInquiriesToIndexedDB(inquiries: ConsultationRequest[]): Promise<void> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_INQUIRIES], 'readwrite');
      const store = tx.objectStore(STORE_INQUIRIES);
      store.clear();
      for (const inq of inquiries) {
        store.put(inq);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = (e) => reject((e.target as any).error);
    });
  } catch (err) {
    console.warn('[IndexedDB] Failed to save inquiries:', err);
  }
}

/**
 * Load inquiries from IndexedDB
 */
export async function loadInquiriesFromIndexedDB(): Promise<ConsultationRequest[]> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_INQUIRIES], 'readonly');
      const store = tx.objectStore(STORE_INQUIRIES);
      const request = store.getAll();
      request.onsuccess = () => {
        resolve((request.result || []) as ConsultationRequest[]);
      };
      request.onerror = (e) => reject((e.target as any).error);
    });
  } catch (err) {
    console.warn('[IndexedDB] Failed to load inquiries:', err);
    return [];
  }
}
