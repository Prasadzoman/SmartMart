const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');
const { isLoggedIn } = require('../middleware'); 


router.post('/add', isLoggedIn, async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    cart.updatedAt = Date.now();
    await cart.save();
    res.status(200).json({ message: 'Added to cart', cart });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});


router.post('/remove', isLoggedIn, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ message: 'Removed from cart', cart });
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});


router.get('/', isLoggedIn, async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({ message: 'Your cart is empty', items: [] });
    }

    res.status(200).json({
      message: 'Cart retrieved successfully',
      items: cart.items,
      updatedAt: cart.updatedAt,
    });
  } catch (err) {
    console.error('View cart error:', err);
    res.status(500).json({ error: 'Failed to retrieve cart' });
  }
});

module.exports = router;
