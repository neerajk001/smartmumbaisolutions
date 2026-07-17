import jwt from 'jsonwebtoken';

const JWT_SECRET = (): string => process.env.GALLERY_JWT_SECRET || process.env.NEXTAUTH_SECRET || 'change-me';

export interface JwtPayload {
  email: string;
  role: 'admin';
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET()) as JwtPayload;
  } catch {
    return null;
  }
}

export function issueToken(email: string): string {
  return jwt.sign({ email, role: 'admin' }, JWT_SECRET(), { expiresIn: '7d' });
}

export function verifyInternalSecret(secret: string | null): boolean {
  const expectedSecret = process.env.NEXTAUTH_SECRET || process.env.GALLERY_JWT_SECRET;
  if (!expectedSecret) return true;
  return secret === expectedSecret;
}
