import { NextRequest, NextResponse } from 'next/server';

// Backend URL - where the actual Loan Sarathi backend is running
const BACKEND_URL = process.env.BACKEND_API_URL || 'https://loansarathi.com/api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Forward the request to the actual backend
    const response = await fetch(`${BACKEND_URL}/gallery/events/${id}`, {
      method: 'GET',
      headers: {
        'X-Application-Source': 'smartmumbaisolutions', // Required header
      },
      cache: 'no-store', // Disable caching for fresh data
    });

    const data = await response.json();

    // Return the backend response
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`Error fetching gallery event ${params.id}:`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery event' },
      { status: 500 }
    );
  }
}

