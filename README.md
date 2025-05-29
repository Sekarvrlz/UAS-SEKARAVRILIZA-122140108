# EcoCash

## Deskripsi  
EcoCash adalah aplikasi web jual beli sampah yang memungkinkan user untuk menjual dan membeli sampah secara online. Setiap transaksi penjualan sampah akan memberikan EcoPoint kepada user sebagai reward. Admin dapat mengelola status sampah dan menghapus sampah yang sudah tidak layak jual.

## Teknologi dan Dependensi  
- Frontend: React  
- Backend: Python dengan framework PythonPyramid  
- Database: PostgreSQL (dikelola dengan pgAdmin)  

### Frontend Dependensi  
- react  
- react-dom  
- axios 
- react-router-dom  
- library UI lain sesuai `package.json`

### Backend Dependensi  
- pyramid  
- sqlalchemy (untuk ORM database)  
- psycopg2 (PostgreSQL driver)  
- pyramid_jinja2 (jika menggunakan Jinja template)  
- library lain sesuai `requirements.txt`

## Fitur  
- User dapat mendaftar, login, dan mengelola akun  
- User dapat menjual sampah dan membeli sampah  
- Sistem poin (EcoPoint) otomatis diberikan pada setiap transaksi penjualan  
- Admin dapat melihat daftar sampah, mengubah status sampah, dan menghapus sampah yang tidak layak  
- Dashboard sederhana untuk admin dan user  
- Integrasi frontend dan backend via REST API  

## Cara Menjalankan

### 1. Persiapan Database PostgreSQL  
- Pastikan PostgreSQL sudah terinstall.  
- Buka pgAdmin atau tool lain untuk manajemen PostgreSQL.  
- Buat database baru, misal: `ecocash`.  
- Import skema database jika tersedia (file `.sql`).  
- Catat username dan password PostgreSQL untuk konfigurasi backend.

### 2. Konfigurasi Backend  
- Pastikan Python 3.7+ sudah terinstall.  
- Buka terminal, masuk folder backend proyek.  
- Buat virtual environment:  
  ```bash
  python -m venv env 
  env\Scripts\activate      # Windows
  ```  
- Install dependencies backend:  
  ```bash
  pip install -r requirements.txt
  ```  
- Edit konfigurasi koneksi database di `development.ini` atau `production.ini`:  
  ```
  sqlalchemy.url = postgresql://username:password@localhost/ecocash_db
  ```  
- Jalankan migrasi database jika ada.  

### 3. Menjalankan Backend  
- Jalankan backend dengan perintah:  
  ```bash
  pserve development.ini --reload
  ```  
- Backend berjalan di `http://localhost:6543` (default).

### 4. Menjalankan Frontend React  
- Pastikan Node.js dan npm sudah terinstall.  
- Buka terminal, masuk folder frontend React.  
- Install dependencies frontend:  
  ```bash
  npm install
  ```  
- Jalankan frontend:  
  ```bash
  npm start
  ```  
- Frontend berjalan di `http://localhost:3000`.

### 5. Pengujian Aplikasi  
- Buka `http://localhost:3000` di browser.  
- Cek semua fitur jual beli sampah dan pengelolaan admin.  
- Pastikan EcoPoint bertambah otomatis saat transaksi berhasil.  

## Referensi  
- [React Documentation](https://reactjs.org/)  
- [Pyramid Framework](https://trypyramid.com/)  
- [PostgreSQL](https://www.postgresql.org/)  
- [pgAdmin](https://www.pgadmin.org/)  
