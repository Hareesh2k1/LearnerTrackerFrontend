import React from 'react'
import ictlogo from "../ictlogo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer class="py-1  border-top bg-light">
      <div>
        <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          <img src={ictlogo} className="App-logo mb-2" alt="logo" style={{ height: '30px' }} />
        </a>
        <span class="mb-3 mb-md-0 text-muted">© {currentYear} Company, Inc</span>
      </div>
    </footer>
  )
}

export default Footer