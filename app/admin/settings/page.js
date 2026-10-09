export default function AdminSettingsPage() {
  return (
    <main className="page-shell">
      <div className="container dashboard-wrap">
        <div className="panel-header"><div><p className="eyebrow">Admin</p><h1>System Settings</h1></div></div>
        <div className="panel">
          <div className="form-grid" style={{ maxWidth: 700 }}>
            <div className="field"><label>Platform Name</label><input defaultValue="GrowthCapital" /></div>
            <div className="field"><label>Currency</label><input defaultValue="KZ" /></div>
            <div className="field"><label>Commission Rate</label><input defaultValue="5%" /></div>
          </div>
        </div>
      </div>
    </main>
  );
}
