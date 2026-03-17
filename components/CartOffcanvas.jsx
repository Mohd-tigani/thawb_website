'use client';

import Image from 'next/image';
import { useCart } from './CartContext';

export default function CartOffcanvas() {
  const { cart, removeItem, updateQty, totalItems, subtotal } = useCart();

  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel">
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title" id="cartOffcanvasLabel" style={{ fontFamily: 'var(--font-heading)' }}>
          Shopping Bag ({totalItems})
        </h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body d-flex flex-column">

        {cart.length === 0 ? (
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <p className="text-muted">Your bag is empty.</p>
          </div>
        ) : (
          <>
            {cart.map(item => (
              <div className="d-flex mb-4" key={item.id}>
                <div style={{ width: '80px', height: '100px', backgroundColor: '#f4f4f4', position: 'relative', flexShrink: 0 }}>
                  <Image src={item.image} alt={item.name} fill sizes="80px" style={{ objectFit: 'cover' }} />
                </div>
                <div className="ms-3 flex-grow-1">
                  <h6 className="mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{item.name}</h6>
                  {item.details && (
                    <p className="text-muted mb-1" style={{ fontSize: '0.8rem' }}>{item.details}</p>
                  )}
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="border d-flex align-items-center" style={{ width: '80px' }}>
                      <button
                        className="btn btn-sm px-2 py-0 border-0"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                      >-</button>
                      <span className="px-2" style={{ fontSize: '0.85rem' }}>{item.qty}</span>
                      <button
                        className="btn btn-sm px-2 py-0 border-0"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                      >+</button>
                    </div>
                    <span className="text-gold fw-bold" style={{ fontSize: '0.9rem' }}>{item.price * item.qty} AED</span>
                  </div>
                  <button
                    className="btn btn-link text-muted p-0 mt-2 text-decoration-underline"
                    style={{ fontSize: '0.75rem' }}
                    onClick={() => removeItem(item.id)}
                  >Remove</button>
                </div>
              </div>
            ))}
          </>
        )}

        {cart.length > 0 && (
          <div className="mt-auto pt-3 border-top">
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Subtotal</span>
              <span className="fw-bold">{subtotal} AED</span>
            </div>
            <p className="text-muted" style={{ fontSize: '0.75rem' }}>Shipping and taxes calculated at checkout.</p>
            <button className="btn btn-premium w-100">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}
