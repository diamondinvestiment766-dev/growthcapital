export default function AdminUsersPage() {
  return (
    <main className="page-shell">
      <div className="container dashboard-wrap">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Users</h1>
          </div>
        </div>
        <div className="panel">
          <table className="table">
            <thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>Sample User</td><td>+244 900 000 000</td><td>user@example.com</td><td><span className="tag success">active</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
