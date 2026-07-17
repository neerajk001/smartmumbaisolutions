import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({
    success: true,
    message: 'Gallery backend healthy',
    timestamp: new Date().toISOString(),
  });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
