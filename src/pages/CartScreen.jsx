import { useState } from 'react';
import './CartScreen.css';

export default function CartScreen({ navigate, goBack, cart, addToCart, removeFromCart, decrementFromCart, clearCart }) {
  const [ordered, setOrdered] = useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);

  const byShop = cart.reduce((acc, item) => {
    const key = item.shopName || 'Unknown Shop';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  function handlePlaceOrder() {
    clearCart();
    setOrdered(true);
  }

  if (ordered) {
    return (
      <div className="cs-root">
        <div className="cs-header">
          <span className="cs-wordmark">BATTE</span>
          <span className="cs-home-icon" onClick={() => navigate('loading')}>🏠</span>
        </div>
        <div className="cs-success">
          <div className="cs-success-icon">🎉</div>
          <div className="cs-success-title">Order Placed!</div>
          <div className="cs-success-sub">Your order has been sent to the shop. You'll get a confirmation shortly.</div>
          <button className="cs-btn-primary" onClick={() => navigate('cities')}>Back to Home</button>
          <button className="cs-btn-secondary" onClick={() => navigate('orders')}>View Orders</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cs-root">
      <div className="cs-header">
        <span className="cs-back" onClick={goBack}>←</span>
        <span className="cs-wordmark">BATTE</span>
        <span className="cs-home-icon" onClick={() => navigate('loading')}>🏠</span>
      </div>

      <div className="cs-toolbar">
        <span className="cs-title">Your Cart</span>
        {cart.length > 0 && (
          <button className="cs-clear" onClick={clearCart}>Clear</button>
        )}
      </div>

      {cart.length === 0 && (
        <div className="cs-empty">
          <div className="cs-empty-icon">🛒</div>
          <div className="cs-empty-text">Your cart is empty</div>
          <button className="cs-btn-primary" onClick={() => navigate('cities')}>Browse Shops</button>
        </div>
      )}

      {cart.length > 0 && (
        <div className="cs-content">
          {Object.entries(byShop).map(([shopName, items]) => (
            <div key={shopName} className="cs-shop-group">
              <div className="cs-shop-label">🏪 {shopName}</div>
              {items.map(item => (
                <div key={item.id} className="cs-item">
                  <div className="cs-item-emoji">{item.emoji}</div>
                  <div className="cs-item-info">
                    <div className="cs-item-name">{item.name}</div>
                    <div className="cs-item-price">₹{item.price.toLocaleString('en-IN')} each</div>
                  </div>
                  <div className="cs-qty-ctrl">
                    <button className="cs-qty-btn" onClick={() => decrementFromCart(item.id)}>−</button>
                    <span className="cs-qty-val">{item.qty}</span>
                    <button className="cs-qty-btn" onClick={() => addToCart({ ...item })}>+</button>
                  </div>
                  <div className="cs-item-subtotal">₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                </div>
              ))}
            </div>
          ))}

          <div className="cs-summary">
            <div className="cs-summary-row">
              <span>Items ({itemCount})</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="cs-summary-row">
              <span>Delivery</span>
              <span className="cs-free">FREE</span>
            </div>
            <div className="cs-divider" />
            <div className="cs-summary-row cs-summary-total">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <div className="cs-cta">
          <button className="cs-btn-primary" onClick={handlePlaceOrder}>
            Place Order · ₹{total.toLocaleString('en-IN')}
          </button>
        </div>
      )}
    </div>
  );
}