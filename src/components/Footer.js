import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Mengimpor Link dan useLocation

function Footer() {
  const location = useLocation();

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
