import React from 'react';
import { Plus, Minus } from 'lucide-react';

const QuantitySelector = ({ quantity, onQuantityChange, max = 99 }) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= max) {
      onQuantityChange(value);
    } else if (e.target.value === '') {
      onQuantityChange(1); // Or 0, depending on desired behavior for empty input
    }
  };

  return (
    <div className="quantity-selector">
      <button onClick={handleDecrease} className="button-icon">
        <Minus size={20} />
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min="1"
        max={max.toString()}
        aria-label="Quantity"
      />
      <button onClick={handleIncrease} className="button-icon">
        <Plus size={20} />
      </button>
    </div>
  );
};

export default QuantitySelector;