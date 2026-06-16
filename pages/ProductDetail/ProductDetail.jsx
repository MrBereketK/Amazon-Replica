import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";

import Layout from "../../src/Components/Layout/Layout";
import Loading from "../../src/Components/Loading/Loading";
import CurrencyFormat from "../../src/Components/CurrencyFormat/CurrencyFormat";

import { baseUrl } from "../../src/Api/endPoint";

import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${baseUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <Layout>
        <Loading message="Loading product..." />
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div style={{ padding: "40px" }}>Product not found.</div>
      </Layout>
    );
  }

  const { image, title, price, description, category, rating } = product;

  return (
    <Layout>
      <div className={styles.productDetail}>
        {/* LEFT SIDE - IMAGE */}
        <div className={styles.productDetail__image}>
          <img src={image} alt={title} />
        </div>

        {/* RIGHT SIDE - INFO */}
        <div className={styles.productDetail__info}>
          <h1>{title}</h1>

          {/* Rating */}
          <div className={styles.productDetail__rating}>
            <Rating value={rating?.rate || 0} precision={0.1} readOnly />
            <span>{rating?.count || 0} ratings</span>
          </div>

          {/* Price */}
          <div className={styles.productDetail__price}>
            <CurrencyFormat amount={price} />
          </div>

          {/* Category */}
          <p className={styles.productDetail__category}>Category: {category}</p>

          <hr />

          {/* Description */}
          <div className={styles.productDetail__description}>
            {/* <h3>About this item</h3> */}
            <p>{description}</p>
          </div>

          {/* CTA BUTTON */}
          <button className={styles.productDetail__button}>Add to Cart</button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
