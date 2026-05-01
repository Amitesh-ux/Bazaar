import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import './FindMe.css';

const CHICKPET_CENTER = { lat: 12.9699, lng: 77.5757 };

const shops = [
  { id: 1, name: 'Sudarshan Family Store', category: 'Sarees',    area: 'BVK Iyengar Rd',  locality: 'Chickpet',     open: true,  emoji: '🥻', phone: '+91 80 4113 9590',
    position: { lat: 12.9704, lng: 77.5748 },
    products: [
      { id: 101, name: 'Kanjeevaram',  price: 1200, emoji: '🥻', category: 'Sarees' },
      { id: 102, name: 'Mysore Silk',  price: 850,  emoji: '💜', category: 'Sarees' },
      { id: 103, name: 'Cotton Saree', price: 450,  emoji: '🧣', category: 'Sarees' },
      { id: 104, name: 'Banarasi',     price: 2400, emoji: '✨', category: 'Sarees' },
    ]},
  { id: 2, name: 'Balepet Bangles',        category: 'Bangles',   area: 'Balepet',          locality: 'Balepet',      open: true,  emoji: '💍', phone: '+91 80 2228 1100',
    position: { lat: 12.9712, lng: 77.5768 },
    products: [
      { id: 201, name: 'Glass Set',    price: 180, emoji: '🔮', category: 'Bangles' },
      { id: 202, name: 'Lac Bangles',  price: 320, emoji: '💍', category: 'Bangles' },
      { id: 203, name: 'Gold-plated',  price: 650, emoji: '✨', category: 'Bangles' },
    ]},
  { id: 3, name: 'Avenue Road Books',      category: 'Books',     area: 'Avenue Rd',        locality: 'Cubbonpet',    open: false, emoji: '📚', phone: '+91 80 2286 0000',
    position: { lat: 12.9688, lng: 77.5775 },
    products: [
      { id: 301, name: 'Textbooks',    price: 60,  emoji: '📚', category: 'Books' },
      { id: 302, name: 'Notebooks',    price: 25,  emoji: '📝', category: 'Books' },
    ]},
  { id: 4, name: 'Raja Jewellers',         category: 'Jewellery', area: 'Nagarathpete',     locality: 'Nagarathpete', open: true,  emoji: '💎', phone: '+91 80 2224 5678',
    position: { lat: 12.9695, lng: 77.5742 },
    products: [
      { id: 401, name: 'Gold Chain',   price: 12000, emoji: '📿', category: 'Jewellery' },
      { id: 402, name: 'Silver Ring',  price: 800,   emoji: '💍', category: 'Jewellery' },
      { id: 403, name: 'Earrings',     price: 1500,  emoji: '✨', category: 'Jewellery' },
    ]},
  { id: 5, name: 'Thindi Beedi Snacks',    category: 'Food',      area: 'Nagarathpete',     locality: 'Nagarathpete', open: true,  emoji: '🍱', phone: '+91 98 4512 3456',
    position: { lat: 12.9681, lng: 77.5752 },
    products: [
      { id: 501, name: 'Masala Dosa',   price: 60, emoji: '🫓', category: 'Food' },
      { id: 502, name: 'Samosa',        price: 20, emoji: '🥟', category: 'Food' },
      { id: 503, name: 'Filter Coffee', price: 30, emoji: '☕', category: 'Food' },
    ]},
  { id: 6, name: 'Chickpet Silk House',    category: 'Sarees',    area: 'Chickpet Main',    locality: 'Chickpet',     open: true,  emoji: '🥻', phone: '+91 98 1234 5678',
    position: { lat: 12.9708, lng: 77.5760 },
    products: [
      { id: 601, name: 'Mysore Silk',    price: 1100, emoji: '🥻', category: 'Sarees' },
      { id: 602, name: 'Printed Cotton', price: 550,  emoji: '🧵', category: 'Sarees' },
    ]},
  { id: 7, name: 'Sulthanpete Stationery', category: 'Books',     area: 'Sultanpete',       locality: 'Sultanpete',   open: false, emoji: '📝', phone: '+91 98 9876 5432',
    position: { lat: 12.9676, lng: 77.5763 },
    products: [
      { id: 701, name: 'Notebooks',   price: 30, emoji: '📝', category: 'Stationery' },
      { id: 702, name: 'Sketch Pens', price: 45, emoji: '🖊',  category: 'Stationery' },
    ]},
];

// Build one pin per locality: centroid position + shop/open counts
function buildLocalityPins(shops) {
  const map = {};
  shops.forEach(s => {
    if (!map[s.locality]) map[s.locality] = { locality: s.locality, shops: [] };
    map[s.locality].shops.push(s);
  });
  return Object.values(map).map(({ locality, shops }) => {
    const lat = shops.reduce((sum, s) => sum + s.position.lat, 0) / shops.length;
    const lng = shops.reduce((sum, s) => sum + s.position.lng, 0) / shops.length;
    const openCount = shops.filter(s => s.open).length;
    return { locality, position: { lat, lng }, total: shops.length, openCount };
  });
}

const localityPins = buildLocalityPins(shops);

