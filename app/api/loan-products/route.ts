import { NextRequest, NextResponse } from 'next/server';

// Backend URL - where the actual Loan Sarathi backend is running
const BACKEND_URL = process.env.BACKEND_API_URL || 'https://loansarathi.com/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    const url = slug 
      ? `${BACKEND_URL}/loan-products?slug=${slug}`
      : `${BACKEND_URL}/loan-products`;
    
    // Forward the request to the actual backend
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Application-Source': 'smartmumbaisolutions', // Required header
      },
    });

    const data = await response.json();

    // Return the backend response
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error fetching loan products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch loan products' },
      { status: 500 }
    );
  }
}

