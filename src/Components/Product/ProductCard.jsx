import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import "./ProductCard.css";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { type } from "../../Utility/actionType";
import { DataContext } from "../../Components/DataProvider/DataProvider";

const ProductCard = ({ product, detailPage = false }) => {
  const { image, title, id, rating, price } = product;

  const {state, dispatch} = useContext(DataContext);
  console.log(state);
  const addToCart = () => {
    dispatch({
      type: type.ADD_TO_BASKET,
      payload: product,
    });
  };

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

        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
