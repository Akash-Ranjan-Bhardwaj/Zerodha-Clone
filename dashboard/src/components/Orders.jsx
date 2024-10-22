import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios

import { Link } from "react-router-dom";

const Orders = () => {

  const [orderArray, setOrderArray]= useState([]);


  useEffect(function () {
    const fetchOrders = async function () {
      try {
        const response = await axios.get("http://localhost:3002/api/orders");
        console.log(response.data);
        setOrderArray(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, [orderArray]);
  







  return (
    <div className="orders">
      {orderArray.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn get-started-btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="order-list">
          {orderArray.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3 className="order-title">{order.name}</h3>
                <span className={`order-mode ${order.mode === "BUY" ? "buy" : "sell"}`}>
                  {order.mode}
                </span>
              </div>
              <div className="order-details">
                <p><strong>Price:</strong> ₹{order.price}</p>
                <p><strong>Quantity:</strong> {order.qty}</p>
                <p className="order-id"><strong>Order ID:</strong> {order._id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}
export default Orders;
