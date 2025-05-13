import React from 'react';
import { Link } from 'react-router-dom';
import { useSellItem } from '../../components/context/SellItemContext'; // Importing the context to access the sell item details

function Receipt() {
  // Access the sellItems from the SellItemContext
  const { sellItems } = useSellItem();

  // Get the latest item (the last one added)
  const latestItem = sellItems[sellItems.length - 1];

  if (!latestItem) {
    return <p>Belum ada penjualan.</p>; // Show message if no items are available
  }

  return (
    <div className="receipt-container">
      <h2>Struk Penjualan</h2>
      <div>
        {/* Display the transaction details dynamically */}
        <p><strong>No. Transaksi:</strong> {Math.floor(Math.random() * 1000000000)}</p>
        <p><strong>Tanggal:</strong> {new Date().toLocaleDateString()}</p>
        <p><strong>Kategori Sampah:</strong> {latestItem.category}</p>
        <p><strong>Berat Sampah:</strong> {latestItem.weight} kg</p>
        <p><strong>Total Pembayaran:</strong> Rp{latestItem.price}</p>
      </div>

      {/* Back to Home Button */}
      <Link to="/home">
        <button>Kembali ke Home</button>
      </Link>
    </div>
  );
}

export default Receipt;
