import React from 'react';
import { useSellItem } from '../../components/context/SellItemContext'; 

function AdminDashboard() {
  const { sellHistory, buyHistory, updateSellHistory, updateBuyHistory } = useSellItem(); 

  const handleStatusChange = (transactionId, newStatus, type) => {
    const updatedHistory = type === 'sell' ? sellHistory : buyHistory;

    const updatedItems = updatedHistory.map(transaction => 
      transaction.id === transactionId ? { ...transaction, status: newStatus } : transaction
    );

    if (type === 'sell') {
      updateSellHistory(updatedItems);
    } else {
      updateBuyHistory(updatedItems);
    }
  };

  const statusOptions = ['Pending', 'Diproses', 'Selesai', 'Batal'];

  return (
    <div className="admin-manage-container">
      <h2>Kelola Transaksi</h2>

      <h3>Riwayat Penjualan</h3>
      {sellHistory.length > 0 ? (
        <ul>
          {sellHistory.map((transaction) => (
            <li key={transaction.id}>
              <p><strong>Kategori:</strong> {transaction.category}</p>
              <p><strong>Harga:</strong> Rp{transaction.price}</p>
              <p>
                <strong>Status:</strong>
                <select 
                  value={transaction.status} 
                  onChange={(e) => handleStatusChange(transaction.id, e.target.value, 'sell')}
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </p>
              <p><strong>Berat:</strong> {transaction.weight} kg</p>
              <p><strong>Jenis Transaksi:</strong> Penjualan</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Belum ada penjualan.</p>
      )}

      <h3>Riwayat Pembelian</h3>
      {buyHistory.length > 0 ? (
        <ul>
          {buyHistory.map((transaction) => (
            <li key={transaction.id}>
              <p><strong>Kategori:</strong> {transaction.category}</p>
              <p><strong>Harga:</strong> Rp{transaction.price}</p>
              <p>
                <strong>Status:</strong>
                <select 
                  value={transaction.status} 
                  onChange={(e) => handleStatusChange(transaction.id, e.target.value, 'buy')}
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </p>
              <p><strong>Berat:</strong> {transaction.weight} kg</p>
              <p><strong>Jenis Transaksi:</strong> Pembelian</p>
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
