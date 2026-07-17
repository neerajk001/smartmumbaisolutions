import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/gallery/db';
import { verifyInternalSecret, issueToken } from '@/lib/gallery/auth';
import { ALLOWED_ADMIN_EMAILS_COLLECTION, normalizeEmail } from '@/lib/gallery/constants';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-internal-secret');
  if (!verifyInternalSecret(secret)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const email = normalizeEmail(body?.email);
  if (!email) {
    return NextResponse.json({ success: false, error: 'Email required' }, { status: 400 });
  }

  const db = await getDb();
  const coll = db.collection(ALLOWED_ADMIN_EMAILS_COLLECTION);
  const doc = await coll.findOne({ email });
  if (!doc) {
    return NextResponse.json({ success: false, error: 'Email not allowed' }, { status: 403 });
  }

  const token = issueToken(email);
  return NextResponse.json({ success: true, token });
}
