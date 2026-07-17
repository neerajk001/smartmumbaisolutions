import { v2 as cloudinary } from 'cloudinary';

const CLOUDINARY_CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_API_SECRET;

let configured = false;

function ensureConfig() {
  if (configured) return;
  if (CLOUDINARY_CLOUD && CLOUDINARY_KEY && CLOUDINARY_SECRET) {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD,
      api_key: CLOUDINARY_KEY,
      api_secret: CLOUDINARY_SECRET,
    });
  }
  configured = true;
}

export function isCloudinaryConfigured(): boolean {
  return !!(CLOUDINARY_CLOUD && CLOUDINARY_KEY && CLOUDINARY_SECRET);
}

export function uploadToCloudinary(buffer: Buffer, options: Record<string, unknown> = {}): Promise<string | null> {
  return new Promise((resolve) => {
    if (!isCloudinaryConfigured()) {
      return resolve(null);
    }
    ensureConfig();
    const opts = { folder: 'gallery', ...options };
    const uploadStream = cloudinary.uploader.upload_stream(opts, (err, result) => {
      if (err) {
        console.error('[cloudinary] upload error:', err.message);
        return resolve(null);
      }
      resolve(result?.secure_url || null);
    });
    uploadStream.end(buffer);
  });
}
