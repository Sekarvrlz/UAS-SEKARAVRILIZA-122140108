import React from 'react';
import { Link } from 'react-router-dom';
import { useSellItem } from '../context/SellItemContext';

function Receipt() {
  const { sellItems } = useSellItem();

  const latestItem = sellItems.length > 0 ? sellItems[sellItems.length - 1] : null;

  if (!latestItem) {
    return <p>Belum ada penjualan.</p>;
  }

  return (
    <div className="receipt-container">
      <h2>Struk Penjualan</h2>
      <p><strong>No. Transaksi:</strong> {Math.floor(Math.random() * 1000000000)}</p>
      <p><strong>Tanggal:</strong> {new Date().toLocaleDateString()}</p>
      <p><strong>Kategori Sampah:</strong> {latestItem.category}</p>
      <p><strong>Berat Sampah:</strong> {latestItem.weight} kg</p>
      <p><strong>Total Pembayaran:</strong> Rp{latestItem.price}</p>

      <Link to="/home">
        <button>Kembali ke Home</button>
      </Link>
    </div>
  );
}

export default Receipt;
