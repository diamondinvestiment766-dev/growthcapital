import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminLogin } from '@/lib/db';
import { createAdminToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const form = await request.formData();
    const phone = String(form.get('phone') || '').trim();
    const password = String(form.get('password') || '');
    const admin = await adminLogin(phone, password);
    const token = createAdminToken({ adminId: admin.id, role: 'ADMIN' });
    const cookieStore = await cookies();
    cookieStore.set('gc_admin_session', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });
    return NextResponse.redirect(new URL('/admin', request.url));
  } catch (error) {
    return NextResponse.redirect(new URL('/admin/login?error=' + encodeURIComponent(error.message), request.url));
  }
}
