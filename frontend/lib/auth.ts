import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { getServerSession as _getServerSession } from 'next-auth';

const galleryApiBase = process.env.NEXT_PUBLIC_GALLERY_API_BASE || 'http://localhost:7001/api/gallery';
const backendBase = galleryApiBase.replace(/\/api\/gallery\/?$/, '') || 'http://localhost:7001';

const hasGoogle = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET;

export const authOptions: NextAuthOptions = {
  providers: [
    ...(hasGoogle
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const res = await fetch(`${backendBase}/api/admin/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success || !data.token) return null;
        return {
          id: 'admin',
          email: credentials.email,
          name: 'Admin',
          image: null,
          galleryToken: data.token as string,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user?.email) {
        const email = String(user.email).toLowerCase().trim();
        const allowedList = (process.env.ALLOWED_ADMIN_EMAILS || '')
          .split(',')
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean);
        if (allowedList.length > 0 && allowedList.includes(email)) return true;

        const secret = process.env.NEXTAUTH_SECRET || process.env.GALLERY_JWT_SECRET;
        try {
          const res = await fetch(
            `${backendBase}/api/admin/check-allowed?email=${encodeURIComponent(user.email)}`,
            { headers: { 'X-Internal-Secret': secret || '' } }
          );
          const data = await res.json().catch(() => ({}));
          if (res.ok && data.allowed) return true;
          if (res.ok && !data.allowed) return false;
          if (!res.ok && allowedList.length > 0 && allowedList.includes(email)) return true;
        } catch {
          if (allowedList.length > 0 && allowedList.includes(email)) return true;
          return false;
        }
        return false;
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email ?? token.email;
        token.name = user.name ?? token.name;
        token.picture = user.image ?? token.picture;
        if (user.galleryToken) {
          token.galleryToken = user.galleryToken;
        } else if (account?.provider === 'google' && user.email) {
          const secret = process.env.NEXTAUTH_SECRET || process.env.GALLERY_JWT_SECRET;
          try {
            const res = await fetch(`${backendBase}/api/admin/token-for-email`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'X-Internal-Secret': secret || '' },
              body: JSON.stringify({ email: user.email }),
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok && data.token) token.galleryToken = data.token;
          } catch {
            // keep token without galleryToken
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as SessionUser).galleryToken = token.galleryToken as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days, match gallery backend JWT
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export interface SessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  galleryToken?: string;
}

declare module 'next-auth' {
  interface User {
    galleryToken?: string;
  }
  interface Session {
    user: SessionUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    galleryToken?: string;
  }
}

export async function getServerSession() {
  return _getServerSession(authOptions);
}
