// seedOrders.js
const mongoose = require('mongoose');
const Order = require('../models/order');

// Dummy orders data
const orders = require('./data/orders'); // Your file with final orders

// Connect to DB
mongoose.connect('mongodb://localhost:27017/SmartMart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("Connected to DB");

  // Optional: clear existing orders
  await Order.deleteMany({});
  console.log("Old orders removed");

  // Insert new orders
  await Order.insertMany(orders);
  console.log("New orders inserted");

  mongoose.connection.close();
}).catch(err => {
  console.error("DB connection error:", err);
});
