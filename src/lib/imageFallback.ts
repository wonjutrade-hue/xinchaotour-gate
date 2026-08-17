/**
 * High quality curated image fallback database for Vietnam travel products
 */
export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  '풀빌라': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
  '골프투어': 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
  '자유여행': 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
  '추천패키지': 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
  '다낭': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
  '나트랑': 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
  '푸꾸옥': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  '하노이': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
  '달랏': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
};

export const DEFAULT_TRAVEL_FALLBACK = 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80';

export function getProductFallbackImage(category?: string, city?: string): string {
  if (category && CATEGORY_FALLBACK_IMAGES[category]) {
    return CATEGORY_FALLBACK_IMAGES[category];
  }
  if (city && CATEGORY_FALLBACK_IMAGES[city]) {
    return CATEGORY_FALLBACK_IMAGES[city];
  }
  return DEFAULT_TRAVEL_FALLBACK;
}

export function getDisplayProductImage(product?: { imageUrl?: string; additionalImages?: string[]; category?: string; city?: string } | null): string {
  if (!product) return DEFAULT_TRAVEL_FALLBACK;
  if (product.imageUrl && product.imageUrl.trim().length > 0 && product.imageUrl !== 'VILLA_PHOTO_DATA') {
    return product.imageUrl;
  }
  if (Array.isArray(product.additionalImages)) {
    const firstValid = product.additionalImages.find(img => img && img.trim().length > 0 && img !== 'VILLA_PHOTO_DATA');
    if (firstValid) return firstValid;
  }
  return getProductFallbackImage(product.category, product.city);
}
