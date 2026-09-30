import React, { useContext } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaCaretDown,
} from "react-icons/fa";

import { signOut } from "firebase/auth";
import { auth } from "../../Utility/firebase";
// import keycloak from "../../Utility/keycloak";

import logo from "../../assets/amazone header logo1.png";
import flag from "../../assets/American Flag.png";

import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";

function Header() {
  const navigate = useNavigate();

  const {
    state: { basket, user },
  } = useContext(DataContext);

  const handleAuthentication = async () => {
    if (user) {
      try {
        await signOut(auth);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/auth");
    }
  };

  // const handleAuthentication = () => {
  //   if (user) {
  //     keycloak.logout({
  //       redirectUri: window.location.origin,
  //     });
  //   } else {
  //     navigate("/auth");
  //   }
  // };

  return (
    <section className="header__container">
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
            className="header__searchInput"
            type="text"
            placeholder="Search Amazon"
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

          {/* AUTH */}

          <div className="header__option" onClick={handleAuthentication}>
            <span>Hello, {user ? user.email : "Guest"}</span>
            {/* <span> Hello, {user ? user.preferred_username : "Guest"}</span> */}
            <span>{user ? "Sign Out" : "Sign In"}</span>
          </div>

          {/* ORDERS */}

          <Link to="/orders" className="header__option">
            <span>Returns</span>

            <span>& Orders</span>
          </Link>

          {/* CART */}

          <Link to="/cart" className="header__cart">
            <FaShoppingCart className="header__cartIcon" />

            <span className="header__cartCount">{basket.length}</span>

            <span>Cart</span>
          </Link>
        </div>
      </header>

      <LowerHeader />
    </section>
  );
}

export default Header;
