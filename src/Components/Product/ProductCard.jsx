import React from "react";
import Rating from "@mui/material/Rating";
import "./ProductCard.css";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";

const ProductCard = ({ product, detailPage = false }) => {
  const { image, title, id, rating, price } = product;

  return (
    <div className={`product ${detailPage ? "product--detail" : ""}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>

      <div className="product__info">
        <h2>{title}</h2>

        <div className="product__rating">
          <Rating value={rating.rate} precision={0.1} readOnly />
          <small>{rating.count}</small>
        </div>

        <div className="product__price">
          <CurrencyFormat amount={price} />
        </div>

        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
