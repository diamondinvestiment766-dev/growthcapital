import { requireUser } from '@/lib/auth';

export default async function WithdrawPage() {
  const user = await requireUser();

  return (
    <main className="page-shell">
      <div className="container dashboard-wrap">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Withdraw</p>
            <h1>Request withdrawal</h1>
          </div>
        </div>

        <div className="panel">
          <form action="/api/withdraw" method="POST" className="form-grid" style={{ maxWidth: 700 }}>
            <div className="field">
              <label htmlFor="amount">Withdraw Amount (KZ)</label>
              <input id="amount" name="amount" type="number" min="1" step="0.01" required />
            </div>
            <div className="field">
              <label htmlFor="method">Payment Method</label>
              <select id="method" name="method" required>
                <option value="BANK_TRANSFER">Bank Transfer</option>
                <option value="MOBILE_MONEY">Multicaixa Express</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="account_name">Name</label>
              <input id="account_name" name="account_name" type="text" required />
            </div>
            <div className="field">
              <label htmlFor="bank">Bank</label>
              <input id="bank" name="bank" type="text" />
            </div>
            <div className="field">
              <label htmlFor="iban">IBAN</label>
              <input id="iban" name="iban" type="text" />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone / Receiving Account</label>
              <input id="phone" name="phone" type="text" required />
            </div>
            <div className="field">
              <label htmlFor="notes">Observation (optional)</label>
              <textarea id="notes" name="notes"></textarea>
            </div>

            <div className="panel" style={{ marginBottom: 0 }}>
              <h3>Withdrawal Summary</h3>
              <p>Withdrawal Amount: KZ 0.00</p>
              <p>Fee: KZ 0.00</p>
              <p>Amount to Receive: KZ 0.00</p>
            </div>

            <button type="submit" className="btn btn-gold">Confirm Withdrawal</button>
          </form>
        </div>
      </div>
    </main>
  );
}
