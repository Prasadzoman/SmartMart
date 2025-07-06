const express = require('express');
const predictReorders = require('../script/ml_model');
const { isLoggedIn } = require('../middleware');
const Product = require('../models/product');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
  console.log("🔁 Reorder route hit");

  try {
    const predictions = await predictReorders();
    const userId = req.user._id.toString();

    const userPredictions = await Promise.all(
      Object.entries(predictions)
        .filter(([key]) => key.startsWith(userId))
        .map(async ([key, value]) => {
          const productId = key.split('_')[1];
          const product = await Product.findById(productId).lean();

          if (!product) return null;

          return {
            ...value,
            product: {
              _id: product._id,
              name: product.name,
              imageUrl: product.imageUrl,
              price: product.price,
              description: product.description,
              category: product.category,
            },
          };
        })
    );

    // Filter out nulls in case a product wasn't found
    res.json(userPredictions.filter(Boolean));
  } catch (err) {
    console.error('❌ Prediction error:', err);
    res.status(500).json({ error: 'Failed to generate predictions' });
  }
});

module.exports = router;
