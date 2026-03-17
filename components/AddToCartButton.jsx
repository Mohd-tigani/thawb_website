'use client';

import { useCart } from './CartContext';

export default function AddToCartButton({ product }) {
  const { addItem } = useCart();

  function handleClick() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  }

  return (
    <button
      type="button"
      className="btn btn-premium w-100 mb-3 py-3"
      data-bs-toggle="offcanvas"
      data-bs-target="#cartOffcanvas"
      onClick={handleClick}
    >
      Add to Cart
    </button>
  );
}
