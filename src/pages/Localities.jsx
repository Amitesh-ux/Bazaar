import { useState } from 'react';
import './Localities.css';

const allShops = [
  { id: 1, name: 'Sudarshan Family Store', category: 'Sarees',    area: 'BVK Iyengar Rd', locality: 'Chickpet',     open: true  },
  { id: 2, name: 'Balepet Bangles',        category: 'Bangles',   area: 'Balepet',         locality: 'Balepet',      open: true  },
  { id: 3, name: 'Avenue Road Books',      category: 'Books',     area: 'Avenue Rd',       locality: 'Cubbonpet',    open: false },
  { id: 4, name: 'Raja Jewellers',         category: 'Jewellery', area: 'Nagarathpete',    locality: 'Nagarathpete', open: true  },
  { id: 5, name: 'Thindi Beedi Snacks',    category: 'Food',      area: 'Nagarathpete',    locality: 'Nagarathpete', open: true  },
  { id: 6, name: 'Chickpet Silk House',    category: 'Sarees',    area: 'Chickpet Main',   locality: 'Chickpet',     open: true  },
  { id: 7, name: 'Sulthanpete Stationery', category: 'Books',     area: 'Sultanpete',      locality: 'Sultanpete',   open: false },
];

export default function Localities({ navigate, params }) {
  const { city = 'Bengaluru', locality = 'Chickpet' } = params || {};
  const [query, setQuery] = useState('');

  const shops = allShops.filter(s =>
    s.locality === locality &&
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="loc-root">
      <div className="loc-header">
        <span className="loc-wordmark">BATTE</span>
        <span className="loc-home-icon" onClick={() => navigate('loading')}>🏠</span>
      </div>

      <div className="loc-toolbar">
        <span className="loc-locality-pill">{locality.toUpperCase()}</span>
      </div>

      <div className="loc-search">
        <input
          className="loc-search-input"
          placeholder="🔍  Search shops…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="loc-list">
        {shops.length === 0 && (
          <p className="loc-empty">No shops found in {locality}.</p>
        )}
        {shops.map(shop => (
          <div
            key={shop.id}
            className="loc-card"
            onClick={() => navigate('products', { shop })}
          >
            <div className="loc-card-left">
              <span className="loc-shop-name">{shop.name}</span>
              <span className="loc-shop-sub">{shop.category} · {shop.area}</span>
            </div>
            <span className={`loc-badge ${shop.open ? 'loc-badge-open' : 'loc-badge-closed'}`}>
              {shop.open ? 'Open' : 'Closed'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}