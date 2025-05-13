import React from 'react';
import { useSellItem } from '../../components/context/SellItemContext'; 

function AdminDashboard() {
  const { sellHistory, buyHistory, updateSellHistory, updateBuyHistory } = useSellItem(); 

  console.log('Sell History:', sellHistory);  // Debugging: pastikan data tersedia
  console.log('Buy History:', buyHistory);  // Debugging: pastikan data tersedia

  const handleStatusChange = (transactionId, newStatus, type) => {
    const updatedHistory = type === 'sell' ? sellHistory : buyHistory;

    const updatedItems = updatedHistory.map(transaction => {
      if (transaction.id === transactionId) {
        return { ...transaction, status: newStatus }; 
      }
      return transaction;
    });

    if (type === 'sell') {
      updateSellHistory(updatedItems);
    } else {
      updateBuyHistory(updatedItems);
    }
  };

  return (
    <div className="admin-manage-container">
      <h2>Kelola Transaksi</h2>

      <h3>Riwayat Penjualan</h3>
      {sellHistory.length > 0 ? (
        <ul>
          {sellHistory.map((transaction, index) => (
            <li key={index}>
              <p><strong>Kategori:</strong> {transaction.category}</p>
              <p><strong>Harga:</strong> Rp{transaction.price}</p>
              <p><strong>Status:</strong> {transaction.status}</p>
              <p><strong>Berat:</strong> {transaction.weight} kg</p>
              <p><strong>Jenis Transaksi:</strong> Penjualan</p>
              <button onClick={() => handleStatusChange(transaction.id, 'Diproses', 'sell')}>Set Status Diproses</button>
              <button onClick={() => handleStatusChange(transaction.id, 'Selesai', 'sell')}>Set Status Selesai</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Belum ada penjualan.</p>
      )}

      <h3>Riwayat Pembelian</h3>
      {buyHistory.length > 0 ? (
        <ul>
          {buyHistory.map((transaction, index) => (
            <li key={index}>
              <p><strong>Kategori:</strong> {transaction.category}</p>
              <p><strong>Harga:</strong> Rp{transaction.price}</p>
              <p><strong>Status:</strong> {transaction.status}</p>
              <p><strong>Berat:</strong> {transaction.weight} kg</p>
              <p><strong>Jenis Transaksi:</strong> Pembelian</p>
              <button onClick={() => handleStatusChange(transaction.id, 'Diproses', 'buy')}>Set Status Diproses</button>
              <button onClick={() => handleStatusChange(transaction.id, 'Selesai', 'buy')}>Set Status Selesai</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Belum ada pembelian.</p>
      )}
    </div>
  );
}

export default AdminDashboard;
