import React, { use, useEffect, useState } from 'react';
import IngredientModal from '../modals/IngredientModal';
import './MealBuilder.css';
import food_plate from '../assets/food-plate.png';
import { Link } from 'react-router-dom';

interface PlateItem {
	id: string;
	name: string;
	cut: string;
	grams: number;
	cookStyle: string;
	macros: { protein: string; carbs: string; fats: string; kcal: string };
	price: string;
	image: string;
}

const MealBuilder: React.FC = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [activeIngredient, setActiveIngredient] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState('Meat');
	const [plateItems, setPlateItems] = useState<PlateItem[]>([]);
	const [selectedDelivery, setSelectedDelivery] = useState('now');

	const categories = ['Meat', 'Seafood', 'Vegetables', 'Carbs', 'Dairy', 'Eggs', 'Extras'];

	useEffect(() => {
		let x = 5
		let y = 3
		x = y
		x + 5

		console.log(x);
	}, []);

	const ingredientsByCategory: { [key: string]: string[] } = {
		Meat: ['Chicken', 'Beef', 'Mutton'],
		Seafood: ['Salmon', 'Tuna', 'Shrimp'],
		Vegetables: ['Broccoli', 'Spinach', 'Carrots'],
		Carbs: ['Rice', 'Quinoa', 'Pasta'],
		Dairy: ['Cheese', 'Milk', 'Yogurt'],
		Eggs: ['Eggs'],
		Extras: ['Nuts', 'Seeds', 'Oils']
	};

	// Handle drag start
	const handleDragStart = (e: React.DragEvent, ingredient: string) => {
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('ingredient', ingredient);
	};

	// Handle drag over plate
	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	};

	// Handle drop on plate
	const handleDropOnPlate = (e: React.DragEvent) => {
		e.preventDefault();
		const ingredient = e.dataTransfer.getData('ingredient');
		setActiveIngredient(ingredient);
		setModalOpen(true);
	};

	// Function to add item to plate
	const handleAddToPlate = (item: PlateItem) => {
		setPlateItems(prev => [...prev, item]);
	};

	// Function to remove item from plate
	const handleRemoveItem = (id: string) => {
		setPlateItems(prev => prev.filter(item => item.id !== id));
	};

	return (
		<div>
			<div className="builder-page">
				{/* --- LEFT SIDEBAR: INGREDIENTS --- */}
				<aside className="ingredients-sidebar">
					<h5 className="sidebar-title">INGREDIENTS</h5>
					<div className="category-grid">
						{categories.map(cat => (
							<button
								key={cat}
								className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
								onClick={() => setSelectedCategory(cat)}
							>
								{cat}
							</button>
						))}
					</div>

					<div className="ingredient-list">
						{(ingredientsByCategory[selectedCategory] || []).map(item => (
							<div
								key={item}
								className="ingredient-card"
								draggable
								onDragStart={(e) => handleDragStart(e, item)}
							>
								<div className="ing-info">
									<span className="ing-name">{item}</span>
									<span className="ing-cal">165 Kcal/100g</span>
								</div>
								<button
									className="drag-btn"
									onClick={(e) => {
										e.stopPropagation();
									}}
								>
									Drag
								</button>
							</div>
						))}
					</div>
				</aside>

				{/* --- CENTER: THE PLATE --- */}
				<main className="plate-container">
					<p className="instruction-text">DRAG INGREDIENTS TO YOUR PLATE</p>
					<div className="arrow-down">↓</div>

					<div
						className="main-plate-view"
						onDragOver={handleDragOver}
						onDrop={handleDropOnPlate}
					>
						<div className="plate-circle">
							{/* The brand watermark from your design */}
							<div className="plate-logo">THRIVE</div>
							{plateItems.map((item, index) => {
								const angle = index * 40;
								const radius = 40;
								const radian = (angle * Math.PI) / 180;
								const top = 50 + radius * Math.sin(radian);
								const left = 50 + radius * Math.cos(radian);
								const size = 150;

								return (
									<img
										key={item.id}
										src={item.image}
										alt={item.name}
										className="placed-food"
										style={{
											position: 'absolute',
											top: `${top}%`,
											left: `${left}%`,
											width: `${size}px`,
											height: `${size}px`,
											transform: `translate(-50%, -50%)`,
											objectFit: 'contain',
											zIndex: index + 1
										}}
									/>
								);
							})}
						</div>
						<p className="build-step">Build your meal ({plateItems.length}/3)</p>
					</div>

					{/* Live Macro Tracker */}
					<div className="live-macros">
						<div className="m-stat"><strong>{plateItems.reduce((sum, item) => sum + parseInt(item.macros.protein), 0)}g</strong><span>Protein</span></div>
						<div className="m-stat"><strong>{plateItems.reduce((sum, item) => sum + parseInt(item.macros.carbs), 0)}g</strong><span>Carbs</span></div>
						<div className="m-stat"><strong>{plateItems.reduce((sum, item) => sum + parseInt(item.macros.fats), 0)}g</strong><span>Fats</span></div>
						<div className="m-stat"><strong>{plateItems.reduce((sum, item) => sum + parseInt(item.macros.kcal), 0)}</strong><span>Kcal</span></div>
					</div>

					<div className="suggested-section">
						<p className="suggested-label">SUGGESTED DISHES BASED ON YOUR PLATE</p>
						<div className="suggestion-card">
							<div className="card-badge">MUSCLE GAIN</div>

							<div className="card-main-content">
								<img
									src={food_plate}
									alt="Chicken Dish"
									className="suggestion-img"
								/>
								<div className="suggestion-text">
									<h4>Chicken with Thai Mango-Coconut Dip</h4>
									<p className="description">
										Chicken Breast, Zucchini, Onion, Tomatoes, Kale, Mango, Herbs & spices, EVOO, Coconut Cream, Garlic, Salt, Brown Sugar
									</p>

								</div>
							</div>

							<ul className="ingredient-bullets">
								<li><span></span> Chicken Thigh 250g</li>
								<li><span></span> Brown Rice 200g</li>
								<li><span></span> Broccoli 150g</li>
								<li><span></span> Boiled Egg x2</li>
							</ul>

							<div className="suggestion-macros-row">
								<div className="s-macro"><strong>40g</strong><span>Protein</span></div>
								<div className="s-macro"><strong>35g</strong><span>Carbs</span></div>
								<div className="s-macro"><strong>15g</strong><span>Fats</span></div>
								<div className="s-macro"><strong>450</strong><span>Kcal</span></div>
							</div>

							<div className="suggestion-footer">
								<span className="suggestion-price">1,850 LKR</span>
								<Link to="/order">
									<button className="buy-now-btn">Buy Now</button>
								</Link>
							</div>
						</div>
					</div>
				</main>

				{/* --- RIGHT SIDEBAR: ORDER SUMMARY --- */}
				<aside className="order-summary">
					<div className="summary-header">
						<span className="plate-title">Your Plate</span>
						<span className="item-count">{plateItems.length} Item{plateItems.length !== 1 ? 's' : ''}</span>
					</div>

					<div className="selected-items-list">
						{plateItems.map(item => (
							<div key={item.id} className="selected-item">
								{/* <img src={item.image} alt={item.name} className="selected-item-thumb"/> */}
								<div className="item-main">
									<strong>{item.name}</strong>
									<span>{item.macros.kcal}/{item.grams}g</span>
								</div>
								<div className="item-tags">
									<span className="tag-accent">{item.cut}</span>
									<span className="tag-accent">{item.cookStyle}</span>
									<button className="remove-item" onClick={() => handleRemoveItem(item.id)}>×</button>
								</div>
							</div>
						))}
					</div>

					<div className="total-box">
						<span className="total-label">TOTAL</span>
						<span className="total-price">LKR {plateItems.reduce((sum, item) => sum + parseInt(item.price.split(' ')[1]), 0)}</span>
					</div>

					<div className="name-meal-input">
						<p>Every meal you build gets a name and a place in our community.</p>
						<input type="text" placeholder="Name your meal" />
					</div>

					<div className="delivery-options">
						<p>Your meal can be delivered at your convenience.</p>
						<div className="delivery-buttons">
							<button
								className={`delivery-btn order-now-btn ${selectedDelivery === 'now' ? 'active' : ''}`}
								onClick={() => setSelectedDelivery('now')}
							>
								<div className="opt-text">
									<strong>Order Now</strong>
									<span>Delivered in 45 Min</span>
								</div>
								{selectedDelivery === 'now' && <div className="check-circle">✓</div>}
							</button>

							<button
								className={`delivery-btn ${selectedDelivery === 'schedule' ? 'active' : ''}`}
								onClick={() => setSelectedDelivery('schedule')}
							>
								<div className="opt-text">
									<strong>Schedule</strong>
									<span>Pick a time</span>
								</div>
								{selectedDelivery === 'schedule' && <div className="check-circle">✓</div>}
							</button>
						</div>
					</div>
					<button
						className="add-more-btn"
						disabled={plateItems.length < 3}
					>
						{plateItems.length >= 3
							? 'Complete - Proceed to Checkout'
							: `Add ${Math.max(0, 3 - plateItems.length)} More item${plateItems.length >= 2 ? '' : 's'} to Order`}
					</button>
				</aside>
			</div>
			{/* --- POPUP MODAL --- */}
			{isModalOpen && (
				<IngredientModal
					name={activeIngredient || ''}
					onClose={() => setModalOpen(false)}
					onAddToPlate={handleAddToPlate}
				/>
			)}
		</div>
	);
};

export default MealBuilder;