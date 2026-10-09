import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getUserById } from '@/lib/db';

export function createSessionToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || 'development-secret', { expiresIn: '7d' });
}

export function createAdminToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || 'development-secret', { expiresIn: '12h' });
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || 'development-secret');
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('gc_session')?.value;
  if (!token) return null;
  try {
    const payload = verifyToken(token);
    return await getUserById(payload.userId);
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('gc_admin_session')?.value;
  if (!token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentication required.');
  }
  return user;
}

export async function redirectIfLoggedIn() {
  const user = await getCurrentUser();
  if (user) {
    const redirectUrl = new URL('/dashboard', 'http://localhost');
    if (typeof window === 'undefined') {
      // No-op for server render; route will be used after redirect from middleware if required.
    }
  }
}
