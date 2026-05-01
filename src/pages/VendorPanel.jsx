import React, { useState } from 'react';
import './VendorPanel.css';

const initialProducts = [
  { id: 1, name: 'Kanjivaram Silk Saree', price: 4500, stock: true,  emoji: '🥻' },
  { id: 2, name: 'Cotton Printed Saree',  price: 850,  stock: true,  emoji: '🎨' },
  { id: 3, name: 'Bridal Lehenga',        price: 9200, stock: false, emoji: '👘' },
  { id: 4, name: 'Chanderi Dupatta',      price: 650,  stock: true,  emoji: '🧣' },
];

const initialOrders = [
  { id: 'ORD-201', customer: 'Meena R.',   items: ['Kanjivaram Silk Saree ×1'], total: 4500, status: 'new' },
  { id: 'ORD-202', customer: 'Suresh K.',  items: ['Cotton Printed Saree ×2'],  total: 1700, status: 'new' },
  { id: 'ORD-203', customer: 'Lakshmi V.', items: ['Chanderi Dupatta ×1', 'Cotton Printed Saree ×1'], total: 1500, status: 'accepted' },
];

export default function VendorPanel() {
  const [isOpen, setIsOpen]             = useState(true);
  const [products, setProducts]         = useState(initialProducts);
  const [orders, setOrders]             = useState(initialOrders);
  const [activeTab, setActiveTab]       = useState('orders');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct]     = useState({ name: '', price: '', emoji: '📦' });
  const [toast, setToast]               = useState('');

  const acceptedOrders = orders.filter(o => o.status === 'accepted');
  const todayOrders    = orders.length;
  const todayRevenue   = acceptedOrders.reduce((s, o) => s + o.total, 0);
  const pendingCount   = orders.filter(o => o.status === 'new').length;

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  function handleOrderAction(id, action) {
    setOrders(prev => prev.map(o =>
      o.id === id ? { ...o, status: action === 'accept' ? 'accepted' : 'declined' } : o
    ));
    showToast(action === 'accept' ? '✅ Order accepted!' : '❌ Order declined');
  }

  function toggleStock(id) {
    setProducts(prev => prev.map(p =>
      p.id === id ? { ...p, stock: !p.stock } : p
    ));
  }

  function handleAddProduct() {
    if (!newProduct.name.trim() || !newProduct.price) return;
    setProducts(prev => [...prev, {
      id: Date.now(),
      name: newProduct.name.trim(),
      price: parseInt(newProduct.price),
      stock: true,
      emoji: newProduct.emoji || '📦',
    }]);
    setNewProduct({ name: '', price: '', emoji: '📦' });
    setShowAddModal(false);
    showToast('🛍️ Product added!');
  }

  return (
    <div className="vp-root">
      {/* Header */}
      <div className="vp-header">
        <div className="vp-header-left">
          <div className="vp-shop-avatar">🥻</div>
          <div>
            <div className="vp-shop-name">Sudarshan Family Store</div>
            <div className="vp-shop-area">Chickpet Main Rd</div>
          </div>
        </div>
        <button
          className={`vp-toggle ${isOpen ? 'vp-toggle--open' : 'vp-toggle--closed'}`}
          onClick={() => { setIsOpen(p => !p); showToast(isOpen ? '🔴 Shop closed' : '🟢 Shop is now open!'); }}
        >
          {isOpen ? '🟢 Open' : '🔴 Closed'}
        </button>
      </div>

      {/* Stats Row */}
      <div className="vp-stats">
        <div className="vp-stat-card">
          <div className="vp-stat-val">{todayOrders}</div>
          <div className="vp-stat-label">Orders Today</div>
        </div>
        <div className="vp-stat-card vp-stat-card--accent">
          <div className="vp-stat-val">₹{todayRevenue.toLocaleString('en-IN')}</div>
          <div className="vp-stat-label">Revenue</div>
        </div>
        <div className="vp-stat-card">
          <div className="vp-stat-val">{pendingCount}</div>
          <div className="vp-stat-label">Pending</div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="vp-tabs">
        <button
          className={`vp-tab ${activeTab === 'orders' ? 'vp-tab--active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📬 Orders {pendingCount > 0 && <span className="vp-badge">{pendingCount}</span>}
        </button>
        <button
          className={`vp-tab ${activeTab === 'products' ? 'vp-tab--active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          🛍️ Products
        </button>
      </div>

      {/* Tab Content */}
      <div className="vp-content">

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="vp-orders">
            {orders.filter(o => o.status !== 'declined').length === 0 && (
              <div className="vp-empty">No orders yet today 📭</div>
            )}
            {orders.filter(o => o.status !== 'declined').map(order => (
              <div key={order.id} className={`vp-order-card ${order.status === 'new' ? 'vp-order-card--new' : ''}`}>
                <div className="vp-order-top">
                  <div>
                    <div className="vp-order-id">{order.id}</div>
                    <div className="vp-order-customer">👤 {order.customer}</div>
                  </div>
                  <div className={`vp-order-badge vp-order-badge--${order.status}`}>
                    {order.status === 'new' ? 'New' : 'Accepted'}
                  </div>
                </div>
                <div className="vp-order-items">
                  {order.items.map((item, i) => <div key={i} className="vp-order-item">• {item}</div>)}
                </div>
                <div className="vp-order-footer">
                  <div className="vp-order-total">₹{order.total.toLocaleString('en-IN')}</div>
                  {order.status === 'new' && (
                    <div className="vp-order-actions">
                      <button className="vp-btn-decline" onClick={() => handleOrderAction(order.id, 'decline')}>Decline</button>
                      <button className="vp-btn-accept"  onClick={() => handleOrderAction(order.id, 'accept')}>Accept</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="vp-products">
            <button className="vp-add-btn" onClick={() => setShowAddModal(true)}>＋ Add Product</button>
            {products.map(p => (
              <div key={p.id} className="vp-product-card">
                <div className="vp-product-emoji">{p.emoji}</div>
                <div className="vp-product-info">
                  <div className="vp-product-name">{p.name}</div>
                  <div className="vp-product-price">₹{p.price.toLocaleString('en-IN')}</div>
                </div>
                <div className="vp-stock-wrap">
                  <div className={`vp-stock-label ${p.stock ? 'vp-stock--in' : 'vp-stock--out'}`}>
                    {p.stock ? 'In Stock' : 'Out'}
                  </div>
                  <button
                    className={`vp-stock-toggle ${p.stock ? 'vp-stock-toggle--on' : 'vp-stock-toggle--off'}`}
                    onClick={() => toggleStock(p.id)}
                  >
                    <span className="vp-toggle-knob" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="vp-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="vp-modal" onClick={e => e.stopPropagation()}>
            <div className="vp-modal-title">Add New Product</div>
            <input
              className="vp-input"
              placeholder="Product name"
              value={newProduct.name}
              onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))}
            />
            <input
              className="vp-input"
              placeholder="Price (₹)"
              type="number"
              value={newProduct.price}
              onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))}
            />
            <input
              className="vp-input"
              placeholder="Emoji (e.g. 🧣)"
              value={newProduct.emoji}
              onChange={e => setNewProduct(p => ({ ...p, emoji: e.target.value }))}
            />
            <div className="vp-modal-actions">
              <button className="vp-btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="vp-btn-save"   onClick={handleAddProduct}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <div className="vp-toast">{toast}</div>}
    </div>
  );
}