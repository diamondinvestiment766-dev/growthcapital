import Link from 'next/link';
import { getAdminSession } from '@/lib/auth';

export default async function AdminLoginPage() {
  const admin = await getAdminSession();
  if (admin) {
    return <main className="auth-shell"><div className="auth-card"><h1>Admin already logged in</h1><Link href="/admin" className="btn btn-gold">Open Dashboard</Link></div></main>;
  }

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <div className="brand-group">
          <div className="brand-mark">GC</div>
          <div>
            <div className="brand-name">GrowthCapital</div>
            <div className="brand-tag">ADMIN ACCESS</div>
          </div>
        </div>
        <h1>Admin Login</h1>
        <p className="auth-subtitle">Secure administrator authentication. Confirm credentials to continue.</p>

        <form action="/api/admin/login" method="POST" className="form-grid">
          <div className="field">
            <label htmlFor="phone">Admin Number</label>
            <input id="phone" name="phone" type="text" required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>
          <button type="submit" className="btn btn-gold">Login</button>
        </form>
      </div>
    </main>
  );
}
