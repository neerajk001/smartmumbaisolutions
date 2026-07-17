import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getServerSession as _getServerSession } from 'next-auth';
import { getDb } from '@/lib/gallery/db';
import { verifyInternalSecret, issueToken } from '@/lib/gallery/auth';
import { ALLOWED_ADMIN_EMAILS_COLLECTION, normalizeEmail } from '@/lib/gallery/constants';

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
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user?.email) {
        const email = normalizeEmail(user.email);
        const allowedList = (process.env.ALLOWED_ADMIN_EMAILS || '')
          .split(',')
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean);
        if (allowedList.length > 0 && allowedList.includes(email)) return true;

        try {
          const db = await getDb();
          const coll = db.collection(ALLOWED_ADMIN_EMAILS_COLLECTION);
          const doc = await coll.findOne({ email });
          if (doc) return true;
        } catch {
          if (allowedList.length > 0 && allowedList.includes(email)) return true;
          return false;
        }
        return false;
      }
      return false;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email ?? token.email;
        token.name = user.name ?? token.name;
        token.picture = user.image ?? token.picture;
        if (account?.provider === 'google' && user.email) {
          try {
            const email = normalizeEmail(user.email);
            const db = await getDb();
            const coll = db.collection(ALLOWED_ADMIN_EMAILS_COLLECTION);
            const doc = await coll.findOne({ email });
            if (doc) {
              token.galleryToken = issueToken(email);
            }
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
    signIn: '/admin',
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
