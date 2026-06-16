import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./Product.css";
import { baseUrl } from "../../Api/endPoint";

const Product = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
axios
  .get(`${baseUrl}/products`)
  .then((res) => setProduct(res.data))
  .catch((err) => console.log(err));
  }, []);

  return (
    <section className="products__container">
      {product.map((singleProduct) => (
        <ProductCard key={singleProduct.id} product={singleProduct} />
      ))}
    </section>
  );
};

export default Product;
