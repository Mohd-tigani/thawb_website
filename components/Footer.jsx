import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4 g-lg-5">
          {/* Brand */}
          <div className="col-lg-3 col-md-6 col-12">
            <div className="footer-brand">
              <span className="brand-arabic d-block" style={{ fontSize: '1.5rem', color: '#fff' }}>الثوب</span>
              <h3 className="footer-brand-name">AL-THAWB<span className="text-gold">.</span></h3>
            </div>
            <p className="footer-tagline">Redefining traditional Arab menswear through impeccable tailoring and luxurious fabrics.</p>
          </div>

          {/* Shop */}
          <div className="col-lg-3 col-md-6 col-6">
            <h5 className="footer-heading">Shop</h5>
            <ul className="footer-links">
              <li><Link href="/shop" className="footer-link">All Products</Link></li>
              <li><Link href="/shop?category=emirati" className="footer-link">Kandoras</Link></li>
              <li><Link href="/shop?category=saudi" className="footer-link">Thawbs</Link></li>
              <li><Link href="/shop?category=kuwaiti" className="footer-link">Dishdashas</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-3 col-md-6 col-6">
            <h5 className="footer-heading">Support</h5>
            <ul className="footer-links">
              <li><Link href="#" className="footer-link">Size Guide</Link></li>
              <li><Link href="#" className="footer-link">Shipping & Returns</Link></li>
              <li><Link href="#" className="footer-link">Contact Us</Link></li>
              <li><Link href="#" className="footer-link">WhatsApp Us</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-lg-3 col-md-6 col-12">
            <h5 className="footer-heading">Connect</h5>
            <ul className="footer-links">
              <li><Link href="#" className="footer-link">Instagram</Link></li>
              <li><Link href="#" className="footer-link">TikTok</Link></li>
              <li><Link href="#" className="footer-link">Snapchat</Link></li>
            </ul>
          </div>
        </div>

        {/* Service badges & copyright */}
        <div className="footer-bottom">
          <div className="footer-services">
            <span>Free delivery across UAE</span>
            <span className="footer-service-dot">·</span>
            <span>Cash on delivery</span>
            <span className="footer-service-dot">·</span>
            <span>GCC shipping 3–5 days</span>
          </div>
          <p className="footer-copyright">&copy; 2026 AL-THAWB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
