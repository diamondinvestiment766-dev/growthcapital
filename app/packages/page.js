import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { getPackages } from '@/lib/db';

export default async function PackagesPage() {
  const user = await requireUser();
  const packages = await getPackages();

  return (
    <main className="page-shell">
      <div className="container dashboard-wrap">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Investment Packages</p>
            <h1>Choose a package</h1>
          </div>
        </div>

        <div className="card-grid four-col">
          {packages.map((pkg) => (
            <div className="package-card" key={pkg.id}>
              <div className="package-badge">{pkg.status}</div>
              <h3>{pkg.name}</h3>
              <p><strong>Investment:</strong> KZ {Number(pkg.min_amount).toLocaleString()}</p>
              <p><strong>Duration:</strong> {pkg.duration_days} days</p>
              <p><strong>Daily return:</strong> KZ {Number(pkg.daily_return).toLocaleString()}</p>
              <p><strong>Total:</strong> KZ {Number(pkg.total_return).toLocaleString()}</p>
              <form action="/api/invest" method="POST" style={{ marginTop: 18 }}>
                <input type="hidden" name="package_id" value={pkg.id} />
                <button type="submit" className="btn btn-gold">Invest</button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
