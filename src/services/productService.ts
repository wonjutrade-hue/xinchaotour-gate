import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Product } from '../types';
import { 
  DbProductRow, 
  DbProductImageRow, 
  mapDbProductToProduct, 
  mapProductToDbRow 
} from '../types/database';
import { imageService } from './imageService';
import { INITIAL_PRODUCTS } from '../data/seedProducts';

export interface ProductFilters {
  category?: string;
  region?: string;
  searchQuery?: string;
  status?: 'published' | 'draft' | 'all';
}

export const productService = {
  /**
   * Fetch all products from Supabase (or Server fallback)
   */
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    // 1. Supabase Fetch
    if (isSupabaseConfigured() && supabase) {
      try {
        let query = supabase
          .from('products')
          .select(`
            *,
            product_images (
              id,
              image_url,
              sort_order,
              is_thumbnail
            )
          `)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (filters?.status && filters.status !== 'all') {
          query = query.eq('status', filters.status);
        } else if (!filters?.status) {
          query = query.eq('status', 'published');
        }

        if (filters?.category && filters.category !== '전체') {
          query = query.eq('category', filters.category);
        }

        if (filters?.region && filters.region !== '전체') {
          query = query.eq('region', filters.region);
        }

        const { data, error } = await query;

        if (error) {
          console.warn('[ProductService] Supabase fetch error, falling back to server:', error.message);
          throw error;
        }

        if (data && data.length > 0) {
          return data.map((row: any) => {
            const galleryImages: string[] = (row.product_images || [])
              .sort((a: DbProductImageRow, b: DbProductImageRow) => (a.sort_order || 0) - (b.sort_order || 0))
              .map((img: DbProductImageRow) => img.image_url)
              .filter(Boolean);

            return mapDbProductToProduct(row as DbProductRow, galleryImages);
          });
        } else if ((!data || data.length === 0) && (!filters || Object.keys(filters).length === 0 || (filters.status === 'published' && !filters.category && !filters.region))) {
          // Supabase is configured but database table is empty -> seed initial products into Supabase!
          console.log('[ProductService] Supabase is empty, seeding INITIAL_PRODUCTS...');
          this.syncAllProducts(INITIAL_PRODUCTS).catch(console.warn);
        }
      } catch (supabaseErr) {
        console.warn('[ProductService] Supabase query failed, attempting Server API fallback:', supabaseErr);
      }
    }

    // 2. Server API fallback
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const json = await res.json();
        if (json && Array.isArray(json.products) && json.products.length > 0) {
          let list: Product[] = json.products;
          if (filters?.category && filters.category !== '전체') {
            list = list.filter(p => p.category === filters.category);
          }
          if (filters?.region && filters.region !== '전체') {
            list = list.filter(p => p.region === filters.region);
          }
          return list;
        }
      }
    } catch (serverErr) {
      console.warn('[ProductService] Server products fetch failed, using bundled fallback:', serverErr);
    }

    // 3. Bundled INITIAL_PRODUCTS guaranteed fallback
    let fallbackList = INITIAL_PRODUCTS;
    if (filters?.category && filters.category !== '전체') {
      fallbackList = fallbackList.filter(p => p.category === filters.category);
    }
    if (filters?.region && filters.region !== '전체') {
      fallbackList = fallbackList.filter(p => p.region === filters.region);
    }
    return fallbackList;
  },

  /**
   * Get single product by ID
   */
  async getProduct(id: string): Promise<Product | null> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            product_images (
              id,
              image_url,
              sort_order
            )
          `)
          .eq('id', id)
          .single();

        if (!error && data) {
          const gallery = (data.product_images || [])
            .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
            .map((img: any) => img.image_url);
          return mapDbProductToProduct(data, gallery);
        }
      } catch (e) {
        console.warn('[ProductService] Supabase get single failed, falling back:', e);
      }
    }

    const all = await this.getProducts();
    return all.find(p => p.id === id) || null;
  },

  /**
   * Create a new product in Supabase & Server
   */
  async createProduct(product: Product): Promise<Product> {
    const prodId = product.id || `prod-${Date.now()}`;
    const newProduct: Product = {
      ...product,
      id: prodId,
      createdAt: product.createdAt || new Date().toISOString()
    };

    // 1. Supabase Insertion
    if (isSupabaseConfigured() && supabase) {
      try {
        const dbRow = mapProductToDbRow(newProduct, 0, 'published');
        const { error: prodError } = await supabase
          .from('products')
          .insert(dbRow);

        if (prodError) {
          console.warn('[ProductService] Supabase insert error:', prodError.message);
          throw prodError;
        }

        // Insert gallery images into product_images
        if (newProduct.additionalImages && newProduct.additionalImages.length > 0) {
          const imageRows = newProduct.additionalImages.map((imgUrl, idx) => ({
            product_id: prodId,
            image_url: imgUrl,
            sort_order: idx + 1
          }));
          await supabase.from('product_images').insert(imageRows);
        }
      } catch (supabaseErr) {
        console.warn('[ProductService] Supabase create error, saving to server backup:', supabaseErr);
      }
    }

    // 2. Server API sync (always keeps server persistent backup in sync)
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
    } catch (serverErr) {
      console.warn('[ProductService] Server sync failed:', serverErr);
    }

    return newProduct;
  },

  /**
   * Update an existing product
   */
  async updateProduct(id: string, product: Product): Promise<Product> {
    const updated: Product = {
      ...product,
      id
    };

    // 1. Supabase Update
    if (isSupabaseConfigured() && supabase) {
      try {
        const dbRow = mapProductToDbRow(updated, 0, 'published');
        const { error: updateError } = await supabase
          .from('products')
          .update(dbRow)
          .eq('id', id);

        if (updateError) {
          console.warn('[ProductService] Supabase update error:', updateError.message);
          throw updateError;
        }

        // Sync product images
        await supabase.from('product_images').delete().eq('product_id', id);
        if (updated.additionalImages && updated.additionalImages.length > 0) {
          const imageRows = updated.additionalImages.map((imgUrl, idx) => ({
            product_id: id,
            image_url: imgUrl,
            sort_order: idx + 1
          }));
          await supabase.from('product_images').insert(imageRows);
        }
      } catch (supabaseErr) {
        console.warn('[ProductService] Supabase update error, saving to server backup:', supabaseErr);
      }
    }

    // 2. Server API Update
    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (serverErr) {
      console.warn('[ProductService] Server update failed:', serverErr);
    }

    return updated;
  },

  /**
   * Delete a product and its associated images
   */
  async deleteProduct(id: string, imageUrlsToDelete: string[] = []): Promise<boolean> {
    // 1. Delete associated images from storage
    if (imageUrlsToDelete.length > 0) {
      for (const imgUrl of imageUrlsToDelete) {
        await imageService.deleteImage(imgUrl);
      }
    }

    // 2. Supabase Delete
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('product_images').delete().eq('product_id', id);
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
          console.warn('[ProductService] Supabase delete error:', error.message);
        }
      } catch (supabaseErr) {
        console.warn('[ProductService] Supabase delete error:', supabaseErr);
      }
    }

    // 3. Server API Delete
    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
    } catch (serverErr) {
      console.warn('[ProductService] Server delete failed:', serverErr);
    }

    return true;
  },

  /**
   * Save / Sync entire array of products
   */
  async syncAllProducts(products: Product[]): Promise<boolean> {
    // 1. Supabase batch upsert
    if (isSupabaseConfigured() && supabase) {
      try {
        for (let i = 0; i < products.length; i++) {
          const p = products[i];
          const dbRow = mapProductToDbRow(p, i, 'published');
          await supabase.from('products').upsert(dbRow);
          
          if (p.additionalImages && p.additionalImages.length > 0) {
            await supabase.from('product_images').delete().eq('product_id', p.id);
            const imageRows = p.additionalImages.map((imgUrl, idx) => ({
              product_id: p.id,
              image_url: imgUrl,
              sort_order: idx + 1
            }));
            await supabase.from('product_images').insert(imageRows);
          }
        }
      } catch (supabaseErr) {
        console.warn('[ProductService] Supabase bulk sync error:', supabaseErr);
      }
    }

    // 2. Server API bulk sync
    try {
      const res = await fetch('/api/products/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products })
      });
      return res.ok;
    } catch (serverErr) {
      console.error('[ProductService] Server sync failed:', serverErr);
      return false;
    }
  },

  /**
   * Clear all products completely from DB & server
   */
  async clearAllProducts(): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('product_images').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('products').delete().neq('id', '');
      } catch (e) {
        console.warn('[ProductService] Supabase clear failed:', e);
      }
    }

    try {
      const res = await fetch('/api/products/clear', { method: 'POST' });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  /**
   * Seed sample data manually (ONLY triggered on admin button click, never automated on F5)
   */
  async seedSampleData(sampleProducts: Product[]): Promise<Product[]> {
    await this.syncAllProducts(sampleProducts);
    return sampleProducts;
  }
};
