import { useEffect } from 'react';
import './Loading.css';

function Loading({ navigate }) {
  useEffect(() => {
    const t = setTimeout(() => navigate('findme'), 2000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="loading-root">
      <h1 className="loading-logo">Batte</h1>
      <p className="loading-tagline">one stop search, shop, sales</p>
    </div>
  );
}

export default Loading;