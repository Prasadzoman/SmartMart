import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Cart.css';


const Cart = () => {
  const { user, removeFromCart } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:3000/cart', {
        withCredentials: true,
      });
      setCartItems(res.data.items);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const handlePlaceOrder = async () => {
  try {
    const items = cartItems.map(item => ({
      product: item.product._id,
      quantity: item.quantity
    }));

    await axios.post(
      'http://localhost:3000/orders',
      { items }, // ✅ send correct data
      { withCredentials: true }
    );

    alert('Order placed successfully!');
    fetchCart(); // refresh cart
  } catch (err) {
    console.error('Order failed:', err);
    alert('Order failed!');
  }
};


  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchCart();
    }
  }, [user]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Shop now</Link></p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.product._id} className="cart-item">
              <img src={item.product.imageUrl} alt={item.product.name} />
              <div className="cart-info">
                <h3>{item.product.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.product.price}</p>
                <button onClick={() => {
                  removeFromCart(item.product._id);
                  setCartItems((prev) =>
                    prev.filter((p) => p.product._id !== item.product._id)
                  );
                }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
            <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
