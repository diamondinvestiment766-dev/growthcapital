import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { loginUser } from '@/lib/db';
import { createSessionToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const form = await request.formData();
    const identifier = String(form.get('identifier') || '').trim();
    const password = String(form.get('password') || '');
    const user = await loginUser(identifier, password);
    const token = createSessionToken({ userId: user.id, role: 'USER' });
    const cookieStore = await cookies();
    cookieStore.set('gc_session', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/login?error=' + encodeURIComponent(error.message), request.url));
  }
}
