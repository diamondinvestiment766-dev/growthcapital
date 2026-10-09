"use client";

export default function ErrorPage({ error, reset }) {
  return (
    <main className="auth-shell">
      <div className="auth-card">
        <div className="brand-name">GrowthCapital</div>
        <h1>500</h1>
        <p className="auth-subtitle">Something went wrong. Please try again later.</p>
        <button className="btn btn-gold" onClick={() => reset()}>Try again</button>
      </div>
    </main>
  );
}
