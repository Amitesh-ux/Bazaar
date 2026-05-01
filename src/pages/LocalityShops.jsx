import './LocalityShops.css';

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

export default function LocalityShops({ navigate, goBack, params = {}, cart }) {
  const locality = params.locality || '';
  const localityShops = shops.filter(s => s.locality === locality);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  // open shops first
  const sorted = [...localityShops].sort((a, b) => (b.open ? 1 : 0) - (a.open ? 1 : 0));

  return (
    <div className="ls-root">

      {/* ── Header ── */}
      <div className="ls-header">
        <span className="ls-back" onClick={goBack}>←</span>
        <span className="ls-wordmark">BATTE</span>
        <button className="ls-cart-btn" onClick={() => navigate('cart')}>
          🛒{cartCount > 0 && <span className="ls-cart-badge">{cartCount}</span>}
        </button>
      </div>

      {/* ── Title ── */}
      <div className="ls-top">
        <h2 className="ls-title">{locality}</h2>
        <span className="ls-subtitle">{localityShops.length} shops nearby</span>
      </div>

      {/* ── Shop list ── */}
      <div className="ls-list">
        {sorted.map(shop => (
          <div key={shop.id} className="ls-card" onClick={() => navigate('shopInventory', { shop })}>
            <div className="ls-card-left">
              <span className="ls-card-emoji">{shop.emoji}</span>
            </div>
            <div className="ls-card-body">
              <div className="ls-card-top">
                <span className="ls-card-name">{shop.name}</span>
                <span className={`ls-badge ${shop.open ? 'ls-badge-open' : 'ls-badge-closed'}`}>
                  {shop.open ? 'Open' : 'Closed'}
                </span>
              </div>
              <span className="ls-card-area">📍 {shop.area}</span>
              <span className="ls-card-category">{shop.category}</span>
            </div>
            <div className="ls-card-arrow">→</div>
          </div>
        ))}
      </div>

    </div>
  );
}