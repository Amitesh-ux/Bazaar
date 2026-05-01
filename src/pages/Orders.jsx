import React, { useState } from 'react';
import './Orders.css';

const orders = [
  {
    id: 'ORD001',
    shop: 'Sudarshan Family Store',
    shopEmoji: '🥻',
    area: 'Chickpet Main Rd',
    date: 'Today, 11:30 AM',
    status: 'Confirmed',
    items: [
      { name: 'Silk Saree', qty: 1, price: 1200 },
      { name: 'Cotton Dupatta', qty: 2, price: 350 },
    ],
  },
  {
    id: 'ORD002',
    shop: 'Thindi Beedi Snacks',
    shopEmoji: '🍿',
    area: 'Thindi Beedi',
    date: 'Today, 10:05 AM',
    status: 'Delivered',
    items: [
      { name: 'Mixture 500g', qty: 1, price: 80 },
      { name: 'Chakli', qty: 2, price: 60 },
      { name: 'Coconut Burfi', qty: 1, price: 120 },
    ],
  },
  {
    id: 'ORD003',
    shop: 'Balepet Bangles',
    shopEmoji: '💎',
    area: 'Balepet Cross',
    date: 'Yesterday, 4:15 PM',
    status: 'Pending',
    items: [
      { name: 'Glass Bangles Set', qty: 3, price: 150 },
    ],
  },
  {
    id: 'ORD004',
    shop: 'Raja Jewellers',
    shopEmoji: '💍',
    area: 'Nagarathpete',
    date: 'Yesterday, 1:45 PM',
    status: 'Delivered',
    items: [
      { name: 'Gold Earrings', qty: 1, price: 4500 },
      { name: 'Silver Chain', qty: 1, price: 1800 },
    ],
  },
  {
    id: 'ORD005',
    shop: 'Avenue Road Books',
    shopEmoji: '📚',
    area: 'Avenue Road',
    date: '28 Jun, 9:00 AM',
    status: 'Delivered',
    items: [
      { name: 'NCERT Class 10 Set', qty: 1, price: 650 },
      { name: 'Notebook Pack', qty: 2, price: 120 },
    ],
  },
];

const STATUS_CONFIG = {
  Confirmed: { color: '#1A7A5E', bg: '#D4EDDD', icon: '✅' },
  Pending:   { color: '#7A5C00', bg: '#FFF4CC', icon: '⏳' },
  Delivered: { color: '#4A4A4A', bg: '#F0EAE0', icon: '📦' },
};

const filters = ['All', 'Confirmed', 'Pending', 'Delivered'];

function getTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export default function Orders({ navigate, goBack }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expanded, setExpanded] = useState('ORD001');
  const [rated, setRated] = useState({});
  const [hoverRating, setHoverRating] = useState({});

  const visible = orders.filter(
    (o) => activeFilter === 'All' || o.status === activeFilter
  );

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleRate = (orderId, stars) => {
    setRated((prev) => ({ ...prev, [orderId]: stars }));
  };

  return (
    <div className="orders-root">
      {/* Header */}
      <div className="or-header">
        <span className="or-back" onClick={goBack}>←</span>
        <span className="or-wordmark">BATTE</span>
        <span className="or-home-icon" onClick={() => navigate('cities')}>🏠</span>
      </div>

      {/* Filter Tabs */}
      <div className="or-filter-row">
        {filters.map((f) => (
          <button
            key={f}
            className={`or-filter-btn ${activeFilter === f ? 'or-filter-active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="or-list">
        {visible.length === 0 ? (
          <div className="or-empty">
            <span>🛍️</span>
            <p>No {activeFilter.toLowerCase()} orders</p>
          </div>
        ) : (
          visible.map((order) => {
            const isExpanded = expanded === order.id;
            const cfg = STATUS_CONFIG[order.status];
            const total = getTotal(order.items);
            const myRating = rated[order.id];

            return (
              <div key={order.id} className={`or-card ${isExpanded ? 'or-card-expanded' : ''}`}>
                {/* Card Header */}
                <div className="or-card-header" onClick={() => handleExpand(order.id)}>
                  <div className="or-shop-emoji">{order.shopEmoji}</div>
                  <div className="or-card-info">
                    <div className="or-shop-name">{order.shop}</div>
                    <div className="or-order-meta">
                      <span className="or-order-id">{order.id}</span>
                      <span className="or-dot">·</span>
                      <span className="or-order-date">{order.date}</span>
                    </div>
                  </div>
                  <div className="or-card-right">
                    <div className="or-status-badge" style={{ background: cfg.bg, color: cfg.color }}>
                      {cfg.icon} {order.status}
                    </div>
                    <div className="or-total">₹{total.toLocaleString('en-IN')}</div>
                  </div>
                  <div className={`or-chevron ${isExpanded ? 'or-chevron-open' : ''}`}>›</div>
                </div>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="or-card-body">
                    {/* Items */}
                    <div className="or-items-section">
                      <div className="or-section-label">Items ordered</div>
                      {order.items.map((item, i) => (
                        <div key={i} className="or-item-row">
                          <span className="or-item-qty">{item.qty}×</span>
                          <span className="or-item-name">{item.name}</span>
                          <span className="or-item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                      <div className="or-total-row">
                        <span>Total</span>
                        <span className="or-total-amount">₹{total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Track / Rate / Reorder actions */}
                    <div className="or-actions">
                      {order.status === 'Pending' && (
                        <div className="or-track-banner">
                          <div className="or-track-steps">
                            <div className="or-step or-step-done">
                              <div className="or-step-dot" /><span>Placed</span>
                            </div>
                            <div className="or-step-line" />
                            <div className="or-step or-step-active">
                              <div className="or-step-dot" /><span>Confirmed</span>
                            </div>
                            <div className="or-step-line or-line-inactive" />
                            <div className="or-step or-step-inactive">
                              <div className="or-step-dot" /><span>Ready</span>
                            </div>
                            <div className="or-step-line or-line-inactive" />
                            <div className="or-step or-step-inactive">
                              <div className="or-step-dot" /><span>Done</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {order.status === 'Confirmed' && (
                        <div className="or-track-banner">
                          <div className="or-track-steps">
                            <div className="or-step or-step-done">
                              <div className="or-step-dot" /><span>Placed</span>
                            </div>
                            <div className="or-step-line" />
                            <div className="or-step or-step-done">
                              <div className="or-step-dot" /><span>Confirmed</span>
                            </div>
                            <div className="or-step-line or-line-inactive" />
                            <div className="or-step or-step-active">
                              <div className="or-step-dot" /><span>Ready</span>
                            </div>
                            <div className="or-step-line or-line-inactive" />
                            <div className="or-step or-step-inactive">
                              <div className="or-step-dot" /><span>Done</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {order.status === 'Delivered' && (
                        <div className="or-rate-section">
                          <div className="or-section-label">
                            {myRating ? 'Your rating' : 'Rate this order'}
                          </div>
                          <div className="or-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`or-star ${star <= (hoverRating[order.id] ?? myRating ?? 0) ? 'or-star-filled' : ''}`}
                                onClick={() => handleRate(order.id, star)}
                                onMouseEnter={() => setHoverRating((prev) => ({ ...prev, [order.id]: star }))}
                                onMouseLeave={() => setHoverRating((prev) => ({ ...prev, [order.id]: null }))}
                              >
                                ★
                              </span>
                            ))}
                            {myRating && <span className="or-rated-label">Thanks for rating!</span>}
                          </div>
                        </div>
                      )}

                      <div className="or-btn-row">
                        <button className="or-btn or-btn-secondary">📞 Call Shop</button>
                        <button className="or-btn or-btn-primary">🔁 Reorder</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}