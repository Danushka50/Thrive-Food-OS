import React from "react";
import "./PowerDrinks.css";
import powerDrinksImage from "../assets/power_drinks.png";

const PowerDrinksCards = [
    {
        title: "Dark Chocolate Thunder",
        ingredients: "Chocolate NitroTech x2Whole Milk 300mlBanana x1Peanut Butter 1 tbsp",
        description: "Chocolate NitroTech x2 scoops, whole milk, frozen banana, peanut butter, a pinch of sea salt. Rich, thick and seriously powerful."
    },
    {
        title: "Banana Vanilla Surge",
        ingredients: "Vanilla NitroTech x2Whole Milk 300mlRipe Banana x1Oats 30g + Honey",
        description: "Vanilla NitroTech x2 scoops, whole milk, ripe banana, honey and oats blended smooth. The classic that everyone keeps coming back to."
    },
    {
        title: "Berry Recovery Blast",
        ingredients: "Vanilla NitroTech x2Low-fat Milk 250mlMixed Berries 100gGreek Yog...",
        description: "Vanilla NitroTech x2 scoops, low-fat milk, mixed berries, Greek yoghurt and a squeeze of honey. Anti-inflammatory, high protein, post-session perfection."
    }
];  

const PowerDrinksCard: React.FC<{ title: string; ingredients: string; description: string }> = ({ title, ingredients, description }) => {
    return (
        <div className="power-drinks-card">
            <h3>{title}</h3>
            <p className="ingredients">{ingredients}</p>
            <p className="description">{description}</p>
        </div>
    );
}

const PowerDrinks: React.FC = () => {
    return (
        <div className="power-drinks-container">
            <div className="power-drinks-header">
                <p>Power Drinks</p>
                <h2>Fuel in a cup.</h2>
            </div>
            <div className="power-drinks-content">
                <p className="power-drinks-description">Each drink is built with 2 scoops of NitroTech MuscleTech protein and whole food ingredients. No artificial junk. Just clean power.</p>
            </div>
            <div className="power-drinks-cards-container">
                <img src={powerDrinksImage} alt="Power Coffee" className="power-drink-image" />
                <div>
                    {PowerDrinksCards.map((card, index) => (
                        <PowerDrinksCard key={index} title={card.title} ingredients={card.ingredients} description={card.description} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PowerDrinks;
