import { useState } from 'react';
import Home from './pages/Home';
import MapView from './pages/MapView';
import Orders from './pages/Orders';
import VendorPanel from './pages/VendorPanel';
// import AdminDash from './pages/AdminDash';
import ShopDetail from './pages/ShopDetail';
import ProductDetail from './pages/ProductDetail';
import CartScreen from './pages/CartScreen';
import Loading from './pages/Loading';
import Cities from './pages/Cities';
import Specifics from './pages/Specifics';
import Localities from './pages/Localities';
import Products from './pages/Products';
import Item from './pages/Item';
import FindMe from './pages/FindMe';
import ProductShops from './pages/ProductShops';
import ShopInventory from './pages/ShopInventory';
import LocalityShops from './pages/LocalityShops';

import './App.css';

function App() {
  const [stack, setStack] = useState([{ name: 'loading', params: {} }]);
  const current = stack[stack.length - 1];

  function navigate(name, params = {}) {
    setStack(prev => [...prev, { name, params }]);
  }

  function goBack() {
    setStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  }

  function resetTo(name, params = {}) {
    setStack([{ name, params }]);
  }

  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart(prev => prev.filter(i => i.id !== productId));
  }

  function decrementFromCart(productId) {
    setCart(prev => prev
      .map(i => i.id === productId ? { ...i, qty: i.qty - 1 } : i)
      .filter(i => i.qty > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const [devRole, setDevRole] = useState('shopper');

  const renderScreen = () => {
    if (devRole === 'vendor') return <VendorPanel />;
    // if (devRole === 'admin')  return <AdminDash />;

    const { name, params } = current;
    const navProps = { navigate, goBack, resetTo, cart, addToCart, removeFromCart, decrementFromCart, clearCart };

    switch (name) {
      case 'loading': return <Loading        {...navProps} />;
      case 'findme': return <FindMe         {...navProps} />;   // ← NEW
      case 'productShops':  return <ProductShops {...navProps} params={params} />;
      case 'shopInventory': return <ShopInventory {...navProps} params={params} />;
      case 'home': return <Home           {...navProps} />;
      case 'map': return <MapView        {...navProps} />;
      case 'findme': return <MapView {...navProps} mode="findme" />;
      case 'orders':        return <Orders         {...navProps} />;
      case 'shopDetail':    return <ShopDetail     {...navProps} params={params} />;
      case 'productDetail': return <ProductDetail  {...navProps} params={params} />;
      case 'cart':          return <CartScreen     {...navProps} />;
      case 'cities':        return <Cities {...navProps} />;
      case 'specifics':     return <Specifics {...navProps} params={params} />;
      case 'localities':    return <Localities {...navProps} params={params} />;
      case 'products':      return <Products {...navProps} params={params} />;
      case 'item':          return <Item {...navProps} params={params} />;
      case 'localityShops': return <LocalityShops {...navProps} params={params} />;
      default:              return <Loading        {...navProps} />;
    }
  };

  return (
    <div className="app-shell">
      <div className="view-switcher">
        {['shopper', 'vendor'].map(role => (
          <button
            key={role}
            className={`switch-btn ${devRole === role ? 'active' : ''}`}
            onClick={() => { setDevRole(role); resetTo('loading'); }}
          >
            {role === 'shopper' ? '🛍 Shopper' : '🏪 Shop Owner'}
          </button>
        ))}
      </div>
      <div className="phone-frame">
        {renderScreen()}
      </div>
    </div>
  );
}

export default App;