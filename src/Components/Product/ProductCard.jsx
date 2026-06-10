import React from 'react'
import Rating from '@mui/material/Rating'
import "./ProductCard.css";
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';


const ProductCard = ({product}) => {
    const {image, title, id, rating, price} = product;
  return (
    <div className="product">
      <a href="">
        <img src={image} alt={title} />
      </a>

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
}

export default ProductCard