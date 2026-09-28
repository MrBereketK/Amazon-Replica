import React, { useContext, useEffect, useState } from 'react';
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { db } from "../../Utility/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../../Components/Product/ProductCard";
import "./Orders.css";

const Orders = () => {
  const { state: { user } } = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Layout>
      <div className="orders">
        <h1>Your Orders</h1>
        <div className="orders__order">
          {orders?.length === 0 ? (
            <p style={{ padding: "20px" }}>You have no orders yet.</p>
          ) : (
            orders?.map((order) => (
              <div key={order.id} className="order__container">
                <h2>Order ID: {order.id}</h2>
                <div className="order__products">
                  {order.data.basket?.map((item) => (
                    <ProductCard key={item.id} product={item} isCart />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
