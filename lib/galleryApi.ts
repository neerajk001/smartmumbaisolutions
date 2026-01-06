/**
 * Gallery API Client for Smart Mumbai Solutions
 * 
 * This module handles all gallery-related API calls.
 * It communicates with Next.js API routes which proxy to the Loan Sarathi backend.
 */

// Backend URL for image assets
const BACKEND_URL = 'https://loansarathi.com';

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
 // Add new function to get gallery events
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
  images: GalleryImage[];
  createdAt: string;
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

// API Base URL (Next.js API routes)
const API_BASE_URL = typeof window !== 'undefined' ? '/api' : 'http://localhost:3001/api';

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
  try {
    const params = new URLSearchParams();
    if (featured !== undefined) params.append('featured', String(featured));
    if (limit !== undefined) params.append('limit', String(limit));
    if (offset !== undefined) params.append('offset', String(offset));

    const queryString = params.toString();
    const url = `${API_BASE_URL}/gallery/events${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh data
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to fetch gallery events',
      };
    }

    // Normalize all image URLs
    if (data.success && data.events) {
      data.events = data.events.map((event: GalleryEvent) => ({
        ...event,
        images: event.images.map(img => ({
          ...img,
          imageUrl: normalizeImageUrl(img.imageUrl),
        })),
      }));
    }

    return data;
  } catch (error) {
    console.error('Error fetching gallery events:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Get a single gallery event by ID
 * @param id - Event ID
 */
export async function getGalleryEvent(
  id: number
): Promise<GalleryEventResponse | ApiErrorResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

