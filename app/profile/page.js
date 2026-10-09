import { requireUser } from '@/lib/auth';

export default async function ProfilePage() {
  const user = await requireUser();

  return (
    <main className="page-shell">
      <div className="container dashboard-wrap">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Profile</p>
            <h1>My Profile</h1>
          </div>
        </div>

        <div className="panel">
          <form className="form-grid" style={{ maxWidth: 700 }}>
            <div className="field"><label>Name</label><input value={user.full_name} readOnly /></div>
            <div className="field"><label>Phone</label><input value={user.phone} readOnly /></div>
            <div className="field"><label>Email</label><input value={user.email} readOnly /></div>
            <div className="field"><label>User ID</label><input value={user.id} readOnly /></div>
            <div className="field"><label>Registration Date</label><input value={new Date(user.created_at).toLocaleDateString()} readOnly /></div>
            <div className="field"><label>Account Status</label><input value={user.status} readOnly /></div>
            <div className="field"><label>Referral Code</label><input value={user.referral_code ?? 'GC000000'} readOnly /></div>
            <div className="field"><label>Referral Link</label><input value={user.referral_link ?? 'https://growthcapital.com/register?ref=GC000000'} readOnly /></div>
            <button type="button" className="btn btn-gold">Save Changes</button>
          </form>
        </div>
      </div>
    </main>
  );
}
