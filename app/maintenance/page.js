export const dynamic = 'force-dynamic';

import Link from 'next/link';

export default function MaintenancePage() {
  return (
    <main className="auth-shell">
      <div className="auth-card">
        <div className="brand-name">GrowthCapital</div>
        <h1>Maintenance mode</h1>
        <p className="auth-subtitle">The platform is currently under maintenance. Please check back shortly.</p>
        <Link href="/" className="btn btn-gold">Back to home</Link>
      </div>
    </main>
  );
}
