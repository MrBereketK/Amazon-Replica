import React, { useContext, useMemo, useState } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import Layout from "../../Components/Layout/Layout";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { db } from "../../Utility/firebase";
import { doc, collection, setDoc } from "firebase/firestore";
import axios from "axios";

import "./Payment.css";

const Payment = () => {
  const {
    state: { basket, user },
    dispatch
  } = useContext(DataContext);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const totalItems = useMemo(() => {
    return basket.reduce((acc, item) => acc + (item.amount || 1), 0);
  }, [basket]);

  const subtotal = useMemo(() => {
    return basket.reduce(
      (acc, item) => acc + item.price * (item.amount || 1),
      0,
    );
  }, [basket]);

  const handleChange = (e) => {
    setError(e.error ? e.error.message : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const response = await axios({
        method: "post",
        url: `${backendUrl}/payment/create?total=${Math.floor(subtotal * 100)}`,
      });

      const clientSecret = response.data.clientSecret;

      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
      } else if (paymentIntent) {
        const orderRef = doc(collection(db, "users", user.uid, "orders"), paymentIntent.id);
        await setDoc(orderRef, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        dispatch({ type: "EMPTY_BASKET" });

        setProcessing(false);
        navigate("/orders", { replace: true });
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred");
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="payment">
        <div className="payment__header">
          <h1>
            Checkout (<span>{totalItems} items</span>)
          </h1>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>

          <div className="payment__content">
            <p>{user?.email}</p>
            <p>Addis Ababa</p>
            <p>Ethiopia</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items</h3>
          </div>

          <div className="payment__content payment__products">
            {basket.map((item) => (
              <ProductCard key={item.id} product={item} isCart />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment__content">
            <div className="payment__cardPlaceholder">
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                
                <div className="payment__summary">
                  <h3>Order Summary</h3>
                  <div className="payment__subtotal">
                    <span>Subtotal</span>
                    <strong>
                      <CurrencyFormat amount={subtotal} />
                    </strong>
                  </div>
                  {error && <div style={{ color: "red", marginBottom: "10px", marginTop: "10px" }}>{error}</div>}
                  <button type="submit" disabled={processing || !stripe || !elements}>
                    {processing ? "Processing..." : "Place Your Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
