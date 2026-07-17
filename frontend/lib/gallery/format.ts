import { ObjectId } from 'mongodb';

export interface GalleryImage {
  _id?: ObjectId;
  imageUrl: string;
  altText: string;
  displayOrder: number;
  isFeatured: boolean;
  uploadedAt?: Date;
}

export interface GalleryEventDoc {
  _id: ObjectId;
  title: string;
  description: string;
  eventDate: Date;
  location: string;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  images: GalleryImage[];
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string | null;
}

export interface FormattedGalleryImage {
  id: string;
  imageUrl: string;
  altText: string;
  displayOrder: number;
  isFeatured: boolean;
}

export interface FormattedGalleryEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  isFeatured: boolean;
  isPublished: boolean;
  source: string;
  images: FormattedGalleryImage[];
  createdAt: string | null;
  updatedAt: string | null;
}

export function formatEvent(event: any): FormattedGalleryEvent {
  return {
    id: event._id?.toString?.() ?? String(event._id),
    title: event.title || '',
    description: event.description || '',
    eventDate: event.eventDate ? new Date(event.eventDate).toISOString().slice(0, 10) : '',
    location: event.location || '',
    isFeatured: Boolean(event.isFeatured),
    isPublished: Boolean(event.isPublished),
    source: 'gallery-backend',
    images: Array.isArray(event.images) ? event.images.map((img: any, idx: number) => ({
      id: img._id?.toString?.() ?? String(img._id ?? idx),
      imageUrl: img.imageUrl || '',
      altText: img.altText || '',
      displayOrder: img.displayOrder ?? idx,
      isFeatured: Boolean(img.isFeatured),
    })) : [],
    createdAt: event.createdAt ? new Date(event.createdAt).toISOString() : null,
    updatedAt: event.updatedAt ? new Date(event.updatedAt).toISOString() : null,
  };
}
