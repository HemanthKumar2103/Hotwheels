import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  if (!user?._id) return;

  axios
    .get(`http://localhost:5000/api/orders/${user._id}`)
    .then((res) => setOrders(res.data));
}, [user?._id]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">📦 Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-5 rounded-xl shadow mb-5"
          >
            <div className="flex justify-between mb-3">
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </span>
              <span className="font-bold text-green-600">
                ₹{order.total}
              </span>
            </div>

            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm border-t py-2"
              >
                <span>{item.name}</span>
                <span>
                  ₹{item.price} × {item.qty}
                </span>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;