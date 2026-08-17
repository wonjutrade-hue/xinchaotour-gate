/**
 * Clean image helper - No external demo/sample photos
 */
export const DEFAULT_TRAVEL_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500' width='800' height='500'%3E%3Crect width='800' height='500' fill='%230f172a'/%3E%3Cg fill='%2310b981' opacity='0.8' transform='translate(350,180)'%3E%3Cpath d='M50 0 C60 20 80 30 100 35 C75 45 60 65 50 90 C40 65 25 45 0 35 C20 30 40 20 50 0 Z'/%3E%3C/g%3E%3Ctext x='50%25' y='320' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-family='sans-serif' font-size='22' font-weight='bold'%3EXinChao Tour%3C/text%3E%3Ctext x='50%25' y='355' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-size='16'%3E%EB%93%B1%EB%A1%9D%EB%90%9C %EC%82%AC%EC%A7%84%EC%9D%B4 %EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4%3C/text%3E%3C/svg%3E";

export function getProductFallbackImage(category?: string, city?: string): string {
  return DEFAULT_TRAVEL_FALLBACK;
}

export function getDisplayProductImage(product?: { imageUrl?: string; additionalImages?: string[]; category?: string; city?: string } | null): string {
  if (!product) return DEFAULT_TRAVEL_FALLBACK;
  if (product.imageUrl && product.imageUrl.trim().length > 0 && product.imageUrl !== 'VILLA_PHOTO_DATA' && product.imageUrl !== 'TEST_IMG') {
    return product.imageUrl;
  }
  if (Array.isArray(product.additionalImages)) {
    const firstValid = product.additionalImages.find(img => img && img.trim().length > 0 && img !== 'VILLA_PHOTO_DATA' && img !== 'TEST_IMG');
    if (firstValid) return firstValid;
  }
  return DEFAULT_TRAVEL_FALLBACK;
}
