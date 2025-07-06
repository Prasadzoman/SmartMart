// script/reorderModel.js
const mongoose = require('mongoose');
const Order = require('../models/order');
const { format } = require('date-fns');

async function connectDB() {
  await mongoose.connect('mongodb://localhost:27017/SmartMart');
}

async function getOrderData() {
  const orders = await Order.find({})
    .populate('user')
    .populate('items.product');

  const userProductHistory = {};

  orders.forEach((order) => {
    if (!order.user) return;
    const userId = order.user._id.toString();

    order.items.forEach((item) => {
      if (!item.product) return;
      const productId = item.product._id.toString();
      const key = `${userId}_${productId}`;

      if (!userProductHistory[key]) userProductHistory[key] = [];
      userProductHistory[key].push(new Date(order.createdAt));
    });
  });

  return userProductHistory;
}

function trainReorderModel(userProductMap) {
  const predictions = {};

  for (const key in userProductMap) {
    const dates = userProductMap[key].sort((a, b) => a - b);
    if (dates.length < 2) continue;

    const intervals = [];
    for (let i = 1; i < dates.length; i++) {
      intervals.push((dates[i] - dates[i - 1]) / (1000 * 3600 * 24));
    }

    const avgDays = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const lastPurchase = dates[dates.length - 1];
    const nextPrediction = new Date(lastPurchase.getTime() + avgDays * 24 * 3600 * 1000);

    predictions[key] = {
      averageInterval: Math.round(avgDays),
      nextLikelyPurchase: format(nextPrediction, 'yyyy-MM-dd'),
    };
  }

  return predictions;
}

async function predictReorders() {
  await connectDB();
  const history = await getOrderData();
  const predictions = trainReorderModel(history);
  return predictions;
}

module.exports = predictReorders;
