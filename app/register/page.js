import Link from 'next/link';
import { redirectIfLoggedIn } from '@/lib/auth';

export default async function RegisterPage() {
  await redirectIfLoggedIn();

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
        <h1>Create Account</h1>
        <p className="auth-subtitle">Join GrowthCapital and start building your portfolio.</p>

        <form action="/api/register" method="POST" className="form-grid">
          <div className="field">
            <label htmlFor="full_name">Full Name</label>
            <input id="full_name" name="full_name" type="text" required />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" type="tel" required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>
          <div className="field">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input id="confirm_password" name="confirm_password" type="password" required />
          </div>
          <div className="field">
            <label htmlFor="referral_code">Invitation code (optional)</label>
            <input id="referral_code" name="referral_code" type="text" placeholder="GC123456" />
          </div>
          <div className="inline-row">
            <label><input type="checkbox" name="accept_terms" required /> I agree to the terms and privacy policy</label>
          </div>
          <button className="btn btn-gold" type="submit">Create Account</button>
        </form>

        <div className="auth-footer">
          Already registered? <Link href="/login">Login</Link>
        </div>
      </div>
    </main>
  );
}
