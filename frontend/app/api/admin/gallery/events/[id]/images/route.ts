import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/gallery/db';
import { verifyToken } from '@/lib/gallery/auth';
import { uploadToCloudinary, isCloudinaryConfigured } from '@/lib/gallery/cloudinary';
import { formatEvent } from '@/lib/gallery/format';
import { GALLERY_EVENTS_COLLECTION, MAX_FILES_PER_UPLOAD } from '@/lib/gallery/constants';

function getAuthEmail(request: NextRequest): string | null {
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.email || null;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const email = getAuthEmail(request);
  if (!email) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  let objectId: ObjectId;
  try {
    objectId = new ObjectId(id);
  } catch {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ success: false, error: 'Cloudinary not configured' }, { status: 503 });
  }

  const db = await getDb();
  const event = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId });
  if (!event) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const formData = await request.formData();
  const files: File[] = [];
  for (const [_key, value] of formData.entries()) {
    if (value instanceof File) {
      files.push(value);
    }
  }

  if (files.length > MAX_FILES_PER_UPLOAD) {
    return NextResponse.json({ success: false, error: `Maximum ${MAX_FILES_PER_UPLOAD} images per upload` }, { status: 400 });
  }

  const existingImages = Array.isArray(event.images) ? [...event.images] : [];
  const eventIdStr = objectId.toString();

  for (let idx = 0; idx < files.length; idx++) {
    const f = files[idx];
    const arrayBuffer = await f.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const imageUrl = await uploadToCloudinary(buffer, { public_id: `${eventIdStr}/${Date.now()}_${existingImages.length + idx}` });
    if (imageUrl) {
      existingImages.push({
        _id: new ObjectId(),
        imageUrl,
        altText: '',
        displayOrder: existingImages.length,
        isFeatured: existingImages.length === 0,
        uploadedAt: new Date(),
      });
    }
  }

  await db.collection(GALLERY_EVENTS_COLLECTION).updateOne(
    { _id: objectId },
    { $set: { images: existingImages, updatedAt: new Date() } }
  );

  const updated = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId }) as any;
  return NextResponse.json({ success: true, event: formatEvent(updated) });
}
