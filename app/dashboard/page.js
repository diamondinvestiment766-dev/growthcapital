import Link from 'next/link';
import { getCurrentUser, requireUser } from '@/lib/auth';
import { getUserStats, getUserInvestments, getUserTransactions } from '@/lib/db';

export default async function DashboardPage() {
  const user = await requireUser();
  const stats = await getUserStats(user.id);
  const investments = await getUserInvestments(user.id);
  const transactions = await getUserTransactions(user.id);

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
            <Link href="/dashboard">Home</Link>
            <Link href="/packages">Invest</Link>
            <Link href="/deposit">Deposit</Link>
            <Link href="/withdraw">Withdraw</Link>
            <Link href="/packages">Packages</Link>
            <Link href="/affiliates">Affiliates</Link>
            <Link href="/history">History</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/api/logout" className="btn btn-gold">Logout</Link>
          </nav>
        </div>
      </header>

      <div className="container dashboard-wrap">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>Welcome, {user.full_name}</h1>
          </div>
        </div>

        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Available Balance</div>
            <div className="stat-value">KZ {Number(stats.balance ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Invested</div>
            <div className="stat-value">KZ {Number(stats.total_invested ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Earnings</div>
            <div className="stat-value">KZ {Number(stats.earnings ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Withdrawn</div>
            <div className="stat-value">KZ {Number(stats.total_withdrawn ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Active Investments</h3>
            <Link href="/packages" className="btn btn-secondary">Invest Now</Link>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Invested</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Status</th>
                  <th>Credited</th>
                </tr>
              </thead>
              <tbody>
                {investments.length ? investments.map((item) => (
                  <tr key={item.id}>
                    <td>{item.package_name}</td>
                    <td>KZ {Number(item.amount).toLocaleString()}</td>
                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                    <td>{new Date(item.end_date).toLocaleDateString()}</td>
                    <td><span className="tag success">{item.status}</span></td>
                    <td>KZ {Number(item.credited ?? 0).toLocaleString()}</td>
                  </tr>
                )) : (
                  <tr><td colSpan="6">No active investments yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Recent Transactions</h3>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length ? transactions.map((t) => (
                  <tr key={t.id}>
                    <td>{t.type}</td>
                    <td>KZ {Number(t.amount).toLocaleString()}</td>
                    <td>{new Date(t.created_at).toLocaleDateString()}</td>
                    <td><span className={`tag ${t.status === 'approved' ? 'success' : t.status === 'pending' ? 'pending' : 'danger'}`}>{t.status}</span></td>
                  </tr>
                )) : (
                  <tr><td colSpan="4">No transactions yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <nav className="mobile-nav">
        <div className="mobile-nav-inner">
          <Link href="/dashboard">Home</Link>
          <Link href="/packages">Invest</Link>
          <Link href="/deposit">Deposit</Link>
          <Link href="/withdraw">Withdraw</Link>
          <Link href="/profile">Profile</Link>
        </div>
      </nav>
    </main>
  );
}
