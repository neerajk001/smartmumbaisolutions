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

    // Forward the request to the actual backend
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Application-Source': 'smartmumbaisolutions', // Required header
        'User-Agent': 'SmartMumbaiSolutions/1.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching for fresh data
    });

    // Check if response is OK
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Route: Backend error', response.status, errorText);
      try {
        const errorData = JSON.parse(errorText);
        const message = errorData.error || errorData.message || 'Failed to fetch gallery events';
        const details = errorData.details;
        return NextResponse.json(
          { success: false, error: message, ...(details && { details }) },
          { status: response.status }
        );
      } catch {
        return NextResponse.json(
          { success: false, error: `Backend returned ${response.status}: ${errorText || response.statusText}` },
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

    // Return the backend response
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('API Route: Error fetching gallery events:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Gallery backend unreachable',
        details: process.env.NODE_ENV === 'development' ? message : undefined,
      },
      { status: 500 }
    );
  }
}

