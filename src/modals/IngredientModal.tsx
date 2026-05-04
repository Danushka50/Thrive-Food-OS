import React, { useState } from 'react';
import type { PlateItem, ThriveIngredient } from '../types/types';
import { getPlateItemMacros } from '../utils/nutrition';
import './IngredientModal.css';

interface ModalProps {
  ingredient: ThriveIngredient;
  onClose: () => void;
  onAddToPlate: (item: PlateItem) => void;
}

const formatPrice = (amount: number, currency = 'LKR') =>
  `${currency} ${new Intl.NumberFormat('en-LK', { maximumFractionDigits: 0 }).format(amount)}`;

const IngredientModal: React.FC<ModalProps> = ({ ingredient, onClose, onAddToPlate }) => {
  const availableQuantities = ingredient.quantities.filter((quantity) => quantity.is_available !== false);
  const quantityOptions = availableQuantities.length ? availableQuantities : ingredient.quantities;
  const defaultQuantityId = ingredient.default_quantity?.id || quantityOptions[0]?.id || '';
  const defaultSpecificationId = ingredient.specifications[0]?.id || '';
  const defaultCookTypeId = ingredient.cook_types[0]?.id || '';

  const [selectedQuantityId, setSelectedQuantityId] = useState(defaultQuantityId);
  const [selectedSpecificationId, setSelectedSpecificationId] = useState(defaultSpecificationId);
  const [selectedCookTypeId, setSelectedCookTypeId] = useState(defaultCookTypeId);

  const selectedQuantity =
    quantityOptions.find((quantity) => quantity.id === selectedQuantityId) || quantityOptions[0] || null;
  const selectedSpecification =
    ingredient.specifications.find((specification) => specification.id === selectedSpecificationId) ||
    ingredient.specifications[0] ||
    null;
  const selectedCookType =
    ingredient.cook_types.find((cookType) => cookType.id === selectedCookTypeId) ||
    ingredient.cook_types[0] ||
    null;

  const handleAddToPlate = () => {
    if (!selectedQuantity) {
      return;
    }

    const newItem: PlateItem = {
      id: `${ingredient.id}-${selectedQuantity.id}-${selectedCookType?.id || 'default'}-${Date.now()}`,
      ingredient_id: ingredient.id,
      name: ingredient.name,
      specification: selectedSpecification?.name || '',
      quantity_label: selectedQuantity.quantity_value,
      grams: selectedQuantity.quantity_grams || 0,
      cook_style: selectedCookType?.name || 'Standard',
      price: selectedQuantity.price,
      currency: selectedQuantity.currency,
      image: ingredient.photo_url || null,
      macros: getPlateItemMacros(ingredient, selectedQuantity),
    };

    onAddToPlate(newItem);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="ingredient-modal">
        <div className="modal-header">
          <div>
            <h3>{ingredient.name}</h3>
            <p className="modal-subtitle">
              {ingredient.location_name || ingredient.category_name || ingredient.food_type_name || 'Live ingredient'}
            </p>
          </div>
          <button className="close-x" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          {ingredient.description ? (
            <p className="ingredient-description">{ingredient.description}</p>
          ) : (
            <p className="ingredient-description">
              This ingredient is coming directly from the Thrive_Backend location catalog.
            </p>
          )}

          {ingredient.show_specification && ingredient.specifications.length ? (
            <section className="selection-group">
              <label>SELECT SPECIFICATION</label>
              <div className="option-grid wrap">
                {ingredient.specifications.map((specification) => (
                  <button
                    key={specification.id}
                    className={`opt-btn ${selectedSpecification?.id === specification.id ? 'active' : ''}`}
                    onClick={() => setSelectedSpecificationId(specification.id)}
                  >
                    {specification.name}
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <section className="selection-group">
            <label>SELECT QUANTITY</label>
            {quantityOptions.length ? (
              <div className="option-grid wrap">
                {quantityOptions.map((quantity) => (
                  <button
                    key={quantity.id}
                    className={`opt-btn quantity-option ${selectedQuantity?.id === quantity.id ? 'active' : ''}`}
                    onClick={() => setSelectedQuantityId(quantity.id)}
                  >
                    <strong>{quantity.quantity_value}</strong>
                    <span>{formatPrice(quantity.price, quantity.currency)}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="modal-note">This ingredient does not have a quantity configured yet.</p>
            )}
          </section>

          {ingredient.show_cook_type && ingredient.cook_types.length ? (
            <section className="selection-group">
              <label>COOK STYLE</label>
              <div className="option-grid wrap">
                {ingredient.cook_types.map((cookType) => (
                  <button
                    key={cookType.id}
                    className={`opt-btn ${selectedCookType?.id === cookType.id ? 'active' : ''}`}
                    onClick={() => setSelectedCookTypeId(cookType.id)}
                  >
                    {cookType.name}
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <section className="selection-group">
              <label>COOK STYLE</label>
              <p className="modal-note">Kitchen default preparation will be used for this ingredient.</p>
            </section>
          )}
        </div>

        <div className="modal-macros-row">
          <div className="m-unit">
            <strong>{selectedQuantity?.quantity_grams ? `${selectedQuantity.quantity_grams}g` : selectedQuantity?.quantity_value || '-'}</strong>
            <span>Portion</span>
          </div>
          <div className="m-unit">
            <strong>{selectedQuantity ? formatPrice(selectedQuantity.price, selectedQuantity.currency) : '-'}</strong>
            <span>Price</span>
          </div>
          <div className="m-unit">
            <strong>{selectedSpecification?.name || '-'}</strong>
            <span>Spec</span>
          </div>
          <div className="m-unit">
            <strong>{selectedCookType?.name || 'Default'}</strong>
            <span>Cook</span>
          </div>
        </div>

        <div className="modal-footer">
          <div className="price-display">
            <span>Item Price</span>
            <strong>{selectedQuantity ? formatPrice(selectedQuantity.price, selectedQuantity.currency) : 'Pending'}</strong>
          </div>
          <div className="modal-actions">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="add-plate-btn" onClick={handleAddToPlate} disabled={!selectedQuantity}>
              Add to Plate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientModal;
