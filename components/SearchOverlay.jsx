'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const allProducts = [
  { id: 1, name: 'Royal White Kandora', price: 250, category: 'emirati', image: '/images/emirati_white.png' },
  { id: 2, name: 'Desert Beige Thawb', price: 285, category: 'saudi', image: '/images/saudi_beige.png' },
  { id: 3, name: 'Midnight Black Dishdasha', price: 290, category: 'kuwaiti', image: '/images/kuwaiti_black.png' },
  { id: 4, name: 'Signature Omani Style', price: 310, category: 'omani', image: '/images/omani_beige.png' },
  { id: 5, name: 'Classic Kuwaiti Detail', price: 275, category: 'kuwaiti', image: '/images/kuwaiti_white.png' },
  { id: 6, name: 'Formal Emirati Kandora', price: 350, category: 'emirati', image: '/images/emirati_beige.png' },
];

const trending = [allProducts[0], allProducts[2], allProducts[5]];

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      // Delay to trigger CSS transition
      requestAnimationFrame(() => setVisible(true));
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e) => { if (e.key === 'Escape') handleClose(); };
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 300); // wait for fade-out
  }, [onClose]);

  const handleSearch = useCallback((value) => {
    setQuery(value);
    if (value.trim().length === 0) {
      setResults([]);
      return;
    }
    const lower = value.toLowerCase();
    setResults(
      allProducts.filter(p =>
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
      )
    );
  }, []);

  if (!isOpen) return null;

  const showResults = query.trim().length > 0;
  const displayItems = showResults ? results : trending;
  const sectionTitle = showResults
    ? (results.length > 0 ? `${results.length} result${results.length > 1 ? 's' : ''}` : null)
    : 'Trending Now';

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column"
      style={{
        zIndex: 1060,
        backgroundColor: visible ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0)',
        backdropFilter: visible ? 'blur(12px)' : 'blur(0px)',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
      onClick={handleClose}
    >
      {/* Close Button */}
      <div className="d-flex justify-content-end p-4">
        <button
          className="btn btn-link p-0 border-0"
          onClick={handleClose}
          aria-label="Close search"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.3s ease 0.1s',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z"/>
          </svg>
        </button>
      </div>

      {/* Search Content */}
      <div
        className="flex-grow-1 d-flex flex-column align-items-center px-3"
        style={{
          paddingTop: '5vh',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Large Search Input */}
        <div className="w-100" style={{ maxWidth: '600px' }}>
          <div className="position-relative mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22" height="22"
              fill="rgba(255,255,255,0.4)"
              viewBox="0 0 16 16"
              className="position-absolute top-50 translate-middle-y"
              style={{ left: '0' }}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="form-control border-0 rounded-0 shadow-none bg-transparent text-white ps-5 py-3 search-input-responsive"
              placeholder="Search products..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.5px',
                borderBottom: '1px solid rgba(255,255,255,0.15)',
              }}
            />
          </div>
          <p className="text-white mb-0" style={{ fontSize: '0.8rem', opacity: 0.35 }}>
            Press <kbd className="bg-transparent border border-secondary rounded px-1" style={{ fontSize: '0.7rem' }}>ESC</kbd> to close
          </p>
        </div>

        {/* Results / Trending Section */}
        <div className="w-100 mt-5" style={{ maxWidth: '600px' }}>
          {sectionTitle && (
            <p
              className="text-uppercase fw-bold mb-4"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '2px',
                color: 'var(--accent-gold)',
              }}
            >
              {sectionTitle}
            </p>
          )}

          {showResults && results.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-white mb-1" style={{ opacity: 0.6, fontSize: '1.1rem' }}>
                No products found for &ldquo;{query}&rdquo;
              </p>
              <p className="mb-0" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)' }}>
                Try searching by name or region — emirati, saudi, kuwaiti, omani
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {displayItems.map((product, i) => (
                <div className="col-6 col-sm-4" key={product.id}>
                  <Link
                    href={`/product/${product.id}`}
                    className="text-decoration-none d-block"
                    onClick={handleClose}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(15px)',
                      transition: `opacity 0.4s ease ${0.2 + i * 0.08}s, transform 0.4s ease ${0.2 + i * 0.08}s`,
                    }}
                  >
                    <div
                      className="position-relative mb-2 overflow-hidden"
                      style={{
                        paddingBottom: '130%',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: '2px',
                      }}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="200px"
                        style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        className="search-result-img"
                      />
                    </div>
                    <p
                      className="mb-0 text-white fw-medium"
                      style={{ fontSize: '0.85rem', fontFamily: 'var(--font-heading)' }}
                    >
                      {product.name}
                    </p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
                      {product.price} AED
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
