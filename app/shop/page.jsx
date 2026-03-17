'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '../../components/ProductCard';

const products = [
  { id: 1, name: 'Royal White Kandora', price: 250, category: 'emirati', color: '#ffffff', cuffs: 'plain', buttons: 'hidden', image: '/images/emirati_white.png' },
  { id: 2, name: 'Desert Beige Thawb', price: 285, category: 'saudi', color: '#F5F5DC', cuffs: 'shirt cuffs', buttons: 'exposed', image: '/images/saudi_beige.png' },
  { id: 3, name: 'Midnight Black Dishdasha', price: 290, category: 'kuwaiti', color: '#111111', cuffs: 'french cuffs', buttons: 'exposed', image: '/images/kuwaiti_black.png' },
  { id: 4, name: 'Signature Omani Style', price: 310, category: 'omani', color: '#F5F5DC', cuffs: 'plain', buttons: 'hidden', image: '/images/omani_beige.png' },
  { id: 5, name: 'Classic Kuwaiti Detail', price: 275, category: 'kuwaiti', color: '#ffffff', cuffs: 'shirt cuffs', buttons: 'zipper', image: '/images/kuwaiti_white.png' },
  { id: 6, name: 'Formal Emirati Kandora', price: 350, category: 'emirati', color: '#F5F5DC', cuffs: 'plain', buttons: 'hidden', image: '/images/emirati_beige.png' },
];

const categories = ['all', 'emirati', 'saudi', 'kuwaiti', 'omani'];

export default function Shop() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(urlCategory);
  const [sortBy, setSortBy] = useState('');
  const [activeColor, setActiveColor] = useState('');
  const [activeButtons, setActiveButtons] = useState('');
  const [activeCuffs, setActiveCuffs] = useState('');

  useEffect(() => {
    setActiveCategory(urlCategory);
  }, [urlCategory]);

  function handleCategoryChange(category) {
    setActiveCategory(category);
    const url = category === 'all' ? '/shop' : `/shop?category=${category}`;
    router.replace(url, { scroll: false });
  }

  const filtered = useMemo(() => {
    let result = activeCategory === 'all'
      ? [...products]
      : products.filter(p => p.category === activeCategory);

    if (activeColor) result = result.filter(p => p.color === activeColor);
    if (activeButtons) result = result.filter(p => p.buttons === activeButtons);
    if (activeCuffs) result = result.filter(p => p.cuffs === activeCuffs);

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [activeCategory, activeColor, activeButtons, activeCuffs, sortBy]);

  return (
    <>
      <div className="py-5 border-bottom" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="container text-center py-4">
          <h1 className="display-4 mb-3">The Collection</h1>
          <div className="section-ornament mt-2 mb-3"><span></span></div>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>Explore our complete range of premium traditional wear, filtered to perfection for your unique style.</p>
        </div>
      </div>

      <div className="container py-5 my-3">
        <div className="row g-5">
          {/* Sidebar Filters */}
          <div className="col-lg-3 shop-sidebar">
            <button className="btn btn-outline-dark w-100 d-lg-none mb-3 d-flex justify-content-between align-items-center rounded-0" type="button" data-bs-toggle="collapse" data-bs-target="#shopFilters" aria-expanded="false" aria-controls="shopFilters">
              <span className="text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>Filters</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/></svg>
            </button>
            <div id="shopFilters" className="collapse d-lg-block">
            <div className="sticky-top" style={{ top: '100px', zIndex: 1 }}>
              <div className="mb-4">
                <h5 className="mb-3 pb-2 border-bottom" style={{ fontFamily: 'var(--font-heading)' }}>Category</h5>
                <ul className="list-unstyled">
                  {categories.map(cat => (
                    <li className="mb-2" key={cat}>
                      <button
                        className={`btn btn-link p-0 text-decoration-none ${activeCategory === cat ? 'text-dark fw-bold' : 'text-muted'}`}
                        onClick={() => handleCategoryChange(cat)}
                        style={{ textTransform: 'capitalize' }}
                      >
                        {cat === 'all' ? 'All Styles' : cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h5 className="mb-3 pb-2 border-bottom" style={{ fontFamily: 'var(--font-heading)' }}>Color</h5>
                <div className="d-flex flex-wrap gap-2">
                  {[
                    { hex: '#ffffff', name: 'white' },
                    { hex: '#F5F5DC', name: 'beige' },
                    { hex: '#111111', name: 'black' },
                    { hex: '#000080', name: 'navy' },
                  ].map(c => (
                    <span 
                      key={c.hex}
                      className="border rounded-circle d-inline-block position-relative shadow-sm" 
                      onClick={() => setActiveColor(activeColor === c.hex ? '' : c.hex)}
                      style={{ 
                        width: '28px', height: '28px', backgroundColor: c.hex, cursor: 'pointer',
                        borderColor: activeColor === c.hex ? 'var(--accent-gold) !important' : '',
                        borderWidth: activeColor === c.hex ? '2px !important' : '1px'
                      }}>
                       {activeColor === c.hex && (
                         <span className="position-absolute top-50 start-50 translate-middle fw-bold" style={{fontSize: '14px', color: c.hex === '#ffffff' ? '#000' : '#fff'}}>✓</span>
                       )}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="mb-3 pb-2 border-bottom" style={{ fontFamily: 'var(--font-heading)' }}>Cuffs</h5>
                {['plain', 'shirt cuffs', 'french cuffs'].map(cuff => (
                  <div className="form-check mb-2" key={cuff}>
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id={`cuff-${cuff}`} 
                      checked={activeCuffs === cuff}
                      onChange={() => setActiveCuffs(activeCuffs === cuff ? '' : cuff)}
                    />
                    <label className="form-check-label text-muted text-capitalize" htmlFor={`cuff-${cuff}`}>{cuff}</label>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h5 className="mb-3 pb-2 border-bottom" style={{ fontFamily: 'var(--font-heading)' }}>Buttons</h5>
                {['hidden', 'exposed', 'zipper'].map(btn => (
                  <div className="form-check mb-2" key={btn}>
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id={`btn-${btn}`} 
                      checked={activeButtons === btn}
                      onChange={() => setActiveButtons(activeButtons === btn ? '' : btn)}
                    />
                    <label className="form-check-label text-muted text-capitalize" htmlFor={`btn-${btn}`}>{btn}</label>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
              <span className="text-muted">
                Showing {filtered.length} of {products.length} results
              </span>
              <select
                className="form-select border-0 w-auto text-muted shadow-none bg-transparent cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort by Default</option>
                <option value="name">Sort by Name</option>
                <option value="price-asc">Sort by Price: Low to High</option>
                <option value="price-desc">Sort by Price: High to Low</option>
              </select>
            </div>

            <div className="row g-4 mb-5">
              {filtered.length > 0 ? (
                filtered.map(product => (
                  <div className="col-md-4 col-sm-6" key={product.id}>
                    <ProductCard
                      title={product.name}
                      price={`${product.price} AED`}
                      imageSrc={product.image}
                      linkUrl={`/product/${product.id}`}
                    />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p className="text-muted fs-5">No products found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
