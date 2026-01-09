"use client";

import { useState } from "react";

export default function DebugGalleryPage() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runDebug = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gallery/debug');
      const data = await response.json();
      setResults(data);
      console.log('Debug results:', data);
    } catch (error) {
      console.error('Debug error:', error);
      setResults({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Gallery API Debug Tool</h1>

        {/* Run Debug Button */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <button
            onClick={runDebug}
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 text-lg font-semibold"
          >
            {loading ? 'Running Tests...' : '🔍 Run Diagnostic Test'}
          </button>
          <p className="text-gray-600 mt-3 text-sm">
            This will test the connection to your backend and show what's happening
          </p>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* Tests */}
            {results.tests && results.tests.map((test: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  {test.success === false ? '❌' : test.isJSON === false ? '⚠️' : '✅'}
                  {test.name}
                </h2>

                {test.url && (
                  <div className="mb-3">
                    <span className="font-semibold">URL: </span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">{test.url}</code>
                  </div>
                )}

                {test.status && (
                  <div className="mb-3">
                    <span className="font-semibold">Status: </span>
                    <span className={test.status === 200 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                      {test.status}
                    </span>
                  </div>
                )}

                {test.contentType && (
                  <div className="mb-3">
                    <span className="font-semibold">Content-Type: </span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">{test.contentType}</code>
                  </div>
                )}

                {test.isJSON !== undefined && (
                  <div className="mb-3">
                    <span className="font-semibold">Is JSON: </span>
                    <span className={test.isJSON ? 'text-green-600' : 'text-red-600 font-bold'}>
                      {test.isJSON ? 'Yes ✅' : 'No ❌ (Backend returning HTML!)'}
                    </span>
                  </div>
                )}

                {test.eventsCount !== undefined && (
                  <div className="mb-3">
                    <span className="font-semibold">Events Found: </span>
                    <span className="text-blue-600 font-bold text-lg">{test.eventsCount}</span>
                  </div>
                )}

                {test.events && test.events.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Events:</h3>
                    {test.events.map((event: any, idx: number) => (
                      <div key={idx} className="border border-gray-200 p-4 rounded mb-3">
                        <h4 className="font-bold text-lg">{event.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        <div className="text-xs text-gray-500 space-y-1">
                          <div>📅 Date: {event.eventDate}</div>
                          <div>📍 Location: {event.location}</div>
                          <div>🏷️ Source: <span className="font-semibold">{event.source}</span></div>
                          <div>⭐ Featured: {event.isFeatured ? 'Yes' : 'No'}</div>
                          <div>📷 Images: {event.images?.length || 0}</div>
                        </div>
                        {event.images && event.images.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-semibold mb-2">Images:</p>
                            <div className="grid grid-cols-4 gap-2">
                              {event.images.map((img: any, imgIdx: number) => (
                                <div key={imgIdx} className="border p-2 rounded">
                                  <img
                                    src={`https://loansarathi.com${img.imageUrl}`}
                                    alt={img.altText}
                                    className="w-full h-20 object-cover rounded"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                  <p className="text-xs mt-1 truncate">{img.altText}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {test.responsePreview && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Response Preview:</h3>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                      {test.responsePreview}
                    </pre>
                  </div>
                )}

                {test.fullResponse && test.fullResponse !== 'Response too large' && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Full Response:</h3>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-60">
                      {test.fullResponse}
                    </pre>
                  </div>
                )}

                {test.error && (
                  <div className="mt-4 bg-red-50 border border-red-200 p-3 rounded">
                    <h3 className="font-semibold text-red-800 mb-2">Error:</h3>
                    <pre className="text-red-600 text-sm">{test.error}</pre>
                  </div>
                )}
              </div>
            ))}

            {/* Diagnosis */}
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-blue-900 mb-4">🔍 Diagnosis</h2>
              {results.tests && results.tests[0] && (
                <div className="space-y-3 text-blue-800">
                  {results.tests[0].isJSON === false && (
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                      <p className="font-bold text-yellow-900 mb-2">⚠️ Backend is returning HTML instead of JSON</p>
                      <p className="text-sm">This means the API endpoint either:</p>
                      <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                        <li>Doesn't exist yet</li>
                        <li>Is throwing an error</li>
                        <li>Needs to be deployed</li>
                      </ul>
                      <p className="text-sm mt-3 font-semibold">Solution: Deploy the backend or check logs</p>
                    </div>
                  )}
                  
                  {results.tests[1] && results.tests[1].eventsCount === 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                      <p className="font-bold text-yellow-900 mb-2">⚠️ API is working but no events found</p>
                      <p className="text-sm">Make sure:</p>
                      <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                        <li>Events are created with source: <code className="bg-white px-1">smartmumbaisolutions</code></li>
                        <li>Events are published (isPublished = true)</li>
                        <li>Database connection is working</li>
                      </ul>
                    </div>
                  )}

                  {results.tests[1] && results.tests[1].eventsCount > 0 && (
                    <div className="bg-green-50 border border-green-200 p-4 rounded">
                      <p className="font-bold text-green-900 mb-2">✅ API is working correctly!</p>
                      <p className="text-sm">Found <strong>{results.tests[1].eventsCount}</strong> events.</p>
                      <p className="text-sm mt-2">Your Diwali event should be showing on the website!</p>
                      <p className="text-sm mt-2">Try refreshing: <a href="/" className="text-blue-600 underline">Homepage</a> or <a href="/gallery" className="text-blue-600 underline">Gallery</a></p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}











