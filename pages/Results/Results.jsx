import React, { useState, useEffect } from "react";
import Layout from "../../src/Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../src/Components/Product/ProductCard";
import classes from "./Results.module.css";

const Results = () => {
  const [result, setResult] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => setResult(res.data))
      .catch((err) => console.log(err));
  }, [category]);

  return (
    <Layout>
      <section className={classes.results}>
        <h1>Results</h1>

        <p>
          Category / <span>{category}</span>
        </p>

        <hr />

        <div className={classes.products__container}>
          {result.map((singleProduct) => (
            <ProductCard key={singleProduct.id} product={singleProduct} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Results;
