import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Script from 'next/script';
import { Playfair_Display } from 'next/font/google';
import Providers from '../components/Providers';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartOffcanvas from '../components/CartOffcanvas';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata = {
  title: 'AL-THAWB | Premium Arab Menswear',
  description: 'Redefining traditional Arab menswear through impeccable tailoring, luxurious fabrics, and uncompromising attention to detail.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair.variable} data-scroll-behavior="smooth">
      <head>
        {/* Font is now loaded via next/font — no render-blocking <link> needed */}
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartOffcanvas />
        </Providers>
        <Script src="/bootstrap.bundle.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
