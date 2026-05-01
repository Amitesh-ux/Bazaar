import { useState } from 'react';
import './Cities.css';

const cities = [
  { id: 1, name: 'Bengaluru', active: true },
  { id: 2, name: 'Mysuru' },
  { id: 3, name: 'Mangaluru' },
];

export default function Cities({ navigate }) {
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = cities.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="cities-root">
      <div className="cities-header">
        <span className="cities-wordmark">BATTE</span>
        <span className="cities-home-icon" onClick={() => navigate('loading')}>🏠</span>
      </div>

      <div className="cities-actions">
        {searching ? (
          <div className="cities-search-box">
            <span className="cities-search-icon">🔍</span>
            <input
              className="cities-search-input"
              autoFocus
              placeholder="Search city..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <span
              className="cities-search-clear"
              onClick={() => { setSearching(false); setQuery(''); }}
            >✕</span>
          </div>
        ) : (
          <>
            <button className="cities-pill" onClick={() => setSearching(true)}>🔍 Search City</button>
            <button className="cities-pill" onClick={() => navigate('findme')}>📍 Map</button>
          </>
        )}
      </div>

      <div className="cities-grid">
        {filtered.length === 0 ? (
          <div className="cities-no-results">No cities found</div>
        ) : (
          filtered.map(city => (
            <div
              key={city.id}
              className={`city-card ${city.active ? 'city-card-active' : ''}`}
              onClick={() => navigate('specifics', { city: city.name })}
            >
              <span className="city-name">{city.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}