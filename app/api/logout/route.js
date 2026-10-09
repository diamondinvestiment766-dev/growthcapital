import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
  const cookieStore = await cookies();
  cookieStore.delete('gc_session');
  cookieStore.delete('gc_admin_session');
  return NextResponse.redirect(new URL('/', request.url));
}
