const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, async () => {
  await Product.deleteMany();

  await Product.create({
    title: 'Sample Product',
    description: 'This is a sample product description.',
    price: 499,
    images: ['https://via.placeholder.com/150'],
    rating: 4.5,
    sales: 150
  });

  console.log('Seeded successfully');
  process.exit();
});