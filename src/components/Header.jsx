import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {

  return (
    <nav className="w-full flex justify-between px-5 py-3 font-['helvetica_now_display']">
      <div>
        <a href="/">
        <img src="../public/images/HATROXX.png" alt="HATROX" className="h-8" />
        </a>
      </div>

      {(
        <div className="flex gap-5">
          <Link to="/shop">shop</Link>
          <Link to="/products">products</Link>
          <Link to="/shop/cart">cart</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Header;
