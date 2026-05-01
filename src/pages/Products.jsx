import { useState } from 'react';
import './Products.css';

const shopProducts = {
  1: [
    { id: 101, name: 'Kanjeevaram', price: 1200, emoji: '🥻', category: 'Sarees' },
    { id: 102, name: 'Mysore Silk',  price: 850,  emoji: '💜', category: 'Sarees' },
    { id: 103, name: 'Cotton Saree', price: 450,  emoji: '🧣', category: 'Sarees' },
    { id: 104, name: 'Banarasi',     price: 2400, emoji: '✨', category: 'Sarees' },
  ],
  2: [
    { id: 201, name: 'Glass Set',    price: 180, emoji: '🔮', category: 'Bangles' },
    { id: 202, name: 'Lac Bangles',  price: 320, emoji: '💍', category: 'Bangles' },
    { id: 203, name: 'Gold-plated',  price: 650, emoji: '✨', category: 'Bangles' },
  ],
  3: [
    { id: 301, name: 'Textbooks',  price: 60, emoji: '📚', category: 'Books' },
    { id: 302, name: 'Notebooks',  price: 25, emoji: '📝', category: 'Books' },
  ],
  4: [
    { id: 401, name: 'Gold Chain',  price: 12000, emoji: '📿', category: 'Jewellery' },
    { id: 402, name: 'Silver Ring', price: 800,   emoji: '💍', category: 'Jewellery' },
    { id: 403, name: 'Earrings',    price: 1500,  emoji: '✨', category: 'Jewellery' },
  ],
  5: [
    { id: 501, name: 'Masala Dosa',    price: 60, emoji: '🫓', category: 'Food' },
    { id: 502, name: 'Samosa',         price: 20, emoji: '🥟', category: 'Food' },
    { id: 503, name: 'Filter Coffee',  price: 30, emoji: '☕', category: 'Food' },
  ],
  6: [
    { id: 601, name: 'Mysore Silk',    price: 1100, emoji: '🥻', category: 'Sarees' },
    { id: 602, name: 'Printed Cotton', price: 550,  emoji: '🧵', category: 'Sarees' },
  ],
  7: [
    { id: 701, name: 'Notebooks',    price: 30, emoji: '📝', category: 'Stationery' },
    { id: 702, name: 'Sketch Pens',  price: 45, emoji: '🖊',  category: 'Stationery' },
  ],
};

export default function Products({ navigate, params, addToCart }) {
  const shop = params?.shop;
  const products = shopProducts[shop?.id] || [];
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const [activeCat, setActiveCat] = useState('All');

  const filtered = activeCat === 'All' ? products : products.filter(p => p.category === activeCat);

  return (
    <div className="prod-root">
      <div className="prod-header">
        <span className="prod-wordmark">BATTE</span>
        <span className="prod-home-icon" onClick={() => navigate('loading')}>🏠</span>
      </div>

      <div className="prod-shop-bar">
        <span className="prod-shop-name">{shop?.name || 'Shop'}</span>
        <span className={`prod-status ${shop?.open ? 'prod-open' : 'prod-closed'}`}>
          {shop?.open ? 'Open' : 'Closed'}
        </span>
      </div>

      <div className="prod-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`prod-chip ${activeCat === cat ? 'prod-chip-active' : ''}`}
            onClick={() => setActiveCat(cat)}
          >{cat}</button>
        ))}
        <button className="prod-chip prod-chip-inactive">Size</button>
        <button className="prod-chip prod-chip-inactive">Material</button>
      </div>

      <div className="prod-grid">
        {filtered.map(product => (
          <div
            key={product.id}
            className="prod-card"
            onClick={() => navigate('item', { product, shop })}
          >
            <span className="prod-card-emoji">{product.emoji}</span>
            <span className="prod-card-name">{product.name}</span>
            <span className="prod-card-price">₹{product.price.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}