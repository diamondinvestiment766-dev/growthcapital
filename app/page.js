import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { getPackages } from '@/lib/db';

export default async function HomePage() {
  const sessionUser = getCurrentUser();
  const packages = await getPackages();

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="container nav">
          <div className="brand-group">
            <div className="brand-mark">GC</div>
            <div>
              <div className="brand-name">GrowthCapital</div>
              <div className="brand-tag">INVEST TODAY. GROW TOMORROW.</div>
            </div>
          </div>
          <nav className="main-nav">
            <Link href="/">Home</Link>
            <Link href="/packages">Invest</Link>
            <Link href="/#how-it-works">How It Works</Link>
            <Link href="/packages">Packages</Link>
            <Link href="/#about">About</Link>
            {sessionUser ? (
              <Link href="/dashboard">Dashboard</Link>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register" className="btn btn-gold">Create Account</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Professional Growth Platform</p>
            <h1>Grow Your Capital With GrowthCapital</h1>
            <p className="hero-copy">
              GrowthCapital helps individuals and professionals build wealth through secure investment products,
              affiliate rewards, transparent account management and professional support.
            </p>
            <div className="cta-row">
              <Link href="/register" className="btn btn-gold">Create Account</Link>
              <Link href="/login" className="btn btn-secondary">Login</Link>
            </div>
            <div className="stats-row">
              <div>
                <strong>5M+</strong>
                <span>Scalable system</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Platform access</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Transparent records</span>
              </div>
            </div>
          </div>
          <div className="hero-card">
            <div className="glass-panel">
              <div className="mini-label">Portfolio Snapshot</div>
              <div className="value-row">
                <span>Available Balance</span>
                <strong>KZ 24,500.00</strong>
              </div>
              <div className="value-row">
                <span>Invested Capital</span>
                <strong>KZ 82,000.00</strong>
              </div>
              <div className="value-row">
                <span>Monthly Yield</span>
                <strong>KZ 12,400.00</strong>
              </div>
              <div className="progress-line">
                <span style={{ width: '72%' }}></span>
              </div>
              <div className="mini-caption">Target growth rate 72%</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Benefits</p>
            <h2>Why choose GrowthCapital</h2>
          </div>
          <div className="card-grid three-col">
            <div className="info-card">
              <div className="icon">◎</div>
              <h3>Safe Growth</h3>
              <p>Structured investment plans with transparent financial rules and audited transactions.</p>
            </div>
            <div className="info-card">
              <div className="icon">↗</div>
              <h3>Performance</h3>
              <p>Designed to optimize returns with clear packages, daily earnings and active monitoring.</p>
            </div>
            <div className="info-card">
              <div className="icon">⛨</div>
              <h3>Security</h3>
              <p>Secure sessions, validated users, protected admin access and comprehensive audit logs.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section muted-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">How it works</p>
            <h2>Simple steps to get started</h2>
          </div>
          <div className="steps-grid">
            <div className="step-box">
              <span>01</span>
              <h3>Create account</h3>
              <p>Register as a user and create a secure profile in a few minutes.</p>
            </div>
            <div className="step-box">
              <span>02</span>
              <h3>Fund account</h3>
              <p>Make a deposit using approved local methods and upload proof.</p>
            </div>
            <div className="step-box">
              <span>03</span>
              <h3>Choose package</h3>
              <p>Pick the best investment option and receive planned daily returns.</p>
            </div>
            <div className="step-box">
              <span>04</span>
              <h3>Track and withdraw</h3>
              <p>Monitor returns, affiliate commissions and request withdrawals when ready.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Packages</p>
            <h2>Available investment plans</h2>
          </div>
          <div className="card-grid four-col">
            {packages.map((pkg) => (
              <div className="package-card" key={pkg.name}>
                <div className="package-badge">{pkg.status}</div>
                <h3>{pkg.name}</h3>
                <p><strong>Investment:</strong> KZ {Number(pkg.min_amount ?? 0).toLocaleString()}</p>
                <p><strong>Duration:</strong> {pkg.duration_days} days</p>
                <p><strong>Daily return:</strong> KZ {Number(pkg.daily_return ?? 0).toLocaleString()}</p>
                <p><strong>Total:</strong> KZ {Number(pkg.total_return ?? 0).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section muted-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Affiliate</p>
            <h2>Invite and earn</h2>
          </div>
          <div className="affiliate-box">
            <div>
              <h3>Affiliate program</h3>
              <p>Each user receives a unique referral code and link. Earn 5% of every successful deposit generated by your referrals.</p>
            </div>
            <Link href="/register" className="btn btn-gold">Create Account</Link>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container two-col">
          <div>
            <p className="eyebrow">About GrowthCapital</p>
            <h2>Built for trust, growth and modern finance</h2>
            <p>
              GrowthCapital was created to bring transparency, discipline and performance to digital investment management.
              We combine secure account handling, configurable packages, affiliate opportunities and responsive financial tools.
            </p>
          </div>
          <div className="security-box">
            <ul>
              <li>Secure authentication</li>
              <li>Protected admin access</li>
              <li>Audit-ready records</li>
              <li>Responsive support</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section muted-section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2>Frequently asked questions</h2>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <h4>Is my information secure?</h4>
              <p>Yes. We use hashed passwords, secure session handling and role-based access to protect accounts.</p>
            </div>
            <div className="faq-item">
              <h4>Can I withdraw anytime?</h4>
              <p>Withdrawals are processed according to the platform rules and the current approval flow.</p>
            </div>
            <div className="faq-item">
              <h4>How do affiliate commissions work?</h4>
              <p>Every verified referral who invests triggers automatic commission generation based on platform configuration.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="brand-name">GrowthCapital</div>
            <p>Professional investment management with a premium digital experience.</p>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>About</li>
              <li>Packages</li>
              <li>Affiliate</li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li>Contact</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>support@growthcapital.com</li>
              <li>+244 000 000 000</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
