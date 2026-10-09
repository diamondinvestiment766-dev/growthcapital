import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { createInvestment, getPackages } from '@/lib/db';

export async function POST(request) {
  try {
    const user = await requireUser();
    const form = await request.formData();
    const package_id = Number(form.get('package_id'));
    const packages = await getPackages();
    const selectedPackage = packages.find((pkg) => pkg.id === package_id);

    if (!selectedPackage) {
      throw new Error('Package not found.');
    }

    await createInvestment({ user_id: user.id, package_id: selectedPackage.id, amount: selectedPackage.min_amount, package_name: selectedPackage.name });
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    return NextResponse.redirect(new URL('/packages?error=' + encodeURIComponent(error.message), request.url));
  }
}
