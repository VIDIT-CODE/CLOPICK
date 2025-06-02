import React from 'react';
import { useParams } from 'react-router-dom';
const ProductPage = () => {
  const { id } = useParams();
  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl">Product Details for ID: {id}</h1>
    </div>
  );
};
export default ProductPage;