const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    default: "Unknown"
  },
  category: String,
  price: {
    type: Number,
    required: true,
  },
  stock: Number,
  description: String,
  imageUrl: String,

  
  energy_kcal_100g: Number,
  fat_100g: Number,
  saturated_fat_100g: Number,
  carbohydrates_100g: Number,
  sugars_100g: Number,
  fiber_100g: Number,
  proteins_100g: Number,
  salt_100g: Number,

  
  nutriscore_grade: {
  type: String,
  enum: ['a', 'b', 'c', 'd', 'e', 'unknown', 'not-applicable'],
},
  nova_group: {
    type: Number,
    enum: [1, 2, 3, 4]
  },
  allergens: [String],
  additives: [String]
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
