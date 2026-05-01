import { useState } from 'react';
import './ProductDetail.css';

export default function ProductDetail({ navigate, goBack, cart, addToCart, params }) {
  const { product, shop } = params;
  const [qty, setQty] = useState(1);

  const cartCount = cart?.reduce((s, i) => s + i.qty, 0) ?? 0;

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) {
      addToCart({ ...product, shopName: shop.name });
    }
    navigate('cart');
  }

  function handleGoogleMaps() {
    const query = encodeURIComponent(`${shop.name}, ${shop.area}, ${shop.locality}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  }

  return (
    <div className="pd-root">

      {/* ── Header ── */}
      <div className="pd-header">
        <span className="pd-back" onClick={goBack}>←</span>
        <span className="pd-wordmark">BATTE</span>
        <button className="pd-cart-btn" onClick={() => navigate('cart')}>
          🛒{cartCount > 0 && <span className="pd-cart-badge">{cartCount}</span>}
        </button>
      </div>

      {/* ── Hero ── */}
      <div className="pd-hero">
        <div className="pd-hero-img">
          <span className="pd-hero-emoji">{product.emoji}</span>
        </div>
        <div className="pd-price-tag">Rs {product.price.toLocaleString('en-IN')}</div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="pd-content">
        <div className="pd-product-name">{product.name}</div>

        <div className="pd-shop-row">
          <span className="pd-shop-link" onClick={goBack}>🏪 {shop.name}</span>
          <span className={`pd-badge ${shop.open ? 'pd-badge-open' : 'pd-badge-closed'}`}>
            {shop.open ? 'Open' : 'Closed'}
          </span>
        </div>

        <div className="pd-divider" />

        {/* Size / Material fields */}
        <div className="pd-meta-row">
          <span className="pd-meta-label">Size:</span>
          <span className="pd-meta-value">—</span>
        </div>
        <div className="pd-meta-row">
          <span className="pd-meta-label">Material:</span>
          <span className="pd-meta-value">—</span>
        </div>

        <div className="pd-divider" />

        {/* Qty selector */}
        {shop.open && (
          <div className="pd-qty-row">
            <span className="pd-qty-label">Quantity</span>
            <div className="pd-qty-ctrl">
              <button className="pd-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="pd-qty-val">{qty}</span>
              <button className="pd-qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>
        )}

        {shop.open && (
          <div className="pd-subtotal">
            Subtotal: <strong>Rs {(product.price * qty).toLocaleString('en-IN')}</strong>
          </div>
        )}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="pd-cta">
        {shop.open ? (
          <>
            <button
              className="pd-btn-secondary"
              onClick={() => { addToCart({ ...product, shopName: shop.name }); goBack(); }}
            >+ Add &amp; Browse</button>
            <button className="pd-btn-primary" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
          </>
        ) : (
          <div className="pd-closed-msg">This shop is currently closed</div>
        )}
        <button className="pd-btn-maps" onClick={handleGoogleMaps}>
          Google Maps to {shop.name} →
        </button>
      </div>

    </div>
  );
}