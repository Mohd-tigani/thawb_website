'use client';
import { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartContext';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const collapseRef = useRef(null);

  // Close the mobile menu after an action
  const closeMobileMenu = useCallback(() => {
    if (collapseRef.current && collapseRef.current.classList.contains('show')) {
      const bsCollapse = window.bootstrap?.Collapse?.getInstance(collapseRef.current);
      if (bsCollapse) bsCollapse.hide();
    }
  }, []);

  const handleMobileSearch = useCallback(() => {
    closeMobileMenu();
    setTimeout(() => setSearchOpen(true), 200);
  }, [closeMobileMenu]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top mobile-navbar" style={{ backgroundColor: 'var(--secondary-color)' }}>
      <div className="container">
        {/* Brand — fullstop tight against the name */}
        <Link href="/" className="navbar-brand d-flex flex-column align-items-center lh-1">
          <span className="brand-arabic mb-1" style={{ fontSize: '2.2rem' }}>الثوب</span>
          <span>AL-THAWB<span className="text-gold" style={{ marginLeft: '1px' }}>.</span></span>
        </Link>

        {/* Hamburger toggle — only icon on mobile besides logo */}
        <button className="navbar-toggler border-0 ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarNav" ref={collapseRef}>

          {/* Navigation links */}
          <ul className="navbar-nav mx-auto gap-lg-3 mt-3 mt-lg-0">
            <li className="nav-item">
              <Link href="/" className={`nav-link mobile-nav-link ${pathname === '/' ? 'active text-gold fw-bold' : ''}`} onClick={closeMobileMenu}>Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/shop" className={`nav-link mobile-nav-link ${pathname === '/shop' ? 'active text-gold fw-bold' : ''}`} onClick={closeMobileMenu}>Shop</Link>
            </li>
            <li className="nav-item">
              <Link href="/customize" className={`nav-link mobile-nav-link ${pathname === '/customize' ? 'active text-gold fw-bold' : ''}`} onClick={closeMobileMenu}>Design Your Own</Link>
            </li>
          </ul>

          {/* Mobile-only: Search & Cart inside the menu */}
          <div className="d-lg-none mobile-menu-actions">
            <button
              type="button"
              className="mobile-menu-action-btn"
              onClick={handleMobileSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="18" height="18" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <span>Search</span>
            </button>
            <button
              type="button"
              className="mobile-menu-action-btn"
              data-bs-toggle="offcanvas"
              data-bs-target="#cartOffcanvas"
              aria-controls="cartOffcanvas"
              onClick={closeMobileMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="17" height="17" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
              </svg>
              <span>My Bag{totalItems > 0 && <span className="mobile-bag-count">{totalItems}</span>}</span>
            </button>
          </div>
        </div>

        {/* Desktop icons — only visible at lg+ */}
        <div className="d-none d-lg-flex align-items-center header-icons-container">
          <button type="button" className="btn btn-link text-dark p-0 border-0 bg-transparent" onClick={() => setSearchOpen(true)} aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-search header-icon" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
          <Link href="#" className="text-dark">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person header-icon-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
          </Link>
          <button type="button" className="btn btn-link text-dark position-relative p-0 border-0 bg-transparent text-decoration-none" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas" aria-controls="cartOffcanvas">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-bag header-icon-bag" viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
            </svg>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-gold header-badge">{totalItems}</span>
          </button>
        </div>
      </div>
      <SearchOverlay isOpen={searchOpen} onClose={closeSearch} />
    </nav>
  );
}
