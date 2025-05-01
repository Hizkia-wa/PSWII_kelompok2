import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <input type="text" placeholder="Cari..." className="search-input" />
      <div className="admin-info">👤 Admin</div>
    </div>
  );
};

export default Header;
