import React from 'react';
import { useSellItem } from '../../components/context/SellItemContext'; // Perbaiki impor useSellItem

function OrderHistory() {
  const { sellHistory, buyHistory } = useSellItem(); // Mengakses riwayat penjualan dan pembelian dari context

  const combinedHistory = [...sellHistory, ...buyHistory]; // Menggabungkan kedua riwayat

  return (
    <div className="order-history-container">
      <h2>Riwayat Pembelian & Penjualan</h2>
      
      {combinedHistory.length > 0 ? (
        <ul>
          {combinedHistory.map((transaction, index) => (
            <li key={index}>
              <p><strong>Kategori:</strong> {transaction.category}</p>
              <p><strong>Harga:</strong> Rp{transaction.price}</p>
              <p><strong>Status:</strong> {transaction.status}</p>
              <p><strong>Berat:</strong> {transaction.weight} kg</p>
              <p><strong>Jenis Transaksi:</strong> {transaction.type === 'sell' ? 'Penjualan' : 'Pembelian'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Belum ada transaksi.</p>
      )}
    </div>
  );
}

export default OrderHistory;
