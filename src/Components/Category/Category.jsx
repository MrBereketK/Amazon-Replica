import React from "react";
import "./Category.css";

import { CategoryInfo } from "./CategoryFullInfos";
import CategoryCard from "./CategoryCard";

const Category = () => {
  return (
    <section className="category">
      {CategoryInfo.map((item, index) => (
        <CategoryCard key={index} data={item} />
      ))}
    </section>
  );
};

export default Category;
