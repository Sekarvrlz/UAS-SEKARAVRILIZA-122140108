import React from 'react';
// import { Link, useLocation } from 'react-router-dom'; // Hapus Link dan useLocation karena tidak dipakai

function Footer() {
  // const location = useLocation(); // Hapus variabel location karena tidak dipakai

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-bottom">
          <p>&copy; 2025 DaurUlang. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
