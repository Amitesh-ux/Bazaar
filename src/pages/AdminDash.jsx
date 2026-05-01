import React, { useState } from 'react';
import './AdminDash.css';

const initialPending = [
  { id: 101, name: 'Silk Villa',         category: 'Sarees',    area: 'Chickpet Main Rd', emoji: '🥻', owner: 'Ramesh G.' },
  { id: 102, name: 'Pearls & Petals',    category: 'Jewellery', area: 'Nagarathpete',     emoji: '💍', owner: 'Fatima B.' },
  { id: 103, name: 'Paper Trails Books', category: 'Books',     area: 'Avenue Road',      emoji: '📚', owner: 'Vinod S.' },
];

const allShops = [
  { id: 1, name: 'Sudarshan Family Store', category: 'Sarees',    area: 'Chickpet Main Rd', emoji: '🥻', open: true,  orders: 14, revenue: 42000 },
  { id: 2, name: 'Balepet Bangles',        category: 'Bangles',   area: 'Balepet Cross',    emoji: '💎', open: true,  orders: 9,  revenue: 18500 },
  { id: 3, name: 'Avenue Road Books',      category: 'Books',     area: 'Avenue Road',      emoji: '📚', open: false, orders: 3,  revenue: 2400  },
  { id: 4, name: 'Raja Jewellers',         category: 'Jewellery', area: 'Nagarathpete',     emoji: '💍', open: true,  orders: 21, revenue: 91000 },
  { id: 5, name: 'Thindi Beedi Snacks',   category: 'Food',      area: 'Thindi Beedi',     emoji: '🍿', open: true,  orders: 37, revenue: 11200 },
];

export default function AdminDash() {
  const [pending, setPending]     = useState(initialPending);
  const [activeTab, setActiveTab] = useState('approvals'); // 'approvals' | 'shops'
  const [toast, setToast]         = useState('');

  // Stats
  const activeShops  = allShops.filter(s => s.open).length;
  const totalOrders  = allShops.reduce((s, sh) => s + sh.orders, 0);
  const totalGMV     = allShops.reduce((s, sh) => s + sh.revenue, 0);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  function handleApproval(id, action) {
    setPending(prev => prev.filter(s => s.id !== id));
    showToast(action === 'approve' ? '✅ Shop approved!' : '❌ Shop rejected');
  }

  return (
    <div className="ad-root">
      {/* Status Bar */}
      <div className="ad-statusbar">9:41 AM</div>

      {/* Header */}
      <div className="ad-header">
        <div className="ad-header-left">
          <div className="ad-avatar">🛡️</div>
          <div>
            <div className="ad-title">Admin Dashboard</div>
            <div className="ad-subtitle">Chickpet Bazaar</div>
          </div>
        </div>
        <div className="ad-role-badge">Admin</div>
      </div>

      {/* Stats Row */}
      <div className="ad-stats">
        <div className="ad-stat-card">
          <div className="ad-stat-val">{activeShops}</div>
          <div className="ad-stat-label">Active Shops</div>
        </div>
        <div className="ad-stat-card ad-stat-card--accent">
          <div className="ad-stat-val">{totalOrders}</div>
          <div className="ad-stat-label">Orders Today</div>
        </div>
        <div className="ad-stat-card">
          <div className="ad-stat-val">₹{(totalGMV / 1000).toFixed(0)}k</div>
          <div className="ad-stat-label">GMV</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="ad-tabs">
        <button
          className={`ad-tab ${activeTab === 'approvals' ? 'ad-tab--active' : ''}`}
          onClick={() => setActiveTab('approvals')}
        >
          ⏳ Approvals {pending.length > 0 && <span className="ad-badge">{pending.length}</span>}
        </button>
        <button
          className={`ad-tab ${activeTab === 'shops' ? 'ad-tab--active' : ''}`}
          onClick={() => setActiveTab('shops')}
        >
          🏪 All Shops
        </button>
      </div>

      {/* Content */}
      <div className="ad-content">

        {/* ── APPROVALS TAB ── */}
        {activeTab === 'approvals' && (
          <div className="ad-approvals">
            {pending.length === 0 && (
              <div className="ad-empty">
                <div className="ad-empty-icon">🎉</div>
                <div>All caught up! No pending approvals.</div>
              </div>
            )}
            {pending.map(shop => (
              <div key={shop.id} className="ad-approval-card">
                <div className="ad-approval-top">
                  <div className="ad-approval-emoji">{shop.emoji}</div>
                  <div className="ad-approval-info">
                    <div className="ad-approval-name">{shop.name}</div>
                    <div className="ad-approval-meta">{shop.category} · {shop.area}</div>
                    <div className="ad-approval-owner">👤 {shop.owner}</div>
                  </div>
                  <div className="ad-pending-pill">Pending</div>
                </div>
                <div className="ad-approval-actions">
                  <button className="ad-btn-reject"  onClick={() => handleApproval(shop.id, 'reject')}>Reject</button>
                  <button className="ad-btn-approve" onClick={() => handleApproval(shop.id, 'approve')}>Approve</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── ALL SHOPS TAB ── */}
        {activeTab === 'shops' && (
          <div className="ad-shops">
            {allShops.map(shop => (
              <div key={shop.id} className="ad-shop-card">
                <div className="ad-shop-left">
                  <div className="ad-shop-emoji">{shop.emoji}</div>
                  <div>
                    <div className="ad-shop-name">{shop.name}</div>
                    <div className="ad-shop-meta">{shop.category} · {shop.area}</div>
                  </div>
                </div>
                <div className="ad-shop-right">
                  <div className={`ad-shop-status ${shop.open ? 'ad-status--open' : 'ad-status--closed'}`}>
                    {shop.open ? 'Open' : 'Closed'}
                  </div>
                  <div className="ad-shop-stats">
                    <span>📦 {shop.orders}</span>
                    <span>₹{(shop.revenue / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && <div className="ad-toast">{toast}</div>}
    </div>
  );
}