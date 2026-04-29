import React from 'react';
import './OrderPage.css';
import { MdOutlineLocationOn } from 'react-icons/md'; // Material Design location icon
import mealImage from '../assets/food-plate.png'; // Placeholder image for the plate preview

const OrderPage: React.FC = () => {
	const foodItems = [
		{ name: 'Chicken', info: '165 Kcal/250g', tags: ['Thigh', 'Grilled', '250g'], price: 350 },
		{ name: 'Keeri Samba', info: '165 Kcal/150g', tags: ['Cooked', 'Steamed'], price: 150 },
		{ name: 'Broccoli', info: '165 Kcal/100g', tags: ['Florets', 'Steamed'], price: 80 },
		{ name: 'White Egg', info: '65 Kcal/1', tags: ['Boiled'], price: 100 },
	];

	return (
		<div className="order-container">
			{/* LEFT COLUMN: Delivery & Payment */}
			<div className="sidebar">
				<section className="card">
					<h3 className="card-label">Delivery or Pickup</h3>
					<div className="toggle-options">
						<div className="toggle-btn active">
							<p className="main-text">Deliver to Me</p>
							<p className="sub-text">Estimated 45 minutes</p>
							<p className="popular-badge">Most Popular</p>
						</div>
						<div className="toggle-btn">
							<p className="main-text">Pick Up</p>
							<p className="sub-text">Select a Location</p>
						</div>
					</div>
					<div className="address-display">
						<div className="address-icon">
							<MdOutlineLocationOn size={16} color="var(--lime-green)" />
						</div>

						<div className="address-text">
							<strong>Home</strong>
							<p>2 Galle Road, Colombo 03, Sri Lanka</p>
						</div>
						<button className="change-link">Change</button>
					</div>
				</section>

				<section className="payment-card">
					<div className="payment-header">
						<h3 className="payment-label">PAYMENT</h3>
						<button className="manage-btn">Manage Cards</button>
					</div>
					<div className="payment-tabs">
						<button className="tab-item active">Card</button>
						<button className="tab-item">Cash</button>
					</div>
					<div className="selected-method">
						<div className="custom-radio">
							<div className="radio-inner"></div>
						</div>
						<div className="visa-logo">
							<span>VISA</span>
						</div>
						<div className="method-details">
							<p className="card-number">4821 *****</p>
							<p className="expiry">Expires 09/27</p>
						</div>
						<span className="default-tag">Default</span>
					</div>
					<button className="add-card-full">Add Card</button>
				</section>
			</div>

			{/* CENTER COLUMN: Order Summary */}
			<main className="main-summary">
				<h3 className="card-label-orderSummery">Order Summary</h3>
				<div className="summary-body">
					<p className="bowl-title">"Post-Leg-Day Recovery Bowl"</p>
					<ul className="item-list">
						{foodItems.map((item, index) => (
							<li key={index} className="list-item">
								<div className="item-dot"></div>
								<div className="item-content">
									<p className="item-header">
										{item.name} <span className="item-kcal">{item.info}</span>
									</p>
									<div className="tag-container">
										{item.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
									</div>
								</div>
								<span className="price-text">LKR {item.price}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="nutrition-strip">
					<div className="stat"><strong>40g</strong><span>Protein</span></div>
					<div className="stat"><strong>35g</strong><span>Carbs</span></div>
					<div className="stat"><strong>15g</strong><span>Fats</span></div>
					<div className="stat"><strong>450</strong><span>Kcal</span></div>
				</div>

				<div className="checkout-area">
					<p className="disclaimer">Please note all seasoning are included</p>
					<div className="receipt-row"><span>Subtotal</span><span>LKR 910</span></div>
					<div className="receipt-row"><span>Delivery Fee</span><span>LKR 150</span></div>
					<div className="receipt-row"><span>Service Charge</span><span>LKR 45</span></div>

					<div className="total-row">
						<span>TOTAL</span>
						<span>LKR 1,105</span>
					</div>

					<button className="place-order-btn">Place your Order</button>
					<p className="security-text">256-bit SSL encrypted · Payments secured by Stripe</p>
				</div>
			</main>

			{/* RIGHT COLUMN: Plate Preview */}
			<div className="plate-sidebar">
				<div className="card-plate">
					<div className="card-label-yourPlate">
						<h3>Your Plate</h3>
						<span className="goal-badge">MUSCLE GAIN</span>
					</div>
					<img src={mealImage} alt="Meal" className="meal-img" />
				</div>
			</div>
		</div>
	);
};

export default OrderPage;