const MAP_STYLES = [
  { featureType: 'poi',           stylers: [{ visibility: 'off' }] },
  { featureType: 'transit',       stylers: [{ visibility: 'off' }] },
  { featureType: 'road',          elementType: 'geometry',           stylers: [{ color: '#f5efe4' }] },
  { featureType: 'road.arterial', elementType: 'geometry',           stylers: [{ color: '#e8e0d4' }] },
  { featureType: 'road.highway',  elementType: 'geometry',           stylers: [{ color: '#ddd4c4' }] },
  { featureType: 'landscape',     stylers: [{ color: '#faf7f2' }] },
  { featureType: 'water',         stylers: [{ color: '#c9e2f0' }] },
  { featureType: 'road',          elementType: 'labels.text.fill',   stylers: [{ color: '#9a8a78' }] },
  { featureType: 'road',          elementType: 'labels.text.stroke', stylers: [{ color: '#faf7f2' }] },
];

const MAP_OPTIONS = {
  styles: MAP_STYLES,
  disableDefaultUI: true,
  zoomControl: false,
  gestureHandling: 'greedy',
  clickableIcons: false,
};

const SORT_OPTIONS = ['Nearest', 'Open Now', 'A–Z'];

export default function FindMe({ navigate, goBack, resetTo, cart }) {
  const [searchQuery, setSearchQuery]       = useState('');
  const [sortOpen, setSortOpen]             = useState(false);
  const [activeSort, setActiveSort]         = useState('Nearest');
  const [selectedLocality, setSelectedLocality] = useState(null); // now a locality pin, not a shop

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });

  const onLoad    = useCallback(() => {}, []);
  const onUnmount = useCallback(() => {}, []);

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('productShops', { query: searchQuery.trim(), sort: activeSort });
    }
  }

  function handlePinClick(pin) {
    setSelectedLocality(prev => prev?.locality === pin.locality ? null : pin);
  }

  const localities = [...new Set(shops.map(s => s.locality))];
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="fm-root">

      {/* ── Header ── */}
      <div className="fm-header">
        <span className="fm-wordmark">BATTE</span>
        <div className="fm-header-right">
          {cartCount > 0 && (
            <button className="fm-cart-btn" onClick={() => navigate('cart')}>
              🛒 <span className="fm-cart-badge">{cartCount}</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Search bar ── */}
      <form className="fm-search-bar" onSubmit={handleSearch}>
        <span className="fm-search-icon">📍</span>
        <input
          className="fm-search-input"
          type="text"
          placeholder="Search Product"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button type="submit" className="fm-search-go">→</button>
        )}
      </form>

      {/* ── Map ── */}
      <div className="fm-map-container">
        {loadError && (
          <div className="fm-map-error">⚠️ Map failed to load</div>
        )}
        {!isLoaded && !loadError && (
          <div className="fm-map-loading"><div className="fm-spinner" /></div>
        )}
        {isLoaded && (
          <GoogleMap
            mapContainerClassName="fm-google-map"
            center={CHICKPET_CENTER}
            zoom={15}
            options={MAP_OPTIONS}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={() => setSelectedLocality(null)}
          >
            {/* You dot */}
            <OverlayView position={CHICKPET_CENTER} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <div className="fm-you-pin">
                <div className="fm-you-ring" />
                <div className="fm-you-dot" />
              </div>
            </OverlayView>

            {/* Locality pins — one per locality */}
            {localityPins.map(pin => {
              const isSelected = selectedLocality?.locality === pin.locality;
              const hasOpen    = pin.openCount > 0;
              return (
                <OverlayView key={pin.locality} position={pin.position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                  <div
                    className={`fm-pin-wrap ${isSelected ? 'fm-pin-selected' : ''}`}
                    onClick={e => { e.stopPropagation(); handlePinClick(pin); }}
                  >
                    <div className={`fm-pin-bubble fm-pin-locality ${!hasOpen ? 'fm-pin-closed' : ''}`}>
                      <span className="fm-pin-label">{pin.locality}</span>
                      <span className="fm-pin-count">{pin.total}</span>
                    </div>
                    <div className={`fm-pin-tail ${!hasOpen ? 'fm-pin-tail-closed' : ''}`} />
                  </div>
                </OverlayView>
              );
            })}
          </GoogleMap>
        )}

        {/* Locality pin popup */}
        {selectedLocality && (
          <div className="fm-pin-popup" onClick={() => setSelectedLocality(null)}>
            <div className="fm-popup-inner" onClick={e => e.stopPropagation()}>
              <div className="fm-popup-info">
                <span className="fm-popup-name">{selectedLocality.locality}</span>
              </div>
              <button
                className="fm-popup-go"
                onClick={() => navigate('localityShops', { locality: selectedLocality.locality })}
              >→</button>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom sheet ── */}
      <div className="fm-sheet">
        <div className="fm-sheet-top">
          <span className="fm-sheet-title">Trending Near You</span>
          <div className="fm-sort-wrap">
            <button className="fm-sort-btn" onClick={() => setSortOpen(o => !o)}>
              ⇅ Sort
            </button>
            {sortOpen && (
              <div className="fm-sort-dropdown">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    className={`fm-sort-opt ${activeSort === opt ? 'fm-sort-opt-active' : ''}`}
                    onClick={() => { setActiveSort(opt); setSortOpen(false); }}
                  >{opt}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="fm-sheet-grid">
          {localities.map(locality => {
            const localityShops = shops.filter(s => s.locality === locality);
            const openCount = localityShops.filter(s => s.open).length;
            return (
              <div key={locality} className="fm-shop-card" onClick={() => navigate('localityShops', { locality })}>
                <div className="fm-card-top">
                  <span className="fm-card-name">{locality}</span>
                </div>
                <div className="fm-card-bottom">
                  <span className="fm-card-area">{localityShops.length} shops</span>
                  <span className="fm-card-open-count">{openCount} open</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}