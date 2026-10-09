import { requireUser } from '@/lib/auth';
import { getSystemSettings } from '@/lib/db';

export default async function DepositPage() {
  const user = await requireUser();
  const settings = await getSystemSettings();

  return (
    <main className="page-shell">
      <div className="container dashboard-wrap">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Deposit</p>
            <h1>Fund your account</h1>
          </div>
        </div>

        <div className="panel">
          <div className="form-grid" style={{ maxWidth: 700 }}>
            <div className="field">
              <label>IBAN</label>
              <input value="0006 0000 82617036301 48" readOnly />
            </div>
            <div className="field">
              <label>Name</label>
              <input value="ADILSON JOSÉ MANUEL" readOnly />
            </div>
            <div className="field">
              <label>Multicaixa Express</label>
              <input value="932030376" readOnly />
            </div>

            <form action="/api/deposit" method="POST" encType="multipart/form-data" className="form-grid">
              <div className="field">
                <label htmlFor="amount">Amount in KZ</label>
                <input id="amount" name="amount" type="number" min="1" step="0.01" required />
              </div>
              <div className="field">
                <label htmlFor="method">Payment Method</label>
                <select id="method" name="method" required>
                  <option value="IBAN">IBAN</option>
                  <option value="MULTICAIXA">Multicaixa Express</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="proof">Upload proof</label>
                <input id="proof" name="proof" type="file" accept="image/*,.pdf" />
              </div>
              <button type="submit" className="btn btn-gold">Submit Deposit</button>
            </form>
          </div>
        </div>

        <div className="panel">
          <h3>Deposit Status</h3>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th>ID</th><th>Value</th><th>Method</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr><td colSpan="5">No deposits have been recorded yet.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
