import { useState } from 'react';
import './ProductShops.css';

const shops = [
  { id: 1, name: 'Sudarshan Family Store', category: 'Sarees',    area: 'BVK Iyengar Rd',  locality: 'Chickpet',     open: true,  emoji: '🥻', phone: '+91 80 4113 9590',
    products: [
      { id: 101, name: 'Kanjeevaram',  price: 1200, emoji: '🥻', category: 'Sarees' },
      { id: 102, name: 'Mysore Silk',  price: 850,  emoji: '💜', category: 'Sarees' },
      { id: 103, name: 'Cotton Saree', price: 450,  emoji: '🧣', category: 'Sarees' },
      { id: 104, name: 'Banarasi',     price: 2400, emoji: '✨', category: 'Sarees' },
    ]},
  { id: 2, name: 'Balepet Bangles',        category: 'Bangles',   area: 'Balepet',          locality: 'Balepet',      open: true,  emoji: '💍', phone: '+91 80 2228 1100',
    products: [
      { id: 201, name: 'Glass Set',    price: 180, emoji: '🔮', category: 'Bangles' },
      { id: 202, name: 'Lac Bangles',  price: 320, emoji: '💍', category: 'Bangles' },
      { id: 203, name: 'Gold-plated',  price: 650, emoji: '✨', category: 'Bangles' },
    ]},
  { id: 3, name: 'Avenue Road Books',      category: 'Books',     area: 'Avenue Rd',        locality: 'Cubbonpet',    open: false, emoji: '📚', phone: '+91 80 2286 0000',
    products: [
      { id: 301, name: 'Textbooks',    price: 60,  emoji: '📚', category: 'Books' },
      { id: 302, name: 'Notebooks',    price: 25,  emoji: '📝', category: 'Books' },
    ]},
  { id: 4, name: 'Raja Jewellers',         category: 'Jewellery', area: 'Nagarathpete',     locality: 'Nagarathpete', open: true,  emoji: '💎', phone: '+91 80 2224 5678',
    products: [
      { id: 401, name: 'Gold Chain',   price: 12000, emoji: '📿', category: 'Jewellery' },
      { id: 402, name: 'Silver Ring',  price: 800,   emoji: '💍', category: 'Jewellery' },
      { id: 403, name: 'Earrings',     price: 1500,  emoji: '✨', category: 'Jewellery' },
    ]},
  { id: 5, name: 'Thindi Beedi Snacks',    category: 'Food',      area: 'Nagarathpete',     locality: 'Nagarathpete', open: true,  emoji: '🍱', phone: '+91 98 4512 3456',
    products: [
      { id: 501, name: 'Masala Dosa',   price: 60, emoji: '🫓', category: 'Food' },
      { id: 502, name: 'Samosa',        price: 20, emoji: '🥟', category: 'Food' },
      { id: 503, name: 'Filter Coffee', price: 30, emoji: '☕', category: 'Food' },
    ]},
  { id: 6, name: 'Chickpet Silk House',    category: 'Sarees',    area: 'Chickpet Main',    locality: 'Chickpet',     open: true,  emoji: '🥻', phone: '+91 98 1234 5678',
    products: [
      { id: 601, name: 'Mysore Silk',    price: 1100, emoji: '🥻', category: 'Sarees' },
      { id: 602, name: 'Printed Cotton', price: 550,  emoji: '🧵', category: 'Sarees' },
    ]},
  { id: 7, name: 'Sulthanpete Stationery', category: 'Books',     area: 'Sultanpete',       locality: 'Sultanpete',   open: false, emoji: '📝', phone: '+91 98 9876 5432',
    products: [
      { id: 701, name: 'Notebooks',   price: 30, emoji: '📝', category: 'Stationery' },
      { id: 702, name: 'Sketch Pens', price: 45, emoji: '🖊',  category: 'Stationery' },
    ]},
];

function getMatches(query, sort) {
  const q = query.toLowerCase().trim();
  const results = [];
  shops.forEach(shop => {
    if (sort === 'Open Now' && !shop.open) return;
    const matched = shop.products.filter(p => p.name.toLowerCase().includes(q));
    if (matched.length > 0) results.push({ shop, matchedProducts: matched });
  });
  return results;
}

export default function ProductShops({ navigate, goBack, resetTo, params = {}, cart }) {
  const sort = params.sort || 'Nearest';
  const query = params.query || '';
  const [search, setSearch] = useState(query);
  const [activeQuery, setActiveQuery] = useState(query);

  const results = getMatches(activeQuery, sort);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  function handleSearch(e) {
    e.preventDefault();
    setActiveQuery(search.trim());
  }

  return (
    <div className="ps-root">

      {/* ── Header ── */}
      <div className="ps-header">
        <span className="ps-back" onClick={goBack}>←</span>
        <span className="ps-wordmark">BATTE</span>
        <button className="ps-cart-btn" onClick={() => navigate('cart')}>
          🛒{cartCount > 0 && <span className="ps-cart-badge">{cartCount}</span>}
        </button>
      </div>

      {/* ── Title + search ── */}
      <div className="ps-top">
        <h2 className="ps-title">Shop your product</h2>
        <form className="ps-search-bar" onSubmit={handleSearch}>
          <input
            className="ps-search-input"
            type="text"
            placeholder="Search again…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" className="ps-search-go">→</button>
        </form>
      </div>

      {/* ── Results ── */}
      <div className="ps-list">
        {activeQuery === '' && (
          <div className="ps-empty">Type a product to search.</div>
        )}
        {activeQuery !== '' && results.length === 0 && (
          <div className="ps-empty">No shops found for "<strong>{activeQuery}</strong>"</div>
        )}
        {results.map(({ shop, matchedProducts }) => (
          <div
            key={shop.id}
            className="ps-card"
            onClick={() => navigate('shopInventory', { shop })}
          >
            <div className="ps-card-left">
              <span className="ps-card-emoji">{shop.emoji}</span>
            </div>
            <div className="ps-card-body">
              <div className="ps-card-top">
                <span className="ps-card-name">{shop.name}</span>
                <span className={`ps-badge ${shop.open ? 'ps-badge-open' : 'ps-badge-closed'}`}>
                  {shop.open ? 'Open' : 'Closed'}
                </span>
              </div>
              <div className="ps-card-area">📍 {shop.area}, {shop.locality}</div>
              <div className="ps-card-products">
                {matchedProducts.map(p => (
                  <span key={p.id} className="ps-product-pill">
                    {p.emoji} {p.name} — <strong>Rs {p.price}</strong>
                  </span>
                ))}
              </div>
            </div>
            <div className="ps-card-arrow">→</div>
          </div>
        ))}
      </div>

    </div>
  );
}