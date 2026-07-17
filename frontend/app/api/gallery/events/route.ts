import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/gallery/db';
import { formatEvent } from '@/lib/gallery/format';
import { GALLERY_EVENTS_COLLECTION } from '@/lib/gallery/constants';

export async function GET(request: NextRequest) {
  const db = await getDb();
  const { searchParams } = request.nextUrl;
  const featured = searchParams.get('featured') === 'true';
  const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10) || 50, 200);
  const offset = parseInt(searchParams.get('offset') || '0', 10) || 0;

  const query: Record<string, unknown> = { isPublished: true };
  if (featured) query.isFeatured = true;

  const collection = db.collection(GALLERY_EVENTS_COLLECTION);
  const events = await collection.find(query).sort({ eventDate: -1, displayOrder: 1 }).skip(offset).limit(limit).toArray();
  const total = await collection.countDocuments(query);

  const response = NextResponse.json({
    success: true,
    total,
    events: events.map(formatEvent),
  });
  response.headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
  return response;
}
