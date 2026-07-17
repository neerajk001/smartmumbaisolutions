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

export async function GET(
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

  const db = await getDb();
  const event = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId });
  if (!event) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, event: formatEvent(event) });
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
  const { title, description, eventDate, location, isFeatured, isPublished } = body || {};

  const update: Record<string, unknown> = { updatedAt: new Date() };
  if (title !== undefined) update.title = String(title);
  if (description !== undefined) update.description = String(description);
  if (eventDate !== undefined) update.eventDate = new Date(eventDate);
  if (location !== undefined) update.location = String(location);
  if (typeof isFeatured === 'boolean') update.isFeatured = isFeatured;
  if (typeof isPublished === 'boolean') update.isPublished = isPublished;

  const db = await getDb();
  const result = await db.collection(GALLERY_EVENTS_COLLECTION).updateOne({ _id: objectId }, { $set: update });
  if (result.matchedCount === 0) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const event = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId }) as any;
  return NextResponse.json({ success: true, event: formatEvent(event) });
}

export async function DELETE(
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

  const db = await getDb();
  const result = await db.collection(GALLERY_EVENTS_COLLECTION).deleteOne({ _id: objectId });
  if (result.deletedCount === 0) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
