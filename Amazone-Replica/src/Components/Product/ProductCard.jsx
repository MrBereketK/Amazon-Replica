import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./ProductCard.css";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { type } from "../../Utility/actionType";
import { DataContext } from "../../Components/DataProvider/DataProvider";

const ProductCard = ({ product, isCart = false }) => {
  const { image, title, id, rating, price, description, amount = 1 } = product;

  const { dispatch } = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: type.ADD_TO_BASKET,
      payload: product,
    });
  };

  const increaseQty = () => {
    dispatch({
      type: type.INCREASE_QTY,
      payload: id,
    });
  };

  const decreaseQty = () => {
    dispatch({
      type: type.DECREASE_QTY,
      payload: id,
    });
  };

  if (isCart) {
    return (
      <div className="product product--cart">
        <Link to={`/products/${id}`} className="product__imageLink">
          <img src={image} alt={title} />
        </Link>

        <div className="product__info product__info--cart">
          <h2>{title}</h2>

          <p className="product__description">{description}</p>

          <div className="product__rating">
            <Rating value={rating?.rate || 0} precision={0.1} readOnly />
            <small>{rating?.count || 0}</small>
          </div>

          <div className="product__price">
            <CurrencyFormat amount={price} />
          </div>
        </div>

        <div className="product__qty">
          <button onClick={increaseQty} aria-label="Increase quantity">
            <FaChevronUp />
          </button>

          <span>{amount}</span>

          <button onClick={decreaseQty} aria-label="Decrease quantity">
            <FaChevronDown />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product">
      <Link to={`/products/${id}`} className="product__imageLink">
        <img src={image} alt={title} />
      </Link>

      <div className="product__info">
        <h2>{title}</h2>

        <div className="product__rating">
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <small>{rating?.count || 0}</small>
        </div>

        <div className="product__price">
          <CurrencyFormat amount={price} />
        </div>

        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
