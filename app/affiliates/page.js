import { requireUser } from '@/lib/auth';
import { getReferralInfo } from '@/lib/db';

export default async function AffiliatesPage() {
  const user = await requireUser();
  const referral = await getReferralInfo(user.id);

  return (
    <main className="page-shell">
      <div className="container dashboard-wrap">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Affiliates</p>
            <h1>Affiliate Dashboard</h1>
          </div>
        </div>

        <div className="stat-grid">
          <div className="stat-card"><div className="stat-label">Total invited</div><div className="stat-value">{referral.total_referred}</div></div>
          <div className="stat-card"><div className="stat-label">Active referrals</div><div className="stat-value">{referral.active_referred}</div></div>
          <div className="stat-card"><div className="stat-label">Generated volume</div><div className="stat-value">KZ {Number(referral.volume).toLocaleString()}</div></div>
          <div className="stat-card"><div className="stat-label">Eligible commission</div><div className="stat-value">KZ {Number(referral.eligible).toLocaleString()}</div></div>
        </div>

        <div className="panel">
          <h3>Personal referral link</h3>
          <div className="field">
            <input value={referral.link} readOnly />
          </div>
          <div className="cta-row">
            <button type="button" className="btn btn-gold">Copy Link</button>
            <button type="button" className="btn btn-secondary">Share</button>
          </div>
        </div>
      </div>
    </main>
  );
}
