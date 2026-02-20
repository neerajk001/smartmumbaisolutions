/**
 * Gallery API Client for Smart Mumbai Solutions
 * 
 * This module handles all gallery-related API calls.
 * It fetches directly from the Loan Sarathi backend API.
 */

// Backend URL for API and image assets
const BACKEND_URL = 'https://loansarathi.com';

// Cache configuration
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// In-memory cache
const apiCache = new Map<string, CacheEntry<any>>();

// Helper function to get from cache or fetch
function getCachedOrFetch<T>(
  cacheKey: string,
  fetchFn: () => Promise<T>
): Promise<T> {
  const cached = apiCache.get(cacheKey);
  const now = Date.now();

  // Return cached data if still valid
  if (cached && (now - cached.timestamp) < CACHE_TTL) {
    return Promise.resolve(cached.data);
  }

  // Fetch fresh data
  return fetchFn().then(data => {
    apiCache.set(cacheKey, { data, timestamp: now });
    return data;
  });
}

// Helper function to normalize image URLs
function normalizeImageUrl(imageUrl: string): string {
  // If already a full URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // If relative URL (starts with /), prepend backend URL
  if (imageUrl.startsWith('/')) {
    return `${BACKEND_URL}${imageUrl}`;
  }

  // Otherwise, assume it needs both / and backend URL
  return `${BACKEND_URL}/${imageUrl}`;
}

// Types
export interface GalleryImage {
  id: number;
  imageUrl: string;
  altText: string;
  displayOrder: number;
  isFeatured: boolean;
}

export interface GalleryEvent {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  isFeatured: boolean;
  isPublished: boolean;
  source: string;
  images: GalleryImage[];
  createdAt: string;
  updatedAt?: string;
}

export interface GalleryEventsResponse {
  success: true;
  total: number;
  events: GalleryEvent[];
}

export interface GalleryEventResponse {
  success: true;
  event: GalleryEvent;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

// API Base URL:
// - Client (browser): use local Next.js proxy (/api/gallery) to avoid CORS issues.
//   The proxy calls loansarathi.com server-to-server (no CORS block).
// - Server (SSR/build): call loansarathi.com directly (no CORS restriction server-to-server).
const API_BASE_URL = typeof window !== 'undefined'
  ? '/api/gallery'
  : `${BACKEND_URL}/api/gallery`;

/**
 * Get all gallery events
 * @param featured - Optional: filter for featured events only
 * @param limit - Optional: limit number of results
 * @param offset - Optional: pagination offset
 */
export async function getGalleryEvents(
  featured?: boolean,
  limit?: number,
  offset?: number
): Promise<GalleryEventsResponse | ApiErrorResponse> {
  // Create cache key based on parameters
  const cacheKey = `events_${featured}_${limit}_${offset}`;

  return getCachedOrFetch(cacheKey, async () => {
    try {
      const params = new URLSearchParams();
      if (featured !== undefined) params.append('featured', String(featured));
      if (limit !== undefined) params.append('limit', String(limit));
      if (offset !== undefined) params.append('offset', String(offset));

      const queryString = params.toString();
      const url = `${API_BASE_URL}/events${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Application-Source': 'smartmumbaisolutions',
          'User-Agent': 'SmartMumbaiSolutions/1.0',
        },
        cache: 'no-store', // Don't use browser cache, we have our own
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        return {
          success: false,
          error: `Invalid response format. Expected JSON but got ${contentType}`,
        };
      }

      const data = await response.json();

      if (!response.ok) {
        const msg = data.error || data.message || `Failed to fetch gallery events (${response.status})`;
        const details = data.details ? ` — ${data.details}` : '';
        return {
          success: false,
          error: msg + details,
        };
      }

      // Handle different response structures
      let events: GalleryEvent[] = [];
      if (data.success && data.events) {
        events = data.events;
      } else if (Array.isArray(data)) {
        // If API returns array directly
        events = data;
      } else if (data.data && Array.isArray(data.data)) {
        // If API wraps in data property
        events = data.data;
      } else {
        console.error('Unexpected response structure:', data);
        return {
          success: false,
          error: 'Unexpected response structure from API',
        };
      }

      // Normalize all image URLs
      const normalizedEvents = events.map((event: GalleryEvent) => ({
        ...event,
        images: (event.images || []).map((img: GalleryImage) => ({
          ...img,
          imageUrl: normalizeImageUrl(img.imageUrl),
        })),
      }));

      return {
        success: true,
        total: data.total || normalizedEvents.length,
        events: normalizedEvents,
      };
    } catch (error) {
      console.error('Error fetching gallery events:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error. Please check your connection and try again.',
      };
    }
  });
}

/**
 * Get a single gallery event by ID
 * @param id - Event ID
 */
export async function getGalleryEvent(
  id: number
): Promise<GalleryEventResponse | ApiErrorResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Application-Source': 'smartmumbaisolutions',
        'User-Agent': 'SmartMumbaiSolutions/1.0',
      },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to fetch gallery event',
      };
    }

    // Normalize all image URLs
    if (data.success && data.event && data.event.images) {
      data.event.images = data.event.images.map((img: GalleryImage) => ({
        ...img,
        imageUrl: normalizeImageUrl(img.imageUrl),
      }));
    }

    return data;
  } catch (error) {
    console.error(`Error fetching gallery event ${id}:`, error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Get featured gallery events for homepage
 */
export async function getFeaturedGalleryEvents(): Promise<GalleryEventsResponse | ApiErrorResponse> {
  return getGalleryEvents(true, 2); // Get top 2 featured events
}

/**
 * Health check endpoint to verify API connectivity
 */
export async function checkGalleryHealth(): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Application-Source': 'smartmumbaisolutions',
        'User-Agent': 'SmartMumbaiSolutions/1.0',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Health check failed with status: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || 'API is healthy',
    };
  } catch (error) {
    console.error('Error checking gallery health:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Format event date for display
 * @param dateString - ISO date string
 */
export function formatEventDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Get featured image for an event
 * @param event - Gallery event object
 */
export function getFeaturedImage(event: GalleryEvent): GalleryImage | null {
  if (!event.images || event.images.length === 0) return null;

  // Find image marked as featured
  const featuredImage = event.images.find(img => img.isFeatured);
  if (featuredImage) return featuredImage;

  // Otherwise return first image by display order
  return event.images.sort((a, b) => a.displayOrder - b.displayOrder)[0];
}

/**
 * Get images for an event sorted by display order
 * @param event - Gallery event object
 */
export function getSortedImages(event: GalleryEvent): GalleryImage[] {
  if (!event.images) return [];
  return [...event.images].sort((a, b) => a.displayOrder - b.displayOrder);
}

/**
 * Clear all cached gallery data
 * Useful for forcing a refresh of gallery content
 */
export function clearGalleryCache(): void {
  apiCache.clear();
}

/**
 * Clear specific cache entry
 * @param cacheKey - The cache key to clear
 */
export function clearCacheEntry(cacheKey: string): void {
  apiCache.delete(cacheKey);
}

