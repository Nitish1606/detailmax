import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Detailmax Premium | Ceramic Coating & Paint Protection Film',
  description: 'Detailmax — The pinnacle of automotive protection. Expert ceramic coatings, PPF installation, and bespoke detailing services for discerning owners.',
  keywords: 'ceramic coating, paint protection film, PPF, car detailing, luxury car care, Detailmax',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div style={{ minHeight: '80vh' }}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}