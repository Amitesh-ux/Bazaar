import { useState } from 'react';
import './Home.css';

const shops = [
  {
    id: 1, name: 'Sudarshan Family Store', category: 'Sarees',
    area: 'BVK Iyengar Rd', open: true, emoji: '🥻',
    color: '#E8C99A', phone: '+91 80 4113 9590',
    products: [
      { id: 101, name: 'Kanjeevaram', price: 1200, emoji: '🥻' },
      { id: 102, name: 'Mysore Silk',  price: 850,  emoji: '💜' },
      { id: 103, name: 'Cotton',       price: 450,  emoji: '🧣' },
      { id: 104, name: 'Banarasi',     price: 2400, emoji: '✨' },
    ]
  },
  {
    id: 2, name: 'Balepet Bangles', category: 'Bangles',
    area: 'Balepet', open: true, emoji: '💍',
    color: '#C8E6C0', phone: '+91 80 2228 1100',
    products: [
      { id: 201, name: 'Glass set',   price: 180, emoji: '🔮' },
      { id: 202, name: 'Lac bangles', price: 320, emoji: '💍' },
      { id: 203, name: 'Gold-plated', price: 650, emoji: '✨' },
    ]
  },
  {
    id: 3, name: 'Avenue Road Books', category: 'Books',
    area: 'Avenue Rd', open: false, emoji: '📚',
    color: '#FDE5C0', phone: '+91 80 2286 0000',
    products: [
      { id: 301, name: 'Textbooks',  price: 60, emoji: '📚' },
      { id: 302, name: 'Notebooks',  price: 25, emoji: '📝' },
    ]
  },
  {
    id: 4, name: 'Raja Jewellers', category: 'Jewellery',
    area: 'Nagarathpete', open: true, emoji: '💎',
    color: '#E8D5F5', phone: '+91 80 2224 5678',
    products: [
      { id: 401, name: 'Gold chain',  price: 12000, emoji: '📿' },
      { id: 402, name: 'Silver ring', price: 800,   emoji: '💍' },
      { id: 403, name: 'Earrings',    price: 1500,  emoji: '✨' },
    ]
  },
  {
    id: 5, name: 'Thindi Beedi Snacks', category: 'Food',
    area: 'Nagarathpete', open: true, emoji: '🍱',
    color: '#FFE0CC', phone: '+91 98 4512 3456',
    products: [
      { id: 501, name: 'Masala Dosa',   price: 60, emoji: '🫓' },
      { id: 502, name: 'Samosa',        price: 20, emoji: '🥟' },
      { id: 503, name: 'Filter Coffee', price: 30, emoji: '☕' },
    ]
  },
];

const categories = ['All', 'Sarees', 'Bangles', 'Jewellery', 'Books', 'Food'];

export default function Home({ navigate, cart }) {
  const [activeCat, setActiveCat] = useState('All');

  const filtered = activeCat === 'All' ? shops : shops.filter(s => s.category === activeCat);
  const cartCount = cart?.reduce((s, i) => s + i.qty, 0) ?? 0;

  return (
    <div className="screen">
      <div className="statusbar">
        <span>9:41</span>
        <span className="statusbar-title">ChickPet Bazaar</span>
        <span className="cart-icon" onClick={() => navigate('cart')}>
          🛒 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </span>
      </div>

      <div className="hdr">
        <div>
          <h1 className="hdr-title">Chickpet Bazaar</h1>
          <p className="hdr-sub">📍 Chickpet, Bengaluru</p>
        </div>
      </div>

      <div className="search-bar">
        <div className="search-inner">🔍 Search sarees, bangles, books…</div>
      </div>

      <div className="cats">
        {categories.map(cat => (
          <button
            key={cat}
            className={`cat-chip ${activeCat === cat ? 'active' : ''}`}
            onClick={() => setActiveCat(cat)}
          >{cat}</button>
        ))}
      </div>

      <div className="scroll-area">
        {filtered.map(shop => (
          <div
            key={shop.id}
            className="shop-card"
            onClick={() => navigate('shopDetail', { shop })}
          >
            <div className="shop-img" style={{ background: `linear-gradient(135deg, ${shop.color}, ${shop.color}aa)` }}>
              <span className="shop-emoji">{shop.emoji}</span>
              <span className={`badge ${shop.open ? 'badge-open' : 'badge-closed'}`}>
                {shop.open ? 'Open' : 'Closed'}
              </span>
            </div>
            <div className="shop-info">
              <div className="shop-name">{shop.name}</div>
              <div className="shop-sub">{shop.category} · {shop.area}</div>
            </div>
            <div className="prod-strip">
              {shop.products.map(p => (
                <div
                  key={p.id}
                  className="prod-item"
                  onClick={e => {
                    e.stopPropagation(); // don't trigger shop card tap
                    navigate('productDetail', { product: p, shop });
                  }}
                >
                  <span className="prod-emoji">{p.emoji}</span>
                  <div className="prod-price">₹{p.price.toLocaleString()}</div>
                  <div className="prod-name">{p.name}</div>
                </div>
              ))}
            </div>
            <div className="shop-actions">
              <a
                href={`tel:${shop.phone}`}
                className="btn-action btn-call"
                onClick={e => e.stopPropagation()}
              >📞 Call</a>
              <button
                className={`btn-action btn-order ${!shop.open ? 'disabled' : ''}`}
                disabled={!shop.open}
                onClick={e => { e.stopPropagation(); navigate('shopDetail', { shop }); }}
              >🛒 Order</button>
              <button
                className="btn-action btn-map"
                onClick={e => { e.stopPropagation(); navigate('map'); }}
              >📍 Map</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-nav">
        <div className="nav-item active">🏠<span>Home</span></div>
        <div className="nav-item">🔍<span>Search</span></div>
        <div className="nav-item" onClick={() => navigate('map')}>📍<span>Map</span></div>
        <div className="nav-item" onClick={() => navigate('orders')}>🛒<span>Orders</span></div>
        <div className="nav-item">👤<span>Profile</span></div>
      </div>
    </div>
  );
}