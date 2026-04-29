import React, { useState } from 'react';
import './IngredientModal.css';

// Import the images
import thighImg from '../assets/chicken-thigh.png';
import legImg from '../assets/chicken-leg.png';
import wingsImg from '../assets/chicken-wings.png';
import chestImg from '../assets/chicken-chest.png';

// Create a map for the images
const imageMap: { [key: string]: string } = {
  thigh: thighImg,
  leg: legImg,
  wings: wingsImg,
  chest: chestImg,
};

interface ModalProps {
  name: string;
  onClose: () => void;
  onAddToPlate: (item: PlateItem) => void;
}

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

const IngredientModal: React.FC<ModalProps> = ({ name, onClose, onAddToPlate }) => {
  const [grams, setGrams] = useState(200);
  const [selectedCut, setSelectedCut] = useState('Thigh');
  const [selectedCookStyle, setSelectedCookStyle] = useState('Grilled');

  const handleAddToPlate = () => {
    const newItem: PlateItem = {
      id: `${name}-${selectedCut}-${Date.now()}`,
      name,
      cut: selectedCut,
      grams,
      cookStyle: selectedCookStyle,
      macros: { protein: '40g', carbs: '35g', fats: '15g', kcal: '450' },
      price: 'LKR 450',
      image: imageMap[selectedCut.toLowerCase()]
    };
    onAddToPlate(newItem);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="ingredient-modal">
        <div className="modal-header">
          <h3>{name}</h3>
          <button className="close-x" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <section className="selection-group">
            <label>SELECT CUT</label>
            <div className="option-grid">
              <button 
                className={`opt-btn ${selectedCut === 'Thigh' ? 'active' : ''}`}
                onClick={() => setSelectedCut('Thigh')}
              >Thigh</button>
              <button 
                className={`opt-btn ${selectedCut === 'Leg' ? 'active' : ''}`}
                onClick={() => setSelectedCut('Leg')}
              >Leg</button>
              <button 
                className={`opt-btn ${selectedCut === 'Wings' ? 'active' : ''}`}
                onClick={() => setSelectedCut('Wings')}
              >Wings</button>
              <button 
                className={`opt-btn ${selectedCut === 'Chest' ? 'active' : ''}`}
                onClick={() => setSelectedCut('Chest')}
              >Chest</button>
            </div>
          </section>

          <section className="selection-group">
            <label>QUANTITY</label>
            <div className="quantity-control">
              <button onClick={() => setGrams(g => Math.max(0, g - 50))}>-</button>
              <div className="grams-display">
                <span className="gram-val">{grams}</span>
                <span className="gram-unit">Grams</span>
              </div>
              <button onClick={() => setGrams(g => g + 50)}>+</button>
            </div>
          </section>

          <section className="selection-group">
            <label>COOK STYLE</label>
            <div className="option-grid">
              <button 
                className={`opt-btn ${selectedCookStyle === 'Grilled' ? 'active' : ''}`}
                onClick={() => setSelectedCookStyle('Grilled')}
              >Grilled</button>
              <button 
                className={`opt-btn ${selectedCookStyle === 'Boiled' ? 'active' : ''}`}
                onClick={() => setSelectedCookStyle('Boiled')}
              >Boiled</button>
              <button 
                className={`opt-btn ${selectedCookStyle === 'Fried' ? 'active' : ''}`}
                onClick={() => setSelectedCookStyle('Fried')}
              >Fried</button>
            </div>
          </section>
        </div>

        <div className="modal-macros-row">
          <div className="m-unit"><strong>40g</strong><span>Protein</span></div>
          <div className="m-unit"><strong>35g</strong><span>Carbs</span></div>
          <div className="m-unit"><strong>15g</strong><span>Fats</span></div>
          <div className="m-unit"><strong>450</strong><span>Kcal</span></div>
        </div>

        <div className="modal-footer">
          <div className="price-display">
            <span>Item Price</span>
            <strong>LKR 450</strong>
          </div>
          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button className="add-plate-btn" onClick={handleAddToPlate}>Add to Plate</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientModal;