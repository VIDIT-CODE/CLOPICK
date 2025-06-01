// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
  image: String,
  rating: Number,
  details: String,
  plusContent: String,
});

module.exports = mongoose.model('Product', productSchema);
