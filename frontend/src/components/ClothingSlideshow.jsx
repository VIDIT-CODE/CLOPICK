import React, { useState, useEffect } from "react";

// Only men's clothing images, high quality and attractive
const slides = [
  {
    image: "https://m.media-amazon.com/images/G/31/MA2025/April/GIF/GIF_PC_._CB795074589_.gif",
    caption: "Men's Casual Shirts",
  },
  {
    image: "https://m.media-amazon.com/images/G/31/img24/Fashion/JuneWRS25Event/TopHero/PC/Gen_Z_1500x460._SX1500_QL85_FMpng_.png",
    caption: "Modern Streetwear",
  },
  {
    image: "https://m.media-amazon.com/images/G/31/IMG25/Fashion/Event/JuneWRS/Header/Event_Strip_PC_rec.png",
    // This is a man wearing a stylish jacket
    caption: "Stylish Jackets",
  },
  {
    image: "https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/June25WRS/af_pc_1x._CB793440700_.jpg",
    caption: "Trendy T-Shirts",
  },
  {
    image: "https://m.media-amazon.com/images/G/31/IMG25/Fashion/Event/JuneWRS/Trends/SeizeTheDay._SX1500_QL85_FMpng_.png",
    caption: "Classic Jeans",
  },
];

const ClothingSlideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      2500
    );
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "96vw",
        margin: "2rem auto",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        position: "relative",
        background: "#222",
        paddingLeft: "1vw",
        paddingRight: "1vw"
      }}
    >
      <img
        src={slides[current].image}
        alt={slides[current].caption}
        style={{
          width: "100%",
          height: "420px",
          objectFit: "cover",
          display: "block",
          transition: "opacity 0.5s"
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          background: "rgba(0,0,0,0.5)",
          color: "#fff",
          padding: "1.5rem 2rem",
          fontSize: "2rem",
          letterSpacing: "1px"
        }}
      >
        {slides[current].caption}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "30px",
          display: "flex",
          gap: "10px"
        }}
      >
        {slides.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: idx === current ? "#fff" : "#888",
              display: "inline-block"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ClothingSlideshow;
