import React from "react";
import "./Header.css";

import {
  FaSearch,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaCaretDown,
} from "react-icons/fa";

import logo from "../../assets/amazone header logo.png";
import flag from "../../assets/American Flag.png";

import LowerHeader from "./LowerHeader.jsx";

function Header() {
  return (
    <>
      <header className="header">
        {/* LEFT */}
        <div className="header__left">
          <img src={logo} alt="Amazon" className="header__logo" />

          <div className="header__location">
            <FaMapMarkerAlt className="header__icon" />
            <div className="header__locationText">
              <span>Deliver to</span>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="header__search">
          <select className="header__searchSelect">
            <option>All</option>
          </select>

          <input
            type="text"
            placeholder="Search Amazon"
            className="header__searchInput"
          />

          <div className="header__searchIcon">
            <FaSearch />
          </div>
        </div>

        {/* RIGHT */}
        <div className="header__right">
          <div className="header__language">
            <img src={flag} alt="flag" className="header__flag" />
            <span>EN</span>
            <FaCaretDown />
          </div>

          <div className="header__option">
            <span>Hello, sign in</span>
            <span>Account & Lists</span>
          </div>

          <div className="header__option">
            <span>Returns</span>
            <span>& Orders</span>
          </div>

          <div className="header__cart">
            <FaShoppingCart className="header__cartIcon" />
            <span className="header__cartCount">0</span>
            <span>Cart</span>
          </div>
        </div>
      </header>
     <LowerHeader />
    </>
  );
}

export default Header;
