"use client";

import { useState } from "react";

export default function TestGalleryPage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testDirectBackendCall = async () => {
    setLoading(true);
    setError(null);
    setTestResults(null);

    try {
      console.log('Testing direct backend call...');
      
      const response = await fetch('https://loansarathi.com/api/gallery/events', {
        method: 'GET',
        headers: {
          'X-Application-Source': 'smartmumbaisolutions',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const data = await response.json();
      console.log('Response data:', data);

      setTestResults({
        status: response.status,
        success: data.success,
        data: data,
      });

      if (!response.ok) {
        setError(`API returned status ${response.status}`);
      }
    } catch (err: any) {
      console.error('Error testing backend:', err);
      setError(err.message || 'Failed to fetch from backend');
    } finally {
      setLoading(false);
    }
  };

  const testViaNextAPI = async () => {
    setLoading(true);
    setError(null);
    setTestResults(null);

    try {
      console.log('Testing via Next.js API route...');
      
      const response = await fetch('/api/gallery/events', {
        method: 'GET',
      });

      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);

      setTestResults({
        status: response.status,
        success: data.success,
        data: data,
      });

      if (!response.ok) {
        setError(`API returned status ${response.status}`);
      }
    } catch (err: any) {
      console.error('Error testing Next.js API:', err);
      setError(err.message || 'Failed to fetch via Next.js API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Gallery API Test Page</h1>

        {/* Test Buttons */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Test API Connections</h2>
          <div className="flex gap-4">
            <button
              onClick={testDirectBackendCall}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Test Direct Backend Call
            </button>
            <button
              onClick={testViaNextAPI}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Test Via Next.js API Route
            </button>
          </div>
          {loading && (
            <p className="mt-4 text-gray-600">Loading...</p>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
            <h3 className="text-red-800 font-semibold mb-2">Error:</h3>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Results Display */}
        {testResults && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">API Response</h2>
            
            {/* Status */}
            <div className="mb-4">
              <span className="font-semibold">Status: </span>
              <span className={testResults.status === 200 ? 'text-green-600' : 'text-red-600'}>
                {testResults.status}
              </span>
            </div>

            {/* Success */}
            <div className="mb-4">
              <span className="font-semibold">Success: </span>
              <span className={testResults.success ? 'text-green-600' : 'text-red-600'}>
                {testResults.success ? 'true' : 'false'}
              </span>
            </div>

            {/* Events Count */}
            {testResults.data && testResults.data.events && (
              <div className="mb-4">
                <span className="font-semibold">Events Found: </span>
                <span className="text-blue-600">{testResults.data.events.length}</span>
              </div>
            )}

            {/* Full Response */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Full Response:</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-xs">
                {JSON.stringify(testResults.data, null, 2)}
              </pre>
            </div>

            {/* Events Display */}
            {testResults.data && testResults.data.events && testResults.data.events.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-4">Events:</h3>
                {testResults.data.events.map((event: any) => (
                  <div key={event.id} className="border border-gray-200 p-4 rounded-lg mb-4">
                    <h4 className="font-bold text-lg mb-2">{event.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      📅 {event.eventDate} | 📍 {event.location}
                    </p>
                    
                    {event.images && event.images.length > 0 && (
                      <div className="mt-4">
                        <p className="font-semibold mb-2">Images ({event.images.length}):</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {event.images.map((img: any, idx: number) => (
                            <div key={idx} className="border p-2 rounded">
                              <img
                                src={img.imageUrl}
                                alt={img.altText || 'Gallery image'}
                                className="w-full h-32 object-cover rounded mb-2"
                                onError={(e) => {
                                  console.error('Image failed to load:', img.imageUrl);
                                  e.currentTarget.src = '/placeholder.jpg';
                                }}
                              />
                              <p className="text-xs text-gray-500 truncate">
                                {img.imageUrl}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mt-6">
          <h3 className="font-semibold text-blue-900 mb-3">How to Use This Page:</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
            <li>Click "Test Direct Backend Call" to test direct connection to Loan Sarathi backend</li>
            <li>Click "Test Via Next.js API Route" to test through your proxy</li>
            <li>Check the response data below</li>
            <li>Open browser DevTools Console (F12) for detailed logs</li>
            <li>If images show, backend is working correctly!</li>
          </ol>
        </div>

        {/* API Endpoint Info */}
        <div className="bg-gray-100 p-6 rounded-lg mt-6">
          <h3 className="font-semibold mb-3">API Endpoints Being Tested:</h3>
          <div className="space-y-2 text-sm font-mono">
            <p>Direct: <span className="text-blue-600">https://loansarathi.com/api/gallery/events</span></p>
            <p>Via Next.js: <span className="text-green-600">http://localhost:3001/api/gallery/events</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}









