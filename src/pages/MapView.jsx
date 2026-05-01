import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
import './MapView.css';

const CHICKPET_CENTER = { lat: 12.9699, lng: 77.5757 };

const shops = [
  { id: 1, name: 'Sudarshan Family Store', category: 'Sarees',    area: 'Chickpet Main Rd', emoji: '🥻', open: true,  distance: '0.2 km', position: { lat: 12.9704, lng: 77.5748 }, color: '#C45E1A' },
  { id: 2, name: 'Balepet Bangles',        category: 'Bangles',   area: 'Balepet Cross',    emoji: '💎', open: true,  distance: '0.4 km', position: { lat: 12.9712, lng: 77.5768 }, color: '#8B2FC9' },
  { id: 3, name: 'Avenue Road Books',      category: 'Books',     area: 'Avenue Road',      emoji: '📚', open: false, distance: '0.6 km', position: { lat: 12.9688, lng: 77.5775 }, color: '#1D6B3A' },
  { id: 4, name: 'Raja Jewellers',         category: 'Jewellery', area: 'Nagarathpete',     emoji: '💍', open: true,  distance: '0.3 km', position: { lat: 12.9695, lng: 77.5742 }, color: '#B8860B' },
  { id: 5, name: 'Thindi Beedi Snacks',    category: 'Food',      area: 'Thindi Beedi',     emoji: '🍿', open: true,  distance: '0.5 km', position: { lat: 12.9681, lng: 77.5752 }, color: '#C4421A' },
];

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

const categories = ['All', 'Sarees', 'Bangles', 'Jewellery', 'Books', 'Food'];

