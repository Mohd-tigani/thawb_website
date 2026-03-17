'use client';

import { useCart } from './CartContext';

export default function CustomizerSummary({ config }) {
  const { addItem } = useCart();

  const basePrice = 250;
  let fabricSurcharge = 0;

  if(config.fabric === 'premium-cotton') fabricSurcharge = 150;
  if(config.fabric === 'japanese-crepe') fabricSurcharge = 200;
  if(config.fabric === 'winter-wool') fabricSurcharge = 250;

  const totalPrice = basePrice + fabricSurcharge;

  function handleAddToCart() {
    const fabricName = config.fabric.replace(/-/g, ' ');
    // Always convert to cm for the order record
    const toCm = (v) => config.unit === 'in' ? Math.round(v * 2.54) : v;
    const bl = toCm(config.bodyLength);
    const cw = toCm(config.chestWidth);
    const sl = toCm(config.sleeveLength);
    const sizeDetails = ` | Size: ${bl}cm(L) x ${cw}cm(W) x ${sl}cm(S)`;

    addItem({
      id: `custom-${config.style}-${config.fabric}-${config.color}-${config.buttons}-${config.cuffs}-${bl}-${cw}-${sl}`,
      name: `Custom ${config.style} (${config.color})`,
      price: totalPrice,
      image: `/images/${config.style}_${config.color}.png`,
      details: `Fabric: ${fabricName} | Color: ${config.color} | Cuffs: ${config.cuffs} | Buttons: ${config.buttons}${sizeDetails}`,
    });
  }

  const isComplete = config.bodyLength && config.chestWidth && config.sleeveLength;

  return (
    <div className="p-4 bg-light mt-auto border-top">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <span className="text-uppercase text-muted d-block mb-1" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Total Price</span>
          <h3 className="mb-0 text-gold fw-bold" style={{ fontFamily: 'var(--font-heading)' }}>
            {totalPrice} AED
          </h3>
        </div>
        <div className="text-end text-muted" style={{ fontSize: '0.8rem' }}>
          Base: {basePrice} AED<br/>
          Add-ons: +{fabricSurcharge} AED
        </div>
      </div>

      <button
        className={`btn btn-premium w-100 py-3 d-flex justify-content-between align-items-center ${!isComplete ? 'opacity-75' : ''}`}
        data-bs-toggle="offcanvas"
        data-bs-target="#cartOffcanvas"
        onClick={handleAddToCart}
        disabled={!isComplete}
      >
        <span>{isComplete ? 'Add Customized Order to Cart' : 'Select Measurements Required'}</span>
        <span>&rarr;</span>
      </button>
      <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: '0.75rem' }}>
        Custom tailored items ship in 7-10 business days.
      </p>
    </div>
  );
}
