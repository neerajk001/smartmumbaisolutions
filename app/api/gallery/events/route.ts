import { NextRequest, NextResponse } from 'next/server';

// Backend URL - where the actual Loan Sarathi backend is running
const BACKEND_URL = process.env.BACKEND_API_URL || 'https://loansarathi.com/api';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    
    console.log('API Route: Fetching from backend URL:', url);
    
    // Forward the request to the actual backend
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Application-Source': 'smartmumbaisolutions', // Required header
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching for fresh data
    });

    console.log('API Route: Response status:', response.status, response.statusText);

    // Check if response is OK
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Route: Error response:', errorText);
      try {
        const errorData = JSON.parse(errorText);
        return NextResponse.json(
          { success: false, error: errorData.error || errorData.message || 'Failed to fetch gallery events' },
          { status: response.status }
        );
      } catch {
        return NextResponse.json(
          { success: false, error: `Backend returned error: ${response.status} ${response.statusText}` },
          { status: response.status }
        );
      }
    }

    // Check content type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('API Route: Non-JSON response:', text);
      return NextResponse.json(
        { success: false, error: 'Invalid response format from backend' },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('API Route: Response data structure:', {
      hasSuccess: 'success' in data,
      hasEvents: 'events' in data,
      isArray: Array.isArray(data),
      keys: Object.keys(data),
    });

    // Return the backend response
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('API Route: Error fetching gallery events:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch gallery events' 
      },
      { status: 500 }
    );
  }
}

