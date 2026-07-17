import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/gallery/db';
import { verifyToken } from '@/lib/gallery/auth';
import { ALLOWED_ADMIN_EMAILS_COLLECTION, normalizeEmail } from '@/lib/gallery/constants';

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

  const db = await getDb();
  const coll = db.collection(ALLOWED_ADMIN_EMAILS_COLLECTION);
  const docs = await coll.find({}).toArray();
  const emails = docs.map((d) => d.email).filter(Boolean);

  return NextResponse.json({ emails });
}

export async function POST(request: NextRequest) {
  const email = getAuthEmail(request);
  if (!email) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const newEmail = normalizeEmail(body?.email);
  if (!newEmail) {
    return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 });
  }

  const db = await getDb();
  const coll = db.collection(ALLOWED_ADMIN_EMAILS_COLLECTION);
  await coll.updateOne({ email: newEmail }, { $setOnInsert: { email: newEmail } }, { upsert: true });

  return NextResponse.json({ success: true, email: newEmail });
}

export async function DELETE(request: NextRequest) {
  const email = getAuthEmail(request);
  if (!email) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const targetEmail = normalizeEmail(request.nextUrl.searchParams.get('email') || '');
  if (!targetEmail) {
    return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 });
  }

  const db = await getDb();
  const coll = db.collection(ALLOWED_ADMIN_EMAILS_COLLECTION);
  const count = await coll.countDocuments({});
  if (count <= 1) {
    return NextResponse.json({ success: false, error: 'Cannot remove the last allowed admin' }, { status: 400 });
  }

  await coll.deleteOne({ email: targetEmail });
  return NextResponse.json({ success: true });
}
