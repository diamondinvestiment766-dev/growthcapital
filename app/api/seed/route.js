import { NextResponse } from 'next/server';
import { ensureDatabaseReady } from '@/lib/db';

export async function GET() {
  await ensureDatabaseReady();
  return NextResponse.json({ ok: true, message: 'Database initialized successfully.' });
}
