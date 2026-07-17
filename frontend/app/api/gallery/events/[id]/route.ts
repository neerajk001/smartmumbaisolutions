import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/gallery/db';
import { formatEvent } from '@/lib/gallery/format';
import { GALLERY_EVENTS_COLLECTION } from '@/lib/gallery/constants';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = await getDb();

  let objectId: ObjectId;
  try {
    objectId = new ObjectId(id);
  } catch {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const event = await db.collection(GALLERY_EVENTS_COLLECTION).findOne({ _id: objectId, isPublished: true });
  if (!event) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const response = NextResponse.json({ success: true, event: formatEvent(event) });
  response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
  return response;
}
