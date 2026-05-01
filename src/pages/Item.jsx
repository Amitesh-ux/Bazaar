import { useState } from 'react';
import './Item.css';

export default function Item({ navigate, goBack, params, addToCart }) {
  const { product, shop } = params || {};
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    for (let i = 0; i < qty; i++) addToCart({ ...product, shopId: shop?.id, shopName: shop?.name });
    setAdded(true);
    setTimeout(() => navigate('cart'), 800);
  }

  return (
    <div className="item-root">
      <div className="item-header">
        <span className="item-back" onClick={goBack}>← </span>
        <span className="item-wordmark">BATTE</span>
        <span className="item-home-icon" onClick={() => navigate('loading')}>🏠</span>
      </div>

      <div className="item-image">
        <span className="item-emoji">{product?.emoji || '🛍'}</span>
      </div>

      <div className="item-body">
        <div className="item-title-row">
          <span className="item-name">{product?.name}</span>
          <span className="item-price">₹{product?.price?.toLocaleString()}</span>
        </div>
        <div className="item-shop-row">
          <span className="item-shop-name">{shop?.name}</span>
          <span className={`item-badge ${shop?.open ? 'item-open' : 'item-closed'}`}>
            {shop?.open ? 'Open' : 'Closed'}
          </span>
        </div>

        <div className="item-divider" />

        <p className="item-details-label">Product Details</p>
        <p className="item-details-text">
          Sourced directly from local artisans in {shop?.area || 'Chickpet'}.
          Authentic handcrafted quality. Price is per unit.
        </p>

        <div className="item-divider" />

        <div className="item-qty-row">
          <span className="item-qty-label">Qty</span>
          <div className="item-qty-ctrl">
            <button className="item-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span className="item-qty-val">{qty}</span>
            <button className="item-qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
          </div>
          <span className="item-total">₹{(product?.price * qty).toLocaleString()}</span>
        </div>
      </div>

      <div className="item-footer">
        <button
          className={`item-add-btn ${added ? 'item-add-done' : ''}`}
          onClick={handleAdd}
          disabled={added || !shop?.open}
        >
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}