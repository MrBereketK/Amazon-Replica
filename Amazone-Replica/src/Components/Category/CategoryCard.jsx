import React from "react";
import "./CategoryCard.css";
import { Link } from "react-router-dom";
import Category from "./Category";

const CategoryCard = ({ data }) => {
  return (
    <div className="categoryCard">
      <Link to={`/category/${data.category}`}>
        <h2>{data.title}</h2>

        <div className="categoryCard__imageContainer">
          <img
            src={data.image}
            alt={data.title}
            className="categoryCard__image"
          />
        </div>

        <p>Shop Now</p>
      </Link>
    </div>
  );
};

export default CategoryCard;
