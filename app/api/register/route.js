import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { registerUser, loginUser, addAuditLog, getPackages } from '@/lib/db';
import { createSessionToken, verifyToken, getCurrentUser } from '@/lib/auth';

export async function POST(request) {
  try {
    const form = await request.formData();
    const full_name = String(form.get('full_name') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');
    const confirm_password = String(form.get('confirm_password') || '');
    const referral_code = String(form.get('referral_code') || '').trim();

    if (!full_name || !phone || !email || !password || !confirm_password) {
      throw new Error('All fields are required.');
    }
    if (password !== confirm_password) {
      throw new Error('Passwords do not match.');
    }

    const user = await registerUser({ full_name, phone, email, password, referral_code });
    const token = createSessionToken({ userId: user.id, role: 'USER' });
    const cookieStore = await cookies();
    cookieStore.set('gc_session', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });

    await addAuditLog({ action: 'USER_REGISTER', user_id: user.id, details: JSON.stringify({ email, phone }) });
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL('/register?error=' + encodeURIComponent(error.message), request.url));
  }
}
