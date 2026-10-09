import Link from 'next/link';
import { redirectIfLoggedIn, getCurrentUser } from '@/lib/auth';

export default async function LoginPage() {
  await redirectIfLoggedIn();
  const currentUser = getCurrentUser();
  return (
    <main className="auth-shell">
      <div className="auth-card">
        <div className="brand-group">
          <div className="brand-mark">GC</div>
          <div>
            <div className="brand-name">GrowthCapital</div>
            <div className="brand-tag">INVEST TODAY. GROW TOMORROW.</div>
          </div>
        </div>
        <h1>Login</h1>
        <p className="auth-subtitle">Access your portfolio and continue investing securely.</p>

        <form action="/api/login" method="POST" className="form-grid">
          <div className="field">
            <label htmlFor="identifier">Phone or Email</label>
            <input id="identifier" name="identifier" type="text" placeholder="e.g. +244 900 000 000" required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>
          <div className="inline-row">
            <label><input type="checkbox" name="remember" /> Keep me signed in</label>
            <Link href="/reset-password">Forgot password?</Link>
          </div>
          <button className="btn btn-gold" type="submit">Login</button>
        </form>

        <div className="auth-footer">
          No account yet? <Link href="/register">Create Account</Link>
        </div>
      </div>
    </main>
  );
}
