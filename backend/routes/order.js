const express = require('express');
const Order = require('../models/order');
const Product = require('../models/product');
const router = express.Router();
const Cart = require('../models/cart');
// Middleware to check auth
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Unauthorized" });
};

// POST /order - Place a new order
router.post('/', isLoggedIn, async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'No items to order' });
  }

  try {
    const order = new Order({
      user: req.user._id,
      items,
    });

    await order.save();
    await Cart.findOneAndDelete({ user: req.user._id });
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

// GET /order - View user's orders
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

module.exports = router;
