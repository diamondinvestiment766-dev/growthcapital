import { cookies } from 'next/headers';
import { getAdminSession } from '@/lib/auth';
import { getDashboardStats } from '@/lib/db';
import Link from 'next/link';

export default async function AdminPage() {
  const admin = await getAdminSession();
  if (!admin) {
    return <main className="auth-shell"><div className="auth-card"><h1>Access denied</h1><Link href="/admin/login" className="btn btn-gold">Admin Login</Link></div></main>;
  }

  const stats = await getDashboardStats();

  return (
    <main className="page-shell">
      <div className="container dashboard-wrap">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>GrowthCapital Administration</h1>
          </div>
          <Link href="/api/admin/logout" className="btn btn-secondary">Logout</Link>
        </div>

        <div className="stat-grid">
          <div className="stat-card"><div className="stat-label">Total Users</div><div className="stat-value">{stats.total_users}</div></div>
          <div className="stat-card"><div className="stat-label">Active Users</div><div className="stat-value">{stats.active_users}</div></div>
          <div className="stat-card"><div className="stat-label">Suspended</div><div className="stat-value">{stats.suspended_users}</div></div>
          <div className="stat-card"><div className="stat-label">Deposited</div><div className="stat-value">KZ {Number(stats.total_deposited).toLocaleString()}</div></div>
          <div className="stat-card"><div className="stat-label">Withdrawn</div><div className="stat-value">KZ {Number(stats.total_withdrawn).toLocaleString()}</div></div>
          <div className="stat-card"><div className="stat-label">Currently Invested</div><div className="stat-value">KZ {Number(stats.total_invested).toLocaleString()}</div></div>
          <div className="stat-card"><div className="stat-label">Transactions</div><div className="stat-value">{stats.total_transactions}</div></div>
          <div className="stat-card"><div className="stat-label">Affiliate Commissions</div><div className="stat-value">KZ {Number(stats.affiliate_commissions).toLocaleString()}</div></div>
        </div>

        <div className="panel">
          <h3>Administrative panel</h3>
          <div className="cta-row">
            <Link href="/admin/users" className="btn btn-gold">Users</Link>
            <Link href="/admin/deposits" className="btn btn-secondary">Deposits</Link>
            <Link href="/admin/withdrawals" className="btn btn-secondary">Withdrawals</Link>
            <Link href="/admin/investments" className="btn btn-secondary">Investments</Link>
            <Link href="/admin/affiliates" className="btn btn-secondary">Affiliates</Link>
            <Link href="/admin/settings" className="btn btn-secondary">Settings</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
