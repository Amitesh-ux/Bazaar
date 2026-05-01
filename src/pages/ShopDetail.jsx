import React from 'react';
import './ShopDetail.css';

export default function ShopDetail({ navigate, goBack, cart, addToCart, params }) {
  const { shop } = params;
  const cartCount = cart?.reduce((s, i) => s + i.qty, 0) ?? 0;

  return (
    <div className="sd-root">
      {/* Status Bar */}
      <div className="sd-statusbar">
        <span>9:41</span>
        <span>ChickPet Bazaar</span>
        <span className="sd-cart-icon" onClick={() => navigate('cart')}>
          🛒 {cartCount > 0 && <span className="sd-cart-badge">{cartCount}</span>}
        </span>
      </div>

      {/* Header with back button */}
      <div className="sd-header" style={{ background: `linear-gradient(135deg, ${shop.color}, ${shop.color}aa)` }}>
        <button className="sd-back" onClick={goBack}>‹</button>
        <div className="sd-header-info">
          <div className="sd-shop-emoji">{shop.emoji}</div>
          <div>
            <div className="sd-shop-name">{shop.name}</div>
            <div className="sd-shop-meta">{shop.category} · {shop.area}</div>
          </div>
        </div>
        <div className="sd-header-actions">
          <span className={`sd-status-badge ${shop.open ? 'sd-open' : 'sd-closed'}`}>
            {shop.open ? '🟢 Open' : '🔴 Closed'}
          </span>
          <a href={`tel:${shop.phone}`} className="sd-call-btn">📞 Call</a>
        </div>
      </div>

      {/* Product Grid */}
      <div className="sd-content">
        <div className="sd-section-title">Products</div>
        <div className="sd-grid">
          {shop.products.map(p => {
            const inCart = cart?.find(i => i.id === p.id);
            return (
              <div
                key={p.id}
                className="sd-product-card"
                onClick={() => navigate('productDetail', { product: p, shop })}
              >
                <div className="sd-product-emoji-wrap">
                  <span className="sd-product-emoji">{p.emoji}</span>
                </div>
                <div className="sd-product-name">{p.name}</div>
                <div className="sd-product-price">₹{p.price.toLocaleString('en-IN')}</div>
                <button
                  className={`sd-add-btn ${!shop.open ? 'sd-add-btn--disabled' : ''} ${inCart ? 'sd-add-btn--in-cart' : ''}`}
                  disabled={!shop.open}
                  onClick={e => {
                    e.stopPropagation();
                    addToCart({ ...p, shopName: shop.name });
                  }}
                >
                  {inCart ? `✓ ${inCart.qty} in cart` : '+ Add'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="sd-bottom-nav">
        <div className="sd-nav-item" onClick={() => navigate('home')}>🏠<span>Home</span></div>
        <div className="sd-nav-item">🔍<span>Search</span></div>
        <div className="sd-nav-item" onClick={() => navigate('map')}>📍<span>Map</span></div>
        <div className="sd-nav-item" onClick={() => navigate('orders')}>🛒<span>Orders</span></div>
        <div className="sd-nav-item">👤<span>Profile</span></div>
      </div>
    </div>
  );
}