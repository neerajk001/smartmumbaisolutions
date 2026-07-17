import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/gallery/db';
import { verifyInternalSecret } from '@/lib/gallery/auth';
import { ALLOWED_ADMIN_EMAILS_COLLECTION, normalizeEmail } from '@/lib/gallery/constants';

export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-internal-secret');
  if (!verifyInternalSecret(secret)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const email = normalizeEmail(request.nextUrl.searchParams.get('email') || '');
  if (!email) {
    return NextResponse.json({ success: false, allowed: false }, { status: 400 });
  }

  const db = await getDb();
  const coll = db.collection(ALLOWED_ADMIN_EMAILS_COLLECTION);
  const doc = await coll.findOne({ email });

  return NextResponse.json({ allowed: !!doc });
}
