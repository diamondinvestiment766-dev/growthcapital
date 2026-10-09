export default function AdminInvestmentsPage() {
  return (
    <main className="page-shell">
      <div className="container dashboard-wrap">
        <div className="panel-header"><div><p className="eyebrow">Admin</p><h1>Investments</h1></div></div>
        <div className="panel">
          <table className="table">
            <thead><tr><th>User</th><th>Package</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody><tr><td>Sample User</td><td>Starter</td><td>KZ 5000</td><td><span className="tag success">Active</span></td></tr></tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
