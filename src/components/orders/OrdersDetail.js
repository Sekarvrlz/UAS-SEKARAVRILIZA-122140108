// components/orders/OrderDetail.js
import React from 'react';

function OrderDetail() {
  return (
    <div className="order-detail-container">
      <h2>Detail Pesanan</h2>
      <div className="order-info">
        <div>Botol Plastik - 2 Kg</div>
        <div>Status: Pengantaran sedang diproses</div>
        <div>Total Pembayaran: Rp4.900</div>
      </div>
      <button>Lihat Pembayaran</button>
    </div>
  );
}

export default OrderDetail;