export default function MapView({ navigate, mode }) {
  const isFindMe = mode === 'findme';

  const [selected, setSelected]   = useState(null);
  const [filter, setFilter]       = useState('All');
  const [map, setMap]             = useState(null);
  const [pinPos, setPinPos]       = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  });

  const onLoad     = useCallback(m => setMap(m), []);
  const onUnmount  = useCallback(() => setMap(null), []);

  const visible = shops.filter(s => filter === 'All' || s.category === filter);

  function handlePinClick(shop) {
    setSelected(selected?.id === shop.id ? null : shop);
    if (map) map.panTo(shop.position);
  }

  function handleMapClick(e) {
    if (isFindMe) setPinPos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    else setSelected(null);
  }

  function handleConfirm() {
    setConfirmed(true);
    setTimeout(() => navigate('cities'), 600);
  }

  if (loadError) {
    return (
      <div className="mapview-root">
        <div className="mv-error"><span>⚠️</span><p>Failed to load map. Check your API key.</p></div>
      </div>
    );
  }

  return (
    <div className="mapview-root">

      {/* ── Header ── */}
      {isFindMe ? (
        <div className="mv-header-batte">
          <span className="mv-batte-wordmark">BATTE</span>
          <span className="mv-batte-home" onClick={() => navigate('loading')}>🏠</span>
        </div>
      ) : (
          <>
            <div className="mv-header-batte">
              <span className="mv-batte-wordmark">BATTE</span>
              <span className="mv-batte-home" onClick={() => navigate('loading')}>🏠</span>
            </div>
          </>
      )}

      {/* ── Category filter (browse mode only) ── */}
      {!isFindMe && (
        <div className="mv-filter-scroll">
          {categories.map(cat => (
            <button
              key={cat}
              className={`mv-chip ${filter === cat ? 'mv-chip-active' : ''}`}
              onClick={() => { setFilter(cat); setSelected(null); }}
            >{cat}</button>
          ))}
        </div>
      )}

      {/* ── Find Me hint bar ── */}
      {isFindMe && (
        <div className="mv-findme-hint">
          📍 Tap anywhere on the map to place your pin
        </div>
      )}

      {/* ── Map ── */}
      <div className="mv-map-container" style={{ height: isFindMe ? '100%' : '400px' }}>
        {!isLoaded ? (
          <div className="mv-loading"><div className="mv-spinner" /><span>Loading map…</span></div>
        ) : (
          <GoogleMap
            mapContainerClassName="mv-google-map"
            center={CHICKPET_CENTER}
            zoom={16}
            options={MAP_OPTIONS}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
          >
            {/* You dot (browse mode) */}
            {!isFindMe && (
              <OverlayView position={CHICKPET_CENTER} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                <div className="mv-you-pin">
                  <div className="mv-you-ring" />
                  <div className="mv-you-dot" />
                </div>
              </OverlayView>
            )}

            {/* Shop pins (browse mode) */}
            {!isFindMe && visible.map(shop => (
              <OverlayView key={shop.id} position={shop.position} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                <div
                  className={`mv-pin-wrap ${selected?.id === shop.id ? 'mv-pin-selected' : ''}`}
                  onClick={e => { e.stopPropagation(); handlePinClick(shop); }}
                >
                  <div className="mv-pin-bubble" style={{ background: shop.open ? shop.color : '#9A9A9A' }}>
                    <span className="mv-pin-emoji">{shop.emoji}</span>
                  </div>
                  <div className="mv-pin-tail" style={{ borderTopColor: shop.open ? shop.color : '#9A9A9A' }} />
                  {!shop.open && <div className="mv-pin-closed">CLOSED</div>}
                </div>
              </OverlayView>
            ))}

            {/* Dropped pin (findme mode) */}
            {isFindMe && pinPos && (
              <OverlayView position={pinPos} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                <div className="mv-drop-pin">📍</div>
              </OverlayView>
            )}
          </GoogleMap>
        )}
      </div>

      {/* ── Legend (browse mode) ── */}
      {!isFindMe && (
        <div className="mv-legend">
          <div className="mv-legend-item"><span className="mv-legend-dot" style={{ background: '#4A90E2' }} /><span>You</span></div>
          <div className="mv-legend-item"><span className="mv-legend-dot" style={{ background: '#C45E1A' }} /><span>Open</span></div>
          <div className="mv-legend-item"><span className="mv-legend-dot" style={{ background: '#9A9A9A' }} /><span>Closed</span></div>
          <span className="mv-legend-count">{visible.length} shops</span>
        </div>
      )}

      {/* ── Bottom sheet (browse mode) ── */}
      {!isFindMe && selected && (
        <div className="mv-sheet-backdrop" onClick={() => setSelected(null)}>
          <div className="mv-sheet" onClick={e => e.stopPropagation()}>
            <div className="mv-sheet-handle" />
            <div className="mv-sheet-header">
              <div className="mv-sheet-emoji">{selected.emoji}</div>
              <div className="mv-sheet-info">
                <div className="mv-sheet-name">{selected.name}</div>
                <div className="mv-sheet-area">📍 {selected.area}</div>
              </div>
              <div className={`mv-sheet-badge ${selected.open ? 'mv-badge-open' : 'mv-badge-closed'}`}>
                {selected.open ? 'Open' : 'Closed'}
              </div>
            </div>
            <div className="mv-sheet-meta">
              <div className="mv-sheet-meta-item"><span className="mv-meta-icon">🗺️</span><span>{selected.distance} away</span></div>
              <div className="mv-sheet-meta-item"><span className="mv-meta-icon">🏷️</span><span>{selected.category}</span></div>
            </div>
            <div className="mv-sheet-actions">
              <button className="mv-action-btn mv-btn-call">📞 Call Shop</button>
              <button className="mv-action-btn mv-btn-order" onClick={() => navigate('products', { shop: shops.find(s => s.id === selected.id) })}>🛍️ Order Now</button>
              <button className="mv-action-btn mv-btn-close" onClick={() => setSelected(null)}>✕ Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm button (findme mode) ── */}
      {isFindMe && (
        <div className="mv-findme-footer">
          <button
            className={`mv-confirm-btn ${!pinPos ? 'mv-confirm-disabled' : ''} ${confirmed ? 'mv-confirm-done' : ''}`}
            onClick={handleConfirm}
            disabled={!pinPos || confirmed}
          >
            {confirmed ? '✓ Location Set!' : pinPos ? 'Confirm Location' : 'Place Your Pin'}
          </button>
        </div>
      )}

      {/* ── Bottom nav (browse mode) ── */}
      {!isFindMe && (
        <div className="mv-bottom-nav">
          <button className="mv-nav-btn" onClick={() => navigate('cities')}>🏠<span>Home</span></button>
          <button className="mv-nav-btn">🔍<span>Search</span></button>
          <button className="mv-nav-btn mv-nav-active">🗺️<span>Map</span></button>
          <button className="mv-nav-btn" onClick={() => navigate('orders')}>📦<span>Orders</span></button>
          <button className="mv-nav-btn">👤<span>Profile</span></button>
        </div>
      )}
    </div>
  );
}