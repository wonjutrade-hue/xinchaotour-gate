import { Product } from '../types';

export const SIMPLE_PAGE_PRODUCTS_KEY = 'xinchao_simple_page_products_override';
export const SIMPLE_PAGE_CUSTOMIZED_FLAG = 'xinchao_simple_page_is_customized';

export interface SimplePageProductState {
  isCustomized: boolean;
  products: Product[];
}

/**
 * Loads the Simple Page product list.
 * If user has made customizations in Simple Page mode, returns those overridden products.
 * Otherwise returns the main page master products as default.
 */
export function getSimplePageProducts(mainProducts: Product[]): Product[] {
  try {
    const isCustomized = localStorage.getItem(SIMPLE_PAGE_CUSTOMIZED_FLAG) === 'true';
    if (!isCustomized) {
      return mainProducts;
    }

    const raw = localStorage.getItem(SIMPLE_PAGE_PRODUCTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading simple page products:', e);
  }
  return mainProducts;
}

/**
 * Checks if the Simple Page currently has independent customizations.
 */
export function isSimplePageCustomized(): boolean {
  try {
    return localStorage.getItem(SIMPLE_PAGE_CUSTOMIZED_FLAG) === 'true';
  } catch (e) {
    return false;
  }
}

/**
 * Saves changes specifically to the Simple Page without affecting the Main Page products.
 * This guarantees the user's rule:
 * "심플페이지에서 추가,삭제,변경시에는 메인페이지에는 영향을 주지 않게 만들어 줘."
 */
export function saveSimplePageProducts(updatedProducts: Product[]): void {
  try {
    localStorage.setItem(SIMPLE_PAGE_CUSTOMIZED_FLAG, 'true');
    localStorage.setItem(SIMPLE_PAGE_PRODUCTS_KEY, JSON.stringify(updatedProducts));
    
    // Broadcast change only for simple page tabs if needed
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('xinchao_simple_product_sync');
      channel.postMessage({ type: 'SIMPLE_PRODUCTS_UPDATED', timestamp: Date.now() });
      channel.close();
    }
  } catch (e) {
    console.error('Failed to save simple page products:', e);
  }
}

/**
 * Resets the Simple Page to automatically sync with the Main Page again.
 */
export function resetSimplePageToMainSync(): void {
  try {
    localStorage.removeItem(SIMPLE_PAGE_CUSTOMIZED_FLAG);
    localStorage.removeItem(SIMPLE_PAGE_PRODUCTS_KEY);

    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('xinchao_simple_product_sync');
      channel.postMessage({ type: 'SIMPLE_PRODUCTS_RESET', timestamp: Date.now() });
      channel.close();
    }
  } catch (e) {
    console.error('Failed to reset simple page sync:', e);
  }
}
