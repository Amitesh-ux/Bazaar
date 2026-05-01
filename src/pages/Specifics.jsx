import { useState, useMemo } from 'react';
import './Specifics.css';

const localitiesByCity = {
  Bengaluru: ['Chickpet', 'Balepet', 'Nagarathpete', 'Cubbonpet', 'Sultanpete'],
  Mysuru:    ['Devaraja', 'Sayyaji Rao Rd'],
  Mangaluru: ['Hampankatta', 'Lalbagh'],
};

const shops = [
  { id: 1, locality: 'Chickpet',     open: true,  products: 4 },
  { id: 2, locality: 'Balepet',      open: true,  products: 3 },
  { id: 3, locality: 'Cubbonpet',    open: false, products: 2 },
  { id: 4, locality: 'Nagarathpete', open: true,  products: 3 },
  { id: 5, locality: 'Nagarathpete', open: true,  products: 3 },
  { id: 6, locality: 'Chickpet',     open: true,  products: 2 },
  { id: 7, locality: 'Sultanpete',   open: false, products: 2 },
];

function getStats(locality) {
  const s = shops.filter(sh => sh.locality === locality);
  return {
    openCount: s.filter(sh => sh.open).length,
    productCount: s.reduce((sum, sh) => sum + sh.products, 0),
  };
}

export default function Specifics({ navigate, params }) {
  const city = params?.city || 'Bengaluru';
  const localities = localitiesByCity[city] || [];
  const [selected, setSelected]       = useState(null);
  const [sortOpen, setSortOpen]       = useState(false);
  const [sortProducts, setSortProducts] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sorted = useMemo(() => {
    if (!sortOpen && !sortProducts) return localities;
    return [...localities].sort((a, b) => {
      const sa = getStats(a), sb = getStats(b);
      if (sortOpen && sa.openCount !== sb.openCount)
        return sb.openCount - sa.openCount;
      if (sortProducts && sa.productCount !== sb.productCount)
        return sb.productCount - sa.productCount;
      return 0;
    });
  }, [localities, sortOpen, sortProducts]);

  function handleTap(locality) {
    setSelected(locality);
    setTimeout(() => navigate('localities', { city, locality }), 200);
  }

  return (
    <div className="spec-root">
      <div className="spec-header">
        <span className="spec-back" onClick={() => navigate('cities')}>←</span>
        <span className="spec-wordmark">BATTE</span>
        <span className="spec-home-icon" onClick={() => navigate('cities')}>🏠</span>
      </div>

      <div className="spec-toolbar">
        <span className="spec-city-pill">{city}</span>
        <span
          className={`spec-sort-chip ${sortOpen ? 'spec-sort-chip--open' : ''}`}
          onClick={() => setSortOpen(p => !p)}
        >
          🟢 Open Now
        </span>
        <span
          className={`spec-sort-chip ${sortProducts ? 'spec-sort-chip--products' : ''}`}
          onClick={() => setSortProducts(p => !p)}
        >
          📦 Products
        </span>
      </div>

      <div className="spec-grid">
        {sorted.map(loc => (
          <div
            key={loc}
            className={`spec-card ${selected === loc ? 'spec-card-active' : ''}`}
            onClick={() => handleTap(loc)}
          >
            <span className="spec-card-name">{loc}</span>
            {(sortOpen || sortProducts) && (
              <span className="spec-card-meta">
                {sortOpen && `${getStats(loc).openCount} open`}
                {sortOpen && sortProducts && ' · '}
                {sortProducts && `${getStats(loc).productCount} items`}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}