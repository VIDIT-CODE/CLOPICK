import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./TrendingProducts.css";
import ProductCard from "./ProductCard";
import { CartContext } from "../context/CartContext"; // Import CartContext

const TrendingProducts = () => {
  const products = [
    {
      id: 1,
      title: "Regular Fit Polo T-Shirt",
      price: 714,
      image: "https://m.media-amazon.com/images/I/71eUwDk8z+L._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
      id: 2,
      title: "Dotted Oversized Tshirt",
      price: 279,
      image: "https://m.media-amazon.com/images/I/71U69KZLpvL._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
      id: 3,
      title: "Mens Sports T-Shirts",
      price: 297,
      image: "https://m.media-amazon.com/images/I/616bDUoOBjL._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
      id: 4,
      title: "Leriya Textured Shirts",
      price: 499,
      image: "https://m.media-amazon.com/images/I/61hmjIQ3tqL._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
      id: 5,
      title: "Stylish Hoodie",
      price: 899,
      image: "https://m.media-amazon.com/images/I/618LnLuG2HL._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
      id: 6,
      title: "Mens Cargo Pants",
      price: 649,
      image: "https://m.media-amazon.com/images/I/51NSC2qvOxL._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
      id: 7,
      title: "Smart Casual Shirt",
      price: 699,
      image: "https://m.media-amazon.com/images/I/61R1R+tsmLL._AC_UL480_FMwebp_QL65_.jpg",
    },
    {
      id: 8,
      title: "Trendy Jeans",
      price: 779,
      image: "https://m.media-amazon.com/images/I/815gdBdQIOL._AC_UL480_FMwebp_QL65_.jpg",
    },
  ];

  return (
    <div className="trending-container">
      <h2>Trending Products</h2>
      <div className="trending-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
