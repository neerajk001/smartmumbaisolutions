import { NextRequest, NextResponse } from 'next/server';

// Backend URL - where the actual Loan Sarathi backend is running
const BACKEND_URL = process.env.BACKEND_API_URL || 'https://loansarathi.com/api';

export async function GET(request: NextRequest) {
  const results: any = {
    timestamp: new Date().toISOString(),
    tests: [],
  };

  try {
    // Test 1: Direct backend call
    console.log('🧪 Testing backend API...');
    
    try {
      const response = await fetch(`${BACKEND_URL}/gallery/events`, {
        method: 'GET',
        headers: {
          'X-Application-Source': 'smartmumbaisolutions',
        },
      });

      const responseText = await response.text();
      
      results.tests.push({
        name: 'Backend API Call',
        url: `${BACKEND_URL}/gallery/events`,
        status: response.status,
        contentType: response.headers.get('content-type'),
        isJSON: responseText.startsWith('{') || responseText.startsWith('['),
        responsePreview: responseText.substring(0, 200),
        fullResponse: responseText.length < 2000 ? responseText : 'Response too large',
      });

      // Try to parse as JSON
      if (response.status === 200) {
        try {
          const data = JSON.parse(responseText);
          results.tests.push({
            name: 'JSON Parse',
            success: true,
            eventsCount: data.events?.length || 0,
            events: data.events || [],
          });
        } catch (parseError: any) {
          results.tests.push({
            name: 'JSON Parse',
            success: false,
            error: parseError.message,
          });
        }
      }
    } catch (fetchError: any) {
      results.tests.push({
        name: 'Backend API Call',
        success: false,
        error: fetchError.message,
      });
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}












