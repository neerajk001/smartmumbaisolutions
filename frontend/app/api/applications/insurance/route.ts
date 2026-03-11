import { NextRequest, NextResponse } from 'next/server';

// Backend URL - where the actual Loan Sarathi backend is running
const BACKEND_URL = process.env.BACKEND_API_URL || 'https://loansarathi.com/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward the request to the actual backend
    const response = await fetch(`${BACKEND_URL}/applications/insurance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Application-Source': 'smartmumbaisolutions', // Required header
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Return the backend response
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error proxying insurance application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit insurance application' },
      { status: 500 }
    );
  }
}

