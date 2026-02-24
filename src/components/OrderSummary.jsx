import React, { useState } from 'react';
import Button from './Button';

const OrderSummary = ({ cartTotal }) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const shippingCost = 10.00;
  const taxRate = 0.08; // 8%

  const subtotal = cartTotal;
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax - discount;

  const applyPromoCode = () => {
    if (promoCode === 'SAVE10') {
      setDiscount(Math.min(subtotal * 0.10, 50)); // 10% off, max $50
      alert('Promo code applied successfully!');
    } else {
      setDiscount(0);
      alert('Invalid promo code.');
    }
  };

  return (
    <div className="order-summary card">
      <h4>Order Summary</h4>
      <div className="order-summary-row">
        <span>Subtotal:</span>
        <strong>${subtotal.toFixed(2)}</strong>
      </div>
      <div className="order-summary-row">
        <span>Shipping:</span>
        <strong>${shippingCost.toFixed(2)}</strong>
      </div>
      <div className="order-summary-row">
        <span>Tax ({(taxRate * 100).toFixed(0)}%):</span>
        <strong>${tax.toFixed(2)}</strong>
      </div>
      {discount > 0 && (
        <div className="order-summary-row" style={{ color: 'var(--success-color)' }}>
          <span>Discount:</span>
          <strong>-${discount.toFixed(2)}</strong>
        </div>
      )}
      <div className="promo-code-input">
        <input
          type="text"
          placeholder="Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <Button onClick={applyPromoCode} variant="secondary">
          Apply
        </Button>
      </div>
      <div className="order-summary-total">
        <span>Total:</span>
        <strong>${total.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default OrderSummary;