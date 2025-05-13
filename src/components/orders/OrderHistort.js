import React from 'react';
import { Link } from 'react-router-dom';

function OrderHistory() {
  return (
    <div className="orders-container">
      <div className="order-item">
        <h3>Riwayat Order</h3>

        <div className="product-info">
          <div>
            <h4>Botol Plastik 2 Kg</h4>
            <p>Rp4.900</p>
          </div>
          <div>
            <p>Keterangan: Pengantaran sedang diproses</p>
          </div>
        </div>

        <div className="order-details">
          <p>Pesanan Anda sedang diproses untuk pengantaran oleh penjual. Menunggu pesanan diantar oleh penjual.</p>
        </div>

        <div className="order-status">
          <div className="order-status-icon">✔</div>
          <p>Status: Pengantaran Sedang Diproses</p>
        </div>
      </div>

      {/* Footer with Links */}
      <footer className="footer">
        <Link to="/home">Home</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/profile">Profile</Link>
      </footer>
    </div>
  );
}

export default OrderHistory;
