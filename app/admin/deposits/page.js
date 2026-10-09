export default function AdminDepositsPage() {
  return (
    <main className="page-shell">
      <div className="container dashboard-wrap">
        <div className="panel-header"><div><p className="eyebrow">Admin</p><h1>Deposits</h1></div></div>
        <div className="panel">
          <table className="table">
            <thead><tr><th>ID</th><th>User</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
            <tbody><tr><td>DP-1001</td><td>Sample User</td><td>KZ 5000</td><td>IBAN</td><td><span className="tag pending">Pending</span></td></tr></tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
