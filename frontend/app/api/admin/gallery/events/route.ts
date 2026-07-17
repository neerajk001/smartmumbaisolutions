import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/gallery/db';
import { verifyToken } from '@/lib/gallery/auth';
import { uploadToCloudinary, isCloudinaryConfigured } from '@/lib/gallery/cloudinary';
import { formatEvent } from '@/lib/gallery/format';
import { GALLERY_EVENTS_COLLECTION, getMaxImageMb, MAX_FILES_PER_UPLOAD } from '@/lib/gallery/constants';

function getAuthEmail(request: NextRequest): string | null {
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.email || null;
}

export async function GET(request: NextRequest) {
  const email = getAuthEmail(request);
  if (!email) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const limit = Math.min(parseInt(searchParams.get('limit') || '100', 10) || 100, 500);
  const offset = parseInt(searchParams.get('offset') || '0', 10) || 0;

  const db = await getDb();
  const events = await db.collection(GALLERY_EVENTS_COLLECTION).find({}).sort({ eventDate: -1, createdAt: -1 }).skip(offset).limit(limit).toArray();
  const total = await db.collection(GALLERY_EVENTS_COLLECTION).countDocuments({});

  return NextResponse.json({ success: true, total, events: events.map(formatEvent) });
}

export async function POST(request: NextRequest) {
  const email = getAuthEmail(request);
  if (!email) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ success: false, error: 'Cloudinary not configured' }, { status: 503 });
  }

  const maxImageMb = getMaxImageMb();
  const formData = await request.formData();

  const title = String(formData.get('title') || '');
  const description = String(formData.get('description') || '');
  const eventDate = String(formData.get('eventDate') || '');
  const location = String(formData.get('location') || '');
  const isFeatured = String(formData.get('isFeatured') || 'false') === 'true';
  const isPublished = String(formData.get('isPublished') || 'true') === 'true';

  if (!title || !description || !eventDate || !location) {
    return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
  }

  const files: File[] = [];
  for (const [_key, value] of formData.entries()) {
    if (value instanceof File) {
      files.push(value);
    }
  }

  if (files.length > MAX_FILES_PER_UPLOAD) {
    return NextResponse.json({ success: false, error: `Maximum ${MAX_FILES_PER_UPLOAD} images per upload` }, { status: 400 });
  }

  const _id = new ObjectId();
  const eventIdStr = _id.toString();
  const images = [];

  for (let idx = 0; idx < files.length; idx++) {
    const f = files[idx];
    const arrayBuffer = await f.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const imageUrl = await uploadToCloudinary(buffer, { public_id: `${eventIdStr}/${Date.now()}_${idx}` });
    if (imageUrl) {
      images.push({
        _id: new ObjectId(),
        imageUrl,
        altText: '',
        displayOrder: idx,
        isFeatured: idx === 0,
        uploadedAt: new Date(),
      });
    }
  }

  const doc = {
    _id,
    title,
    description,
    eventDate: new Date(eventDate),
    location,
    isFeatured,
    isPublished,
    displayOrder: 0,
    images,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: email,
  };

  const db = await getDb();
  await db.collection(GALLERY_EVENTS_COLLECTION).insertOne(doc);

  return NextResponse.json({ success: true, event: formatEvent(doc) }, { status: 201 });
}
