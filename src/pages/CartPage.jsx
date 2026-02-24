import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/QuantitySelector';
import Button from '../components/Button';
import OrderSummary from '../components/OrderSummary';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop">
          <Button variant="primary" style={{ marginTop: 'var(--spacing-lg)' }}>
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
      <h2>Shopping Cart</h2>
      <div className="grid-2-col" style={{ alignItems: 'flex-start' }}>
        <div className="cart-items-list card">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </h3>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-actions">
                <QuantitySelector
                  quantity={item.quantity}
                  onQuantityChange={(newQuantity) => updateQuantity(item.id, newQuantity)}
                />
                <p className="cart-item-subtotal">${(item.price * item.quantity).toFixed(2)}</p>
                <Button
                  onClick={() => removeFromCart(item.id)}
                  variant="danger"
                  size="small"
                  className="button-icon"
                >
                  <Trash2 size={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <OrderSummary cartTotal={cartTotal} />
          <Link to="/checkout">
            <Button variant="primary" size="large" style={{ width: '100%', marginTop: 'var(--spacing-md)' }}>
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;