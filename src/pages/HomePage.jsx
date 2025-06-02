import React from 'react';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';

const mockProducts = [
  { title: 'Saffron Hoodie', price: 799, image: 'https://via.placeholder.com/150' },
  { title: 'Stylish Jeans', price: 1199, image: 'https://via.placeholder.com/150' },
  { title: 'Cool Sneakers', price: 1599, image: 'https://via.placeholder.com/150' }
];

function HomePage() {
  return (
    <div>
      <Banner />
      <h3 style={{ padding: '1rem' }}>Trending Products</h3>
      <div className="product-grid">
        {mockProducts.map((prod, idx) => (
          <ProductCard key={idx} product={prod} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
