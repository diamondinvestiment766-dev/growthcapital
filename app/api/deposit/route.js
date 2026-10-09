import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { requireUser } from '@/lib/auth';
import { createDeposit } from '@/lib/db';

export async function POST(request) {
  try {
    const user = await requireUser();
    const form = await request.formData();
    const amount = Number(form.get('amount'));
    const method = String(form.get('method') || 'IBAN');
    const proof = String(form.get('proof') || '');

    if (!amount || amount <= 0) {
      throw new Error('Invalid deposit amount.');
    }

    await createDeposit({ user_id: user.id, amount, method, proof });
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    return NextResponse.redirect(new URL('/deposit?error=' + encodeURIComponent(error.message), request.url));
  }
}
