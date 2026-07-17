import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/gallery/db';
import { verifyToken } from '@/lib/gallery/auth';
import { formatEvent } from '@/lib/gallery/format';
import { GALLERY_EVENTS_COLLECTION } from '@/lib/gallery/constants';

function getAuthEmail(request: NextRequest): string | null {
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return null;
  const payload = verifyToken(token);
  return payload?.email || null;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  const email = getAuthEmail(request);
  if (!email) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id, imageId } = await params;

  let objectId: ObjectId;
  let imageObjectId: ObjectId;
  try {
    objectId = new ObjectId(id);
    imageObjectId = new ObjectId(imageId);
  } catch {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const db = await getDb();
  const event = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId });
  if (!event) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const images = Array.isArray(event.images) ? event.images : [];
  const filtered = images.filter((img: { _id: ObjectId }) => String(img._id) !== String(imageObjectId));
  if (filtered.length === images.length) {
    return NextResponse.json({ success: false, error: 'Image not found' }, { status: 404 });
  }

  for (let i = 0; i < filtered.length; i++) {
    filtered[i].displayOrder = i;
  }
  if (filtered.length > 0 && !filtered.some((img: { isFeatured: boolean }) => img.isFeatured)) {
    filtered[0].isFeatured = true;
  }

  await db.collection(GALLERY_EVENTS_COLLECTION).updateOne(
    { _id: objectId },
    { $set: { images: filtered, updatedAt: new Date() } }
  );

  const updated = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId }) as any;
  return NextResponse.json({ success: true, event: formatEvent(updated) });
}
