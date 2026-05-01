import './ShopInventory.css';

export default function ShopInventory({ navigate, goBack, resetTo, params = {}, cart, addToCart }) {
  const shop = params.shop || null;
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  if (!shop) {
    return (
      <div className="si-root">
        <div className="si-header">
          <span className="si-back" onClick={goBack}>←</span>
          <span className="si-wordmark">BATTE</span>
          <span />
        </div>
        <div className="si-empty">No shop selected.</div>
      </div>
    );
  }

  return (
    <div className="si-root">

      {/* ── Header ── */}
      <div className="si-header">
        <span className="si-back" onClick={goBack}>←</span>
        <span className="si-wordmark">BATTE</span>
        <button className="si-cart-btn" onClick={() => navigate('cart')}>
          🛒{cartCount > 0 && <span className="si-cart-badge">{cartCount}</span>}
        </button>
      </div>

      {/* ── Shop title bar ── */}
      <div className="si-shop-bar">
        <span className="si-shop-emoji">{shop.emoji}</span>
        <div className="si-shop-info">
          <span className="si-shop-name">{shop.name}</span>
          <span className="si-shop-area">📍 {shop.area}, {shop.locality}</span>
        </div>
        <span className={`si-badge ${shop.open ? 'si-badge-open' : 'si-badge-closed'}`}>
          {shop.open ? 'Open' : 'Closed'}
        </span>
      </div>

      {/* ── Product grid ── */}
      <div className="si-grid">
        {shop.products.map(product => {
          const inCart = cart.find(i => i.id === product.id);
          return (
            <div
              key={product.id}
              className="si-card"
              onClick={() => navigate('productDetail', { product, shop })}
            >
              <div className="si-card-img">
                <span className="si-card-emoji">{product.emoji}</span>
              </div>
              <div className="si-card-body">
                <span className="si-card-name">{product.name}</span>
                <span className="si-card-price">Rs {product.price.toLocaleString('en-IN')}</span>
                {inCart && (
                  <span className="si-in-cart">In cart ×{inCart.qty}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}