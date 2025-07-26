
const mongoose = require('mongoose');
const Order = require('../models/order');

const orders = require('./data/orders'); 


mongoose.connect('mongodb://localhost:27017/SmartMart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log("Connected to DB");

  await Order.deleteMany({});
  console.log("Old orders removed");

  
  await Order.insertMany(orders);
  console.log("New orders inserted");

  mongoose.connection.close();
}).catch(err => {
  console.error("DB connection error:", err);
});
