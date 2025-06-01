import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

const mockDetails = {
	1: {
		rating: 4.3,
		reviews: 124,
		lastMonthSales: 320,
		offers: ["10% Instant Discount on Credit Cards", "Free Delivery"],
		discount: "15% off",
		details: "Premium cotton polo t-shirt with regular fit and soft feel.",
	},
	2: {
		rating: 4.1,
		reviews: 98,
		lastMonthSales: 210,
		offers: ["5% Cashback on select cards", "No Cost EMI"],
		discount: "20% off",
		details: "Trendy oversized t-shirt with dotted pattern for casual style.",
	},
	3: {
		rating: 4.5,
		reviews: 201,
		lastMonthSales: 410,
		offers: ["Flat ₹50 off on first order", "Free Delivery"],
		discount: "10% off",
		details: "Breathable sports t-shirt for men, perfect for workouts.",
	},
	4: {
		rating: 4.0,
		reviews: 77,
		lastMonthSales: 150,
		offers: ["Extra 5% off on 2+ items", "Free Returns"],
		discount: "12% off",
		details: "Textured shirt with modern fit, suitable for all occasions.",
	},
	5: {
		rating: 4.6,
		reviews: 180,
		lastMonthSales: 350,
		offers: ["10% off on prepaid orders", "Free Delivery"],
		discount: "18% off",
		details: "Stylish hoodie with fleece lining for extra comfort.",
	},
	6: {
		rating: 4.2,
		reviews: 110,
		lastMonthSales: 200,
		offers: ["Flat ₹100 off", "No Cost EMI"],
		discount: "14% off",
		details: "Durable cargo pants with multiple pockets and relaxed fit.",
	},
	7: {
		rating: 4.4,
		reviews: 134,
		lastMonthSales: 270,
		offers: ["Buy 1 Get 1 Free", "Free Delivery"],
		discount: "25% off",
		details: "Smart casual shirt for office and outings.",
	},
	8: {
		rating: 4.3,
		reviews: 156,
		lastMonthSales: 300,
		offers: ["10% Cashback", "Free Delivery"],
		discount: "17% off",
		details: "Trendy jeans with stretchable fabric and modern fit.",
	},
};

const ProductDetail = () => {
	const { state } = useLocation();
	const { id } = useParams();
	const navigate = useNavigate();
	const product = state?.product;
	const details = mockDetails[id];

	if (!product || !details) {
		return (
			<div style={{ padding: "2rem", textAlign: "center" }}>
				Product not found.
			</div>
		);
	}

	return (
		<div className="product-detail-amazonlike" style={{ paddingLeft: "1vw", paddingRight: "1vw", textAlign: "left" }}>
			<div className="product-detail-amazonlike-main">
				{/* Thumbnails section */}
				<div className="product-detail-thumbnails">
					{[product.image, ...(product.images || [
						product.image,
						product.image,
						product.image,
						product.image,
						product.image,
						product.image,
					])].slice(0, 6).map((img, idx) => (
						<img
							key={idx}
							src={img}
							alt={`thumb-${idx}`}
							className="product-detail-thumb-img"
							onClick={() => {
								const mainImg = document.getElementById("main-product-image");
								if (mainImg) mainImg.src = img;
							}}
						/>
					))}
				</div>
				<div className="product-detail-amazonlike-image">
					<img id="main-product-image" src={product.image} alt={product.title} />
				</div>
				<div className="product-detail-amazonlike-info">
					<h1 className="pd-title">{product.title}</h1>
					<div className="pd-rating-row">
						{/* Render 5 stars: each star is either full, partial, or empty */}
						<span className="pd-rating">
							{Array.from({ length: 5 }).map((_, i) => {
								const rating = details.rating;
								const starValue = i + 1;
								if (starValue <= Math.floor(rating)) {
									// Full star
									return (
										<span
											key={i}
											className="pd-star"
											style={{
												color: "#ffd700",
												background: "#fff",
												border: "1.2px solid #232526",
												borderRadius: "3px",
												marginRight: "2px",
												padding: "0 1px",
												fontSize: "1.15rem",
												lineHeight: 1,
												display: "inline-block",
												verticalAlign: "middle",
											}}
										>
											★
										</span>
									);
								} else if (starValue - 1 < rating && rating < starValue) {
									// Partial star (show filled part and empty part)
									const percent = Math.round((rating - (starValue - 1)) * 100);
									return (
										<span
											key={i}
											className="pd-star"
											style={{
												position: "relative",
												display: "inline-block",
												width: "1.15em",
												verticalAlign: "middle",
												background: "#fff",
												border: "1.2px solid #232526",
												borderRadius: "3px",
												marginRight: "2px",
												padding: "0 1px",
												lineHeight: 1,
												overflow: "hidden"
											}}
										>
											<span
												style={{
													position: "absolute",
													left: 0,
													top: 0,
													width: `${percent}%`,
													height: "100%",
													overflow: "hidden",
													color: "#ffd700",
													whiteSpace: "nowrap",
												}}
											>★</span>
											<span
												style={{
													color: "#e0e0e0",
													position: "absolute",
													left: 0,
													top: 0,
													width: "100%",
													height: "100%",
													whiteSpace: "nowrap",
												}}
											>★</span>
										</span>
									);
								} else {
									// Empty star
									return (
										<span
											key={i}
											className="pd-star"
											style={{
												color: "#e0e0e0",
												background: "#fff",
												border: "1.2px solid #232526",
												borderRadius: "3px",
												marginRight: "2px",
												padding: "0 1px",
												fontSize: "1.15rem",
												lineHeight: 1,
												display: "inline-block",
												verticalAlign: "middle",
											}}
										>
											★
										</span>
									);
								}
							})}
							<span style={{ color: "#232526", marginLeft: 8, fontWeight: 700 }}>{details.rating}</span>
						</span>
						<span className="pd-reviews">{details.reviews} ratings</span>
					</div>
					<div className="pd-sales" style={{ color: "#388e3c", fontWeight: 600, margin: "0.3rem 0 1.1rem 0" }}>
						{details.lastMonthSales}+ bought in last month
					</div>
					<div className="pd-price-row">
						<span className="pd-price">₹{product.price}</span>
						<span className="pd-discount">{details.discount}</span>
					</div>
					<div className="pd-offers-block">
						<h4>Available offers</h4>
						<ul>
							{details.offers.map((offer, idx) => (
								<li key={idx}>{offer}</li>
							))}
						</ul>
					</div>
					<div className="pd-details-block">
						<h4>Product Details</h4>
						<p>{details.details}</p>
					</div>
				</div>
				<div className="product-detail-amazonlike-buybox">
					<div className="pd-buybox-price">₹{product.price}</div>
					<div className="pd-buybox-discount">{details.discount}</div>
					<button
						className="pd-buybox-buynow"
						onClick={() => {
							navigate("/checkout", { state: { product } });
						}}
					>
						Buy Now
					</button>
					<div className="pd-buybox-secure">Secure transaction</div>
					<div className="pd-buybox-delivery">FREE delivery: <span>Tomorrow</span></div>
					<div className="pd-buybox-stock">In stock</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
