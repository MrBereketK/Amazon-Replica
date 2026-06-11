import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

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
          <Link to="/">
            <img src={logo} alt="Amazon" className="header__logo" />
          </Link>

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

          <Link to="/auth" className="header__option">
            <span>Hello, sign in</span>
            <span>Account & Lists</span>
          </Link>

          <Link to="/orders" className="header__option">
            <span>Returns</span>
            <span>& Orders</span>
          </Link>

          <Link to="/cart" className="header__cart">
            <FaShoppingCart className="header__cartIcon" />
            <span className="header__cartCount">0</span>
            <span>Cart</span>
          </Link>
        </div>
      </header>

      <LowerHeader />
    </>
  );
}

export default Header;
