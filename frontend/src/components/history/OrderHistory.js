import React from 'react';
import SellHistory from './SellHistory';
import BuyHistory from './BuyHistory';
import './OrderHistoryPage.css';

function OrderHistoryPage() {
  return (
    <div className="order-history-container">
      <h1 className="order-history-title">Riwayat Transaksi</h1>
      <div className="history-sections">
        <section className="history-section">
          <h2 className="section-title sell-title">Riwayat Penjualan</h2>
          <SellHistory />
        </section>
        <section className="history-section">
          <h2 className="section-title buy-title">Riwayat Pembelian</h2>
          <BuyHistory />
        </section>
      </div>
    </div>
  );
}

export default OrderHistoryPage;
