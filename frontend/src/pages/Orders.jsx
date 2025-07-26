import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Orders.css';

const Orders = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await axios.get('https://smartmart-server.onrender.com/orders', {
        withCredentials: true,
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  useEffect(() => {
    if (!user) navigate('/login');
    else fetchOrders();
  }, [user]);

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={item.product._id + idx} className="order-item">
                  <img src={item.product.imageUrl} alt={item.product.name} />
                  <div>
                    <p><strong>{item.product.name}</strong></p>
                    <p>Qty: {item.quantity}</p>
                    <p>₹{item.product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
