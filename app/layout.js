import './globals.css';

export const metadata = {
  title: 'GrowthCapital | INVEST TODAY. GROW TOMORROW.',
  description: 'Professional investment platform for growth and wealth management.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}
