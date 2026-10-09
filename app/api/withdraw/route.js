import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { createWithdrawal } from '@/lib/db';

export async function POST(request) {
  try {
    const user = await requireUser();
    const form = await request.formData();
    const amount = Number(form.get('amount'));
    const method = String(form.get('method') || 'BANK_TRANSFER');
    const account_name = String(form.get('account_name') || '');
    const bank = String(form.get('bank') || '');
    const iban = String(form.get('iban') || '');
    const phone = String(form.get('phone') || '');
    const notes = String(form.get('notes') || '');

    if (!amount || amount <= 0) {
      throw new Error('Invalid withdrawal amount.');
    }

    await createWithdrawal({ user_id: user.id, amount, method, account_name, bank, iban, phone, notes });
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    return NextResponse.redirect(new URL('/withdraw?error=' + encodeURIComponent(error.message), request.url));
  }
}
