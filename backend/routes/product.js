const express=require("express");
const Product=require("../models/product");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Product.find({});
    console.log("Products fetched:", data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports=router;