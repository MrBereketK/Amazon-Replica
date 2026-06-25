import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import Layout from "../../src/Components/Layout/Layout";
import { DataContext } from "../../src/Components/DataProvider/DataProvider";
import ProductCard from "../../src/Components/Product/ProductCard";
import CurrencyFormat from "../../src/Components/CurrencyFormat/CurrencyFormat";

import "./Cart.css";

const Cart = () => {
  const { state } = useContext(DataContext);
  const basket = state?.basket || [];

  const totalItems = useMemo(() => {
    return basket.reduce((acc, item) => acc + (item.amount || 1), 0);
  }, [basket]);

  const subtotal = useMemo(() => {
    return basket.reduce(
      (acc, item) => acc + item.price * (item.amount || 1),
      0,
    );
  }, [basket]);

  return (
    <Layout>
      <section className="cart">
        <div className="cart__left">
          <h1>Hello</h1>
          <h2>Your shopping basket</h2>
          <hr />

          {basket.length === 0 ? (
            <p className="cart__empty">Your cart is empty</p>
          ) : (
            basket.map((item) => (
              <ProductCard key={item.id} product={item} isCart />
            ))
          )}
        </div>

        <aside className="cart__right">
          <div className="cart__checkout">
            <p className="cart__subtotal">
              <span>Subtotal ({totalItems} items)</span>
              <strong>
                <CurrencyFormat amount={subtotal} />
              </strong>
            </p>

            <div className="cart__gift">
              <input type="checkbox" id="gift" />
              <label htmlFor="gift">This order contains a gift</label>
            </div>

            <Link to="/payments" className="cart__button">
              Continue to checkout
            </Link>
          </div>
        </aside>
      </section>
    </Layout>
  );
};

export default Cart;
