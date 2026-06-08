import React from "react";
import "./LowerHeader.css";
import { FaBars } from "react-icons/fa";

function LowerHeader() {
  return (
    <div className="lowerHeader">
      <div className="lowerHeader__all">
        <FaBars />
        <span>All</span>
      </div>

      <div className="lowerHeader__links">
        <span>Today's Deals</span>
        <span>Registry</span>
        <span>Prime Video</span>
        <span>Gift Cards</span>
        <span>Customer Service</span>
        <span>Sell</span>
      </div>
    </div>
  );
}

export default LowerHeader;
