import React from "react";
import logo from "../../assets/logo512.png";
import "./Navbar.css";

function Navbar() {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <nav className="Navbar">
      <img
        src={logo}
        className="Navbar-logo"
        alt="logo"
        onClick={handleLogoClick}
      />
    </nav>
  );
}

export default Navbar;
