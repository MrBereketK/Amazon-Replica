import React from "react";
import "./CategoryCard.css";

const CategoryCard = ({ data }) => {
  return (
    <div className="categoryCard">
      <a href="/">
        <h2>{data.title}</h2>

        <div className="categoryCard__imageContainer">
          <img
            src={data.image}
            alt={data.title}
            className="categoryCard__image"
          />
        </div>

        <p>Shop Now</p>
      </a>
    </div>
  );
};

export default CategoryCard;
