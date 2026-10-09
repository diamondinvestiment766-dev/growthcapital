import { requireUser } from '@/lib/auth';
import { getUserTransactions } from '@/lib/db';

export default async function HistoryPage() {
  const user = await requireUser();
  const transactions = await getUserTransactions(user.id);

  return (
    <main className="page-shell">
      <div className="container dashboard-wrap">
        <div className="panel-header">
          <div>
            <p className="eyebrow">History</p>
            <h1>Transaction History</h1>
          </div>
        </div>

        <div className="panel">
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th>ID</th><th>Type</th><th>Amount</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {transactions.length ? transactions.map((item) => (
                  <tr key={item.id}><td>{item.id}</td><td>{item.type}</td><td>KZ {Number(item.amount).toLocaleString()}</td><td>{new Date(item.created_at).toLocaleDateString()}</td><td><span className={`tag ${item.status === 'approved' ? 'success' : item.status === 'pending' ? 'pending' : 'danger'}`}>{item.status}</span></td></tr>
                )) : <tr><td colSpan="5">No history yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
