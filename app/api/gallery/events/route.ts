import { NextRequest, NextResponse } from 'next/server';

// Backend URL - where the actual Loan Sarathi backend is running
const BACKEND_URL = process.env.BACKEND_API_URL || 'https://loansarathi.com/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');
    
    // Build query string
    const params = new URLSearchParams();
    if (featured) params.append('featured', featured);
    if (limit) params.append('limit', limit);
    if (offset) params.append('offset', offset);
    
    const queryString = params.toString();
    const url = `${BACKEND_URL}/gallery/events${queryString ? `?${queryString}` : ''}`;
    
    // Forward the request to the actual backend
    const response = await fetch(url, {
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
    console.error('Error fetching gallery events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery events' },
      { status: 500 }
    );
  }
}

