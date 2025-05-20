import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSellItem } from '../../components/context/SellItemContext'; // Mengimpor useSellItem

function Details() {
  const navigate = useNavigate();
  const { sellItems } = useSellItem(); // Mengakses data sellItems dari SellItemContext

  // Ambil item terbaru dari sellItems
  const latestItem = sellItems[sellItems.length - 1];

  return (
    <div className="details-container">
      <h2>Detail Penjualan</h2>
      {latestItem ? (
        <div className="details-content">
          <div>
            {/* Menampilkan gambar sampah di sebelah kiri */}
            <img src={URL.createObjectURL(latestItem.photo)} alt="Foto Sampah" />
          </div>

          <div className="details-info">
            <p><strong>Kategori:</strong> {latestItem.category}</p>
            <p><strong>Berat Sampah:</strong> {latestItem.weight} kg</p>
            <p><strong>Harga:</strong> Rp{latestItem.price}</p>
          </div>
        </div>
      ) : (
        <p>Belum ada penjualan.</p>
      )}

      <button onClick={() => navigate('/sell/receipt')}>Lihat Struk</button>
    </div>
  );
}

export default Details;
