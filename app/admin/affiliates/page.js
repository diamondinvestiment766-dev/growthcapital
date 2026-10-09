export default function AdminAffiliatesPage() {
  return (
    <main className="page-shell">
      <div className="container dashboard-wrap">
        <div className="panel-header"><div><p className="eyebrow">Admin</p><h1>Affiliates</h1></div></div>
        <div className="panel">
          <div className="stat-grid">
            <div className="stat-card"><div className="stat-label">Total affiliates</div><div className="stat-value">12</div></div>
            <div className="stat-card"><div className="stat-label">New affiliates</div><div className="stat-value">4</div></div>
            <div className="stat-card"><div className="stat-label">Volume generated</div><div className="stat-value">KZ 120000</div></div>
          </div>
        </div>
      </div>
    </main>
  );
}
