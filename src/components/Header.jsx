import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  // State to track login status (replace this with Context or Redux in production)
  const [loggedIn, setLoggedIn] = useState(false);

  // Example: Check if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  return (
    <nav className="w-full flex justify-between px-5 py-3 font-['helvetica_now_display']">
      <h3 className="text-xl">
        <Link to="/">HATROX</Link>
      </h3>

      {(
        <div className="flex gap-5">
          <Link to="/shop">shop</Link>
          <Link to="/products">products</Link>
          <Link to="/shop/cart">cart</Link>
          <Link to="/account">My Account</Link>
          <Link to="/register">Register</Link>
          {/* <Link to="/contact">Contact</Link>   */}
          <a
            className="text-red-500"
            href="#"
            onClick={() => {
              // Logout logic
              localStorage.removeItem("token");
              setLoggedIn(false);
            }}
          >
            Logout
          </a>
        </div>
      )}
    </nav>
  );
}

export default Header;
