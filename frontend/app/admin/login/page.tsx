'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/admin/gallery',
    });
    if (res?.error) {
      setError('Invalid credentials');
      setLoading(false);
      return;
    }
    if (res?.url) {
      window.location.href = res.url;
      return;
    }
    setLoading(false);
  };

  const onGoogleSignIn = () => {
    setError(null);
    signIn('google', { callbackUrl: '/admin/gallery' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-black rounded-2xl px-6 py-4 mb-4 text-center">
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to continue</p>
        </div>
        <form onSubmit={onSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Login</h2>
          {error && <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">{error}</div>}

          <label className="block text-sm font-semibold text-gray-800 mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 mb-4 text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:border-orange-500 focus:bg-white"
            placeholder="you@example.com"
            required
          />

          <label className="block text-sm font-semibold text-gray-800 mb-1">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 mb-6 text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:border-orange-500 focus:bg-white"
            placeholder="••••••••"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500 font-medium">or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 border-2 border-gray-200 text-gray-800 font-medium py-3 rounded-xl hover:bg-gray-200 hover:border-gray-300 transition-colors"
          >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </button>
        </form>
      </div>
    </div>
  );
}
