import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'https://loansarathi.com/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const response = await fetch(`${BACKEND_URL}/gallery/health`, {
      method: 'GET',
      headers: {
        'X-Application-Source': 'smartmumbaisolutions',
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Gallery health check failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reach gallery API' },
      { status: 500 }
    );
  }
}
