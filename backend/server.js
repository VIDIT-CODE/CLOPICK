const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

// Route Imports
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');            // Customer auth (includes OTP)
const sellerAuthRoutes = require('./routes/sellerAuth'); // Seller auth

const app = express();

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, etc.) or from localhost
    if (!origin || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Explicitly handle preflight OPTIONS requests for all routes
app.options('*', cors({
  origin: (origin, callback) => {
    if (!origin || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Enable Mongoose debug mode (optional)
mongoose.set('debug', true);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/products', productRoutes);   // Product-related endpoints
app.use('/api/auth', authRoutes);          // Customer registration/login/OTP
app.use('/api/seller', sellerAuthRoutes);  // Seller registration/login/OTP

// Default Route
app.get('/', (req, res) => {
  res.send('🚀 CLOPICK API is running...');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
