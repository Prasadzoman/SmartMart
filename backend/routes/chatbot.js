const express=require("express");
const Product=require("../models/product");
const router = express.Router();
const { detectCondition } = require("../script/medModel");
router.post("/", async (req, res) => {
  const { message } = req.body;
  console.log("Incoming message:", message);

  try {
    const condition = await detectCondition(message);
    console.log("Detected condition:", condition);

    const filters = {};

    
    if (condition === "diabetes") {
      filters.sugars_100g = { $lte: 5 };
    } else if (condition === "hypertension") {
      filters.salt_100g = { $lte: 0.3 };
    } else if (condition === "anemia") {
      filters.description = /iron|spinach/i;
    }

    
    const priceMatch = message.match(/(?:under|below|less than)\s*(\d+)/i);
    if (priceMatch) {
      const maxPrice = parseInt(priceMatch[1]);
      filters.price = { $lte: maxPrice };
    }

    
    const knownCategories = ["snacks", "juice", "dairies", "ice cream", "beverages"];
    const foundCategory = knownCategories.find((cat) =>
      message.toLowerCase().includes(cat.toLowerCase())
    );
    if (foundCategory) {
      filters.category = { $regex: foundCategory, $options: "i" };
    }

    const products = await Product.find(filters).limit(10);

    res.json({
      response: `Based on ${condition}${foundCategory ? ` and category "${foundCategory}"` : ""}${priceMatch ? ` under ₹${priceMatch[1]}` : ""}, here are your product suggestions:`,
      products,
    });
  } catch (err) {
    console.error("Chatbot error:", err.message);
    res.status(500).json({ error: "Something went wrong with the assistant." });
  }
});

module.exports=router;