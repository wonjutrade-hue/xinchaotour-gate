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

export function getDisplayProductImage(product?: { id?: string; imageUrl?: string; additionalImages?: string[]; category?: string; city?: string; title?: string; subTitle?: string } | null): string {
  if (!product) return DEFAULT_TRAVEL_FALLBACK;

  const title = ((product.title || '') + ' ' + (product.subTitle || '')).toLowerCase();
  const id = product.id || '';
  const city = product.city || '';

  // 1. SPECIFIC MISMATCH DEFENSES (Overriding wrong legacy cached photos like clapperboards, pine forests for deserts, or wrong golden bridge)
  if (id === 'prod-saigon-free-01' || title.includes('메콩')) {
    return '/images/mekong_river_boat.jpg';
  }
  if (id === 'prod-hanoi-free-02' || (title.includes('닌빈') || title.includes('짱안'))) {
    return '/images/ninhbinh_trangan.jpg';
  }
  if (id === 'prod-saigon-free-02' || (title.includes('무이네') && (title.includes('사막') || title.includes('샌듄') || title.includes('지프')))) {
    return '/images/muine_sand.jpg';
  }
  if (id === 'prod-nhatrang-free-02' || (title.includes('판랑') && (title.includes('사막') || title.includes('샌듄')))) {
    return '/images/phanrang_desert_jeep.jpg';
  }
  if (id === 'prod-danang-free-01') {
    // 다낭 1일 렌터카 & 시내 투어 -> 다낭 용다리 시내 사진 (골든브릿지 중복 해소)
    return '/images/danang_city_dragon.jpg';
  }
  if (id === 'prod-danang-free-02' || (title.includes('호이안') && (title.includes('소원배') || title.includes('야경')))) {
    return '/images/hoian_lantern.jpg';
  }
  if (id === 'prod-dalat-free-01' || (title.includes('달랏') && title.includes('인생샷'))) {
    return '/images/dalat_flower_garden.jpg';
  }
  if (id === 'prod-sapa-free-01' || (title.includes('판시판') && title.includes('케이블카'))) {
    return '/images/sapa_fansipan.jpg';
  }
  if (id === 'prod-hanoi-free-01' || (title.includes('하롱베이') && title.includes('크루즈'))) {
    return '/images/halong_cruise.jpg';
  }
  if (id === 'prod-free-danang-hoian-hue-4n6d' || title.includes('후에')) {
    return '/images/hue_imperial_citadel.jpg';
  }

  // 2. Normal imageUrl resolution if clean
  if (product.imageUrl && product.imageUrl.trim().length > 0 && 
      product.imageUrl !== 'VILLA_PHOTO_DATA' && 
      product.imageUrl !== 'TEST_IMG' && 
      !product.imageUrl.includes('photo_1787849366639') &&
      !product.imageUrl.includes('1598899134739-24c46f58b8c0')) { // reject clapperboard
    return product.imageUrl;
  }
  if (Array.isArray(product.additionalImages)) {
    const firstValid = product.additionalImages.find(img => img && img.trim().length > 0 && img !== 'VILLA_PHOTO_DATA' && img !== 'TEST_IMG' && !img.includes('1598899134739-24c46f58b8c0'));
    if (firstValid) return firstValid;
  }
  return getProductFallbackImage(product.category, product.city);
}
