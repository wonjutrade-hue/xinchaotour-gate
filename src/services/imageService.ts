import { supabase, isSupabaseConfigured, SUPABASE_BUCKET_NAME } from '../lib/supabase';

export interface UploadResult {
  url: string;
  name?: string;
  size?: number;
  error?: string;
}

export const imageService = {
  /**
   * Upload single image (File, Blob, or base64 data URL) to Supabase Storage or server
   */
  async uploadImage(
    fileOrDataUrl: File | Blob | string,
    customFilename?: string
  ): Promise<string> {
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);

    // 1. If Supabase is configured, upload directly to Supabase Storage Bucket
    if (isSupabaseConfigured() && supabase) {
      try {
        let fileBody: File | Blob;
        let ext = 'jpg';

        if (typeof fileOrDataUrl === 'string') {
          // Convert base64 Data URL to Blob
          if (fileOrDataUrl.startsWith('http://') || fileOrDataUrl.startsWith('https://')) {
            // Already a remote URL
            return fileOrDataUrl;
          }
          const matches = fileOrDataUrl.match(/^data:image\/([a-zA-Z0-9\+\-\.]+);base64,(.+)$/is);
          if (matches) {
            ext = matches[1].toLowerCase().replace('jpeg', 'jpg');
            const byteCharacters = atob(matches[2]);
            const byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
              const slice = byteCharacters.slice(offset, offset + 512);
              const byteNumbers = new Array(slice.length);
              for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              byteArrays.push(byteArray);
            }
            fileBody = new Blob(byteArrays, { type: `image/${ext}` });
          } else {
            return fileOrDataUrl;
          }
        } else {
          fileBody = fileOrDataUrl;
          if ('name' in fileOrDataUrl && fileOrDataUrl.name) {
            const parts = fileOrDataUrl.name.split('.');
            if (parts.length > 1) {
              ext = parts.pop()?.toLowerCase() || 'jpg';
            }
          }
        }

        const fileName = customFilename || `img_${timestamp}_${randomSuffix}.${ext}`;
        const filePath = `products/${fileName}`;

        const { data, error } = await supabase.storage
          .from(SUPABASE_BUCKET_NAME)
          .upload(filePath, fileBody, {
            cacheControl: '3600',
            upsert: true,
          });

        if (error) {
          console.warn('[ImageService] Supabase upload failed, falling back to server upload:', error.message);
          throw error;
        }

        const { data: publicUrlData } = supabase.storage
          .from(SUPABASE_BUCKET_NAME)
          .getPublicUrl(filePath);

        return publicUrlData.publicUrl;
      } catch (supabaseErr) {
        console.warn('[ImageService] Supabase upload error, attempting server fallback:', supabaseErr);
      }
    }

    // 2. Server API fallback / local uploads
    try {
      let dataUrl = '';
      if (typeof fileOrDataUrl === 'string') {
        dataUrl = fileOrDataUrl;
      } else {
        dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(fileOrDataUrl);
        });
      }

      if (dataUrl.startsWith('http://') || dataUrl.startsWith('https://') || dataUrl.startsWith('/uploads/')) {
        return dataUrl;
      }

      const res = await fetch('/api/upload-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: [dataUrl] })
      });

      if (!res.ok) {
        throw new Error(`Upload server error: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.success && data.urls && data.urls.length > 0) {
        return data.urls[0];
      }
      return dataUrl;
    } catch (serverErr) {
      console.error('[ImageService] Server upload failed:', serverErr);
      if (typeof fileOrDataUrl === 'string') {
        return fileOrDataUrl;
      }
      throw serverErr;
    }
  },

  /**
   * Upload multiple images in parallel or chunked batches
   */
  async uploadMultipleImages(
    filesOrDataUrls: Array<File | Blob | string>
  ): Promise<string[]> {
    if (!filesOrDataUrls || filesOrDataUrls.length === 0) return [];

    if (isSupabaseConfigured() && supabase) {
      const results = await Promise.all(
        filesOrDataUrls.map(item => this.uploadImage(item))
      );
      return results.filter(Boolean);
    }

    // Convert items to Data URLs / existing paths
    const dataUrls: string[] = [];
    for (const item of filesOrDataUrls) {
      if (typeof item === 'string') {
        dataUrls.push(item);
      } else {
        try {
          const dUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(item);
          });
          dataUrls.push(dUrl);
        } catch (e) {
          console.warn('[ImageService] FileReader failed:', e);
        }
      }
    }

    const finalUrls: string[] = [];
    const batchSize = 4;
    for (let i = 0; i < dataUrls.length; i += batchSize) {
      const chunk = dataUrls.slice(i, i + batchSize);
      const toUpload = chunk.filter(u => u.startsWith('data:image/'));
      const alreadyUrls = chunk.filter(u => !u.startsWith('data:image/'));

      if (toUpload.length > 0) {
        try {
          const res = await fetch('/api/upload-images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ images: toUpload })
          });
          if (res.ok) {
            const data = await res.json();
            if (data.success && Array.isArray(data.urls)) {
              finalUrls.push(...data.urls);
            } else {
              finalUrls.push(...toUpload);
            }
          } else {
            finalUrls.push(...toUpload);
          }
        } catch (err) {
          console.warn('[ImageService] Batch upload failed, keeping dataUrl:', err);
          finalUrls.push(...toUpload);
        }
      }
      finalUrls.push(...alreadyUrls);
    }

    return finalUrls.filter(Boolean);
  },

  /**
   * Delete image from storage
   */
  async deleteImage(imageUrl: string): Promise<boolean> {
    if (!imageUrl) return true;

    // 1. Supabase Storage deletion
    if (isSupabaseConfigured() && supabase && imageUrl.includes(SUPABASE_BUCKET_NAME)) {
      try {
        const parts = imageUrl.split(`/${SUPABASE_BUCKET_NAME}/`);
        if (parts.length > 1) {
          const rawPath = parts[1].split('?')[0];
          const { error } = await supabase.storage
            .from(SUPABASE_BUCKET_NAME)
            .remove([rawPath]);
          if (!error) return true;
        }
      } catch (err) {
        console.warn('[ImageService] Supabase delete failed:', err);
      }
    }

    // 2. Local uploads deletion
    if (imageUrl.startsWith('/uploads/')) {
      try {
        await fetch('/api/delete-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: imageUrl })
        });
      } catch (e) {
        // ignore
      }
    }

    return true;
  }
};
