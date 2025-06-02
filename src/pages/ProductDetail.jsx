import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2>Product Not Found</h2>;

  return (
    <div className="product-detail">
      <div className="gallery">
        {product.images.map((src, index) => (
          <img key={index} src={src} alt={product.title} />
        ))}
      </div>

      <div className="info">
        <h1>{product.title}</h1>
        <p className="rating">Rating: ⭐ {product.rating}</p>
        <h2 className="price">{product.price}</h2>
        <p className="desc">{product.description}</p>

        <div className="details">
          <h3>Product Details:</h3>
          <ul>
            <li>Material: {product.details.material}</li>
            <li>Fit: {product.details.fit}</li>
            <li>Wash Instructions: {product.details.wash}</li>
            <li>Color: {product.details.color}</li>
          </ul>
        </div>

        <div className="a-plus">
          <h3>A+ Content</h3>
          <p>{product.aPlusContent}</p>
        </div>

        <div className="actions">
          <button className="buy-btn">Buy Now</button>
          <button className="add-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
