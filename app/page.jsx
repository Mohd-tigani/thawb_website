import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <header className="hero-section">
        <Image
          src="/images/hero_kandora.png"
          alt="Premium Kandora"
          fill
          priority
          sizes="100vw"
          className="hero-image"
          style={{ objectFit: 'cover' }}
        />
        <div className="hero-content">
          <h5 className="text-uppercase text-gold mb-3" style={{ letterSpacing: '3px' }}>The Heritage Collection</h5>
          <h1 className="display-3 mb-4">Elegance in Every Thread</h1>
          <p className="lead mb-5" style={{ fontWeight: '300' }}>Discover the finest selection of authentic, fully tailored menswear from across the Middle East. Meticulously crafted for the modern man.</p>
          <div className="hero-buttons">
            <Link href="/shop" className="btn btn-premium btn-lg me-3">Shop Collection</Link>
            <Link href="#categories" className="btn btn-outline-light btn-lg rounded-0 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>Discover More</Link>
          </div>
        </div>
      </header>

      {/* Featured Categories */}
      <section id="categories" className="py-5 my-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-gold text-uppercase" style={{ letterSpacing: '2px', fontSize: '0.85rem' }}>Curated Styles</span>
            <h2 className="display-5 mt-2">Shop by Region</h2>
            <div className="section-ornament mt-3"><span></span></div>
          </div>
          <div className="row g-4">
            {/* Emirate Kandora */}
            <div className="col-md-4">
              <Link href="/shop?category=emirati" className="category-card">
                <Image src="/images/emirati_white.png" alt="Emirati Kandora" fill sizes="(max-width: 768px) 100vw, 33vw" className="category-image" loading="lazy" style={{ objectFit: 'cover' }}/>
                <div className="category-overlay">
                  <h3 className="category-title">Emirati Kandora</h3>
                  <span className="category-subtitle">Collarless Elegance</span>
                </div>
              </Link>
            </div>
            {/* Saudi Thawb */}
            <div className="col-md-4">
              <Link href="/shop?category=saudi" className="category-card">
                <Image src="/images/saudi_beige.png" alt="Saudi Thawb" fill sizes="(max-width: 768px) 100vw, 33vw" className="category-image" loading="lazy" style={{ objectFit: 'cover' }}/>
                <div className="category-overlay">
                  <h3 className="category-title">Saudi Thawb</h3>
                  <span className="category-subtitle">Classic Distinction</span>
                </div>
              </Link>
            </div>
            {/* Kuwaiti Dishdasha */}
            <div className="col-md-4">
              <Link href="/shop?category=kuwaiti" className="category-card">
                <Image src="/images/kuwaiti_white.png" alt="Kuwaiti Dishdasha" fill sizes="(max-width: 768px) 100vw, 33vw" className="category-image" loading="lazy" style={{ objectFit: 'cover' }}/>
                <div className="category-overlay">
                  <h3 className="category-title">Kuwaiti Dishdasha</h3>
                  <span className="category-subtitle">Modern Tailoring</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="d-flex justify-content-between align-items-end mb-5 new-arrivals-header">
            <div>
              <h2 className="display-5 mb-0">New Arrivals</h2>
            </div>
            <Link href="/shop" className="text-dark text-uppercase fw-bold" style={{ letterSpacing: '1px', textDecoration: 'none' }}>View All &rarr;</Link>
          </div>
          <div className="row g-4">
             {/* Products map would go here, hardcoding 4 items based on original HTML */}
             {[
               { id: 1, name: 'Royal White Kandora', price: '250 AED', image: '/images/emirati_white.png' },
               { id: 2, name: 'Desert Beige Thawb', price: '285 AED', image: '/images/saudi_beige.png' },
               { id: 3, name: 'Midnight Black Dishdasha', price: '290 AED', image: '/images/kuwaiti_black.png' },
               { id: 4, name: 'Signature Omani Style', price: '310 AED', image: '/images/omani_beige.png' }
             ].map((product) => (
               <div key={product.id} className="col-md-3 col-sm-6">
                <div className="card product-card">
                  <div className="product-img-wrapper">
                    <Image src={product.image} alt={product.name} width={400} height={500} className="product-img" loading="lazy" style={{ objectFit: 'cover' }}/>
                    <div className="add-to-cart-overlay">
                      <Link href={`/product/${product.id}`} className="btn btn-outline-premium w-100">View Product</Link>
                    </div>
                  </div>
                  <Link href={`/product/${product.id}`} className="product-title">{product.name}</Link>
                  <p className="product-price">{product.price}</p>
                </div>
              </div>
             ))}
          </div>
        </div>
      </section>
    </>
  );
}
