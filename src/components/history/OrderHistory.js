import React from 'react';
import { useSellItem } from '../../components/context/SellItemContext'; 
import { useUser } from '../../components/context/UserContext'; // Context user yang punya info role

function OrderHistory() {
  const { sellHistory, buyHistory, updateSellHistory, updateBuyHistory } = useSellItem(); 
  const { user } = useUser(); // Ambil data user yang login, misal { role: 'admin' }

  const combinedHistory = [...sellHistory, ...buyHistory];

  // Fungsi untuk update status transaksi
  const handleStatusChange = (transactionId, newStatus, type) => {
    if (type === 'sell') {
      const updatedSellHistory = sellHistory.map(t => 
        t.id === transactionId ? { ...t, status: newStatus } : t
      );
      updateSellHistory(updatedSellHistory);
    } else if (type === 'buy') {
      const updatedBuyHistory = buyHistory.map(t =>
        t.id === transactionId ? { ...t, status: newStatus } : t
      );
      updateBuyHistory(updatedBuyHistory);
    }
  };

  return (
    <div className="order-history-container">
      <h2>Riwayat Pembelian & Penjualan</h2>

      {combinedHistory.length > 0 ? (
        <ul>
          {combinedHistory.map((transaction) => (
            <li key={transaction.id} className={transaction.type === 'sell' ? 'sell' : 'buy'}>
              <p><strong>Kategori:</strong> {transaction.category}</p>
              <p><strong>Harga:</strong> Rp{transaction.price}</p>

              {/* Jika user admin, tampilkan dropdown untuk ubah status */}
              {user?.role === 'admin' ? (
                <p>
                  <strong>Status:</strong>
                  <select 
                    value={transaction.status} 
                    onChange={(e) => handleStatusChange(transaction.id, e.target.value, transaction.type)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Batal">Batal</option>
                  </select>
                </p>
              ) : (
                <p className="status"><strong>Status:</strong> {transaction.status}</p>
              )}

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
