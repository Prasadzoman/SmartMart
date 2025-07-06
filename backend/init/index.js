const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('../models/product');

const brands = ['Nestle','Britannia','Amul','Tata','Maggi'];

const fetchProductsByBrand = async (brand) => {
  const response = await axios.get('https://world.openfoodfacts.org/cgi/search.pl', {
    params: {
      search_terms: brand,
      search_simple: 1,
      action: 'process',
      json: 1,
      page_size: 100
    }
  });

  const products = response.data.products;

  console.log(`${brand}: Fetched ${products.length} products`);

  return products
    .filter(p => (p.image_front_url || p.image_url) && p.product_name)
    .slice(0, 20)
    .map(p => ({
      name: p.product_name,
      brand,
      price: Math.floor(Math.random() * 100) + 10,
      category: p.categories_tags?.[0] || 'misc',
      stock: Math.floor(Math.random() * 50) + 1,
      description: p.generic_name || '',
      imageUrl: p.image_front_url || p.image_url || '',

      // Nutritional values
      energy_kcal_100g: p.nutriments?.energy_kcal_100g || null,
      fat_100g: p.nutriments?.fat_100g || null,
      saturated_fat_100g: p.nutriments?.['saturated-fat_100g'] || null,
      carbohydrates_100g: p.nutriments?.carbohydrates_100g || null,
      sugars_100g: p.nutriments?.sugars_100g || null,
      fiber_100g: p.nutriments?.fiber_100g || null,
      proteins_100g: p.nutriments?.proteins_100g || null,
      salt_100g: p.nutriments?.salt_100g || null,

      nutriscore_grade: p.nutriscore_grade || 'unknown',
      nova_group: p.nova_group || null,
      allergens: p.allergens_tags?.map(tag => tag.replace('en:', '')) || [],
      additives: p.additives_tags?.map(tag => tag.replace('en:', '')) || [],
    }));
};


const seedDB = async () => {
  try {
    await Product.deleteMany({});
    console.log('🧹 Cleared existing products');

    for (const brand of brands) {
      try {
        console.log(`🔍 Fetching products for brand: ${brand}`);
        const products = await fetchProductsByBrand(brand);
        await Product.insertMany(products);
        console.log(`✅ Inserted ${products.length} items for ${brand}`);
      } catch (error) {
        console.error(`❌ Seeding failed for ${brand}:`, error.message);
      }

      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    console.log('🌱 Seeding complete!');
    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

const start = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/SmartMart', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
    await seedDB();
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

start();
