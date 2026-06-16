import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Layout from "../../src/Components/Layout/Layout";
import ProductCard from "../../src/Components/Product/ProductCard";
import Loading from "../../src/Components/Loading/Loading";

import { baseUrl } from "../../src/Api/endPoint";

import "./ProductDetail.module.css";

const ProductDetail = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [productId]);

  if (!product) {
    return (
      <Layout>
        <Loading message="Loading product..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="productDetail">
        <div className="productDetail__left">
          <ProductCard product={product} detailPage={true} />
        </div>

        <div className="productDetail__right">
          {/* Reserved for future features */}

          <h3>Product Information</h3>

          <p>Later you can add:</p>

          <ul>
            <li>Delivery information</li>
            <li>Stock availability</li>
            <li>Quantity selector</li>
            <li>Buy Now button</li>
            <li>Related products</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
