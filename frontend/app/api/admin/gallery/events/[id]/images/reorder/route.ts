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

  const body = await request.json().catch(() => ({}));
  const { order } = body || {};
  if (!Array.isArray(order) || order.length === 0) {
    return NextResponse.json({ success: false, error: 'order array required' }, { status: 400 });
  }

  const db = await getDb();
  const event = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId });
  if (!event) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const images = Array.isArray(event.images) ? [...event.images] : [];
  const orderIds = order
    .map((oid: unknown) => (typeof oid === 'string' && ObjectId.isValid(oid) ? new ObjectId(oid) : null))
    .filter((oid: unknown): oid is ObjectId => oid !== null);

  const reordered: typeof images = [];
  for (const oid of orderIds) {
    const img = images.find((i) => String(i._id) === String(oid));
    if (img) reordered.push(img);
  }

  const remaining = images.filter((i) => !orderIds.some((oid) => String(oid) === String(i._id)));
  const merged = [...reordered, ...remaining];
  merged.forEach((img, idx) => {
    img.displayOrder = idx;
  });

  if (merged.length > 0 && !merged.some((img) => img.isFeatured)) {
    merged[0].isFeatured = true;
  }

  await db.collection(GALLERY_EVENTS_COLLECTION).updateOne(
    { _id: objectId },
    { $set: { images: merged, updatedAt: new Date() } }
  );

  const updated = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId }) as any;
  return NextResponse.json({ success: true, event: formatEvent(updated) });
}
