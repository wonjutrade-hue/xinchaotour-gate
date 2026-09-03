/**
 * Clean image helper - No external demo/sample photos
 */
export const DEFAULT_TRAVEL_FALLBACK = "/images/danang_golden_bridge.jpg";

export function getProductFallbackImage(category?: string, city?: string): string {
  if (city) {
    if (city.includes('나트랑')) return '/images/nhatrang_bay.jpg';
    if (city.includes('달랏')) return '/images/dalat.jpg';
    if (city.includes('다낭')) return '/images/danang_golden_bridge.jpg';
    if (city.includes('호이안')) return '/images/hoian_lantern.jpg';
    if (city.includes('푸꾸옥')) return '/images/phuquoc_sunset.jpg';
    if (city.includes('사파')) return '/images/sapa_fansipan.jpg';
    if (city.includes('하노이') || city.includes('하롱')) return '/images/halong_cruise.jpg';
    if (city.includes('닌빈')) return '/images/ninhbinh_trangan.jpg';
    if (city.includes('무이네')) return '/images/muine_sand.jpg';
    if (city.includes('호치민')) return '/images/vietnam_city_villa.jpg';
  }
  if (category === '골프투어') return '/images/vietnam_golf_resort.jpg';
  if (category === '풀빌라') return '/images/vietnam_beach_villa.jpg';
  return '/images/danang_golden_bridge.jpg';
}

export function getDisplayProductImage(product?: { imageUrl?: string; additionalImages?: string[]; category?: string; city?: string; title?: string } | null): string {
  if (!product) return DEFAULT_TRAVEL_FALLBACK;
  if (product.imageUrl && product.imageUrl.trim().length > 0 && product.imageUrl !== 'VILLA_PHOTO_DATA' && product.imageUrl !== 'TEST_IMG' && !product.imageUrl.includes('photo_1787849366639')) {
    return product.imageUrl;
  }
  if (Array.isArray(product.additionalImages)) {
    const firstValid = product.additionalImages.find(img => img && img.trim().length > 0 && img !== 'VILLA_PHOTO_DATA' && img !== 'TEST_IMG');
    if (firstValid) return firstValid;
  }
  return getProductFallbackImage(product.category, product.city);
}
