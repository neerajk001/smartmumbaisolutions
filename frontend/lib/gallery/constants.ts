export const GALLERY_EVENTS_COLLECTION = 'galleryEvents';
export const ALLOWED_ADMIN_EMAILS_COLLECTION = 'allowedAdminEmails';
export const DEFAULT_MAX_IMAGE_MB = 20;
export const MAX_FILES_PER_UPLOAD = 20;

export function normalizeEmail(email: string): string {
  return String(email || '').toLowerCase().trim();
}

export function getMaxImageMb(): number {
  return Math.max(1, parseInt(process.env.GALLERY_MAX_IMAGE_MB || String(DEFAULT_MAX_IMAGE_MB), 10) || DEFAULT_MAX_IMAGE_MB);
}
