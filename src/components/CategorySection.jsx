// src/components/CategorySection.jsx
import React from "react";
import "./CategorySection.css";

// Use the original links you provided earlier for each category
const categories = [
  { name: "Shirts", image: "https://m.media-amazon.com/images/G/31/MA2025/April/GIF/GIF_PC_._CB795074589_.gif" },
  { name: "T-Shirts", image: "https://m.media-amazon.com/images/G/31/img24/Fashion/JuneWRS25Event/TopHero/PC/Gen_Z_1500x460._SX1500_QL85_FMpng_.png" },
  { name: "Jeans", image: "https://m.media-amazon.com/images/G/31/IMG25/Fashion/Event/JuneWRS/Trends/SeizeTheDay._SX1500_QL85_FMpng_.png" },
  { name: "Jackets", image: "https://m.media-amazon.com/images/G/31/IMG25/Fashion/Event/JuneWRS/Header/Event_Strip_PC_rec.png" },
  { name: "Hoodies", image: "https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/June25WRS/af_pc_1x._CB793440700_.jpg" },
  { name: "Cargos", image: "https://m.media-amazon.com/images/G/31/MA2025/April/GIF/GIF_PC_._CB795074589_.gif" },
  { name: "Ethnic Wear", image: "https://m.media-amazon.com/images/G/31/IMG25/Fashion/Event/JuneWRS/Header/Event_Strip_PC_rec.png" },
  { name: "Footwear", image: "https://m.media-amazon.com/images/G/31/img24/Fashion/JuneWRS25Event/TopHero/PC/Gen_Z_1500x460._SX1500_QL85_FMpng_.png" },
];

const CategorySection = () => (
  <section className="category-section-attractive">
    <h2 className="category-title-attractive">
      <span role="img" aria-label="category">🛍️</span> Shop by Category
    </h2>
    <div className="category-grid-attractive">
      {categories.map((cat) => (
        <div className="category-card-attractive" key={cat.name}>
          <div className="category-img-wrapper">
            <img src={cat.image} alt={cat.name} className="category-img-attractive" />
          </div>
          <div className="category-name-attractive">{cat.name}</div>
        </div>
      ))}
    </div>
  </section>
);

export default CategorySection;
