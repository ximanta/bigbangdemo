import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import OrderSummary from '../components/OrderSummary';
import Button from '../components/Button';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (cartItems.length === 0 && step < 4) {
    return (
      <div className="container" style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center' }}>
        <h2>Your cart is empty. Please add items to proceed to checkout.</h2>
        <Button onClick={() => navigate('/shop')} variant="primary" style={{ marginTop: 'var(--spacing-lg)' }}>
          Go to Shop
        </Button>
      </div>
    );
  }

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    setCreditCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const validateShipping = () => {
    const requiredFields = ['fullName', 'addressLine1', 'city', 'state', 'zipCode', 'country', 'phone'];
    for (const field of requiredFields) {
      if (!shippingDetails[field]) {
        setAlert({ type: 'danger', message: `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.` });
        return false;
      }
    }
    setAlert(null);
    return true;
  };

  const validatePayment = () => {
    if (paymentMethod === 'credit-card') {
      const requiredFields = ['cardNumber', 'expirationDate', 'cvv'];
      for (const field of requiredFields) {
        if (!creditCardDetails[field]) {
          setAlert({ type: 'danger', message: `Please fill in the credit card ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.` });
          return false;
        }
      }
      if (!/^[0-9]{16}$/.test(creditCardDetails.cardNumber.replace(/\s/g, ''))) {
        setAlert({ type: 'danger', message: 'Invalid credit card number.' });
        return false;
      }
      if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(creditCardDetails.expirationDate)) {
        setAlert({ type: 'danger', message: 'Invalid expiration date (MM/YY).' });
        return false;
      }
      if (!/^[0-9]{3,4}$/.test(creditCardDetails.cvv)) {
        setAlert({ type: 'danger', message: 'Invalid CVV.' });
        return false;
      }
    }
    setAlert(null);
    return true;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateShipping()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validatePayment()) {
        setStep(3);
      }
    }
  };

  const handlePlaceOrder = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      clearCart();
      setStep(4);
    }, 2000);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="card">
            <h3>Shipping Details</h3>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={shippingDetails.fullName} onChange={handleShippingChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="addressLine1">Address Line 1</label>
              <input type="text" id="addressLine1" name="addressLine1" value={shippingDetails.addressLine1} onChange={handleShippingChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
              <input type="text" id="addressLine2" name="addressLine2" value={shippingDetails.addressLine2} onChange={handleShippingChange} />
            </div>
            <div className="grid-3-col">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" value={shippingDetails.city} onChange={handleShippingChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="state">State/Province</label>
                <input type="text" id="state" name="state" value={shippingDetails.state} onChange={handleShippingChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zip/Postal Code</label>
                <input type="text" id="zipCode" name="zipCode" value={shippingDetails.zipCode} onChange={handleShippingChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input type="text" id="country" name="country" value={shippingDetails.country} onChange={handleShippingChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={shippingDetails.phone} onChange={handleShippingChange} required />
            </div>
            <Button onClick={handleNextStep} variant="primary" style={{ width: '100%' }}>
              Continue to Payment
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="card">
            <h3>Payment Method</h3>
            <div className="payment-method-options">
              <div className="payment-method-option">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={() => setPaymentMethod('credit-card')}
                  />
                  <span>Credit Card</span>
                </label>
              </div>
              <div className="payment-method-option">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                  />
                  <span>PayPal</span>
                </label>
              </div>
            </div>

            {paymentMethod === 'credit-card' && (
              <div className="credit-card-form">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input type="text" id="cardNumber" name="cardNumber" value={creditCardDetails.cardNumber} onChange={handleCreditCardChange} placeholder="XXXX XXXX XXXX XXXX" required />
                </div>
                <div className="grid-2-col">
                  <div className="form-group">
                    <label htmlFor="expirationDate">Expiration Date</label>
                    <input type="text" id="expirationDate" name="expirationDate" value={creditCardDetails.expirationDate} onChange={handleCreditCardChange} placeholder="MM/YY" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" name="cvv" value={creditCardDetails.cvv} onChange={handleCreditCardChange} placeholder="XXX" required />
                  </div>
                </div>
              </div>
            )}

            <Button onClick={() => setStep(1)} variant="secondary" style={{ marginTop: 'var(--spacing-md)', marginRight: 'var(--spacing-md)' }}>
              Back to Shipping
            </Button>
            <Button onClick={handleNextStep} variant="primary" style={{ marginTop: 'var(--spacing-md)' }}>
              Review Order
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="card">
            <h3>Review Your Order</h3>
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h4>Shipping To:</h4>
              <p>{shippingDetails.fullName}</p>
              <p>{shippingDetails.addressLine1}</p>
              {shippingDetails.addressLine2 && <p>{shippingDetails.addressLine2}</p>}
              <p>{shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}</p>
              <p>{shippingDetails.country}</p>
              <p>Phone: {shippingDetails.phone}</p>
            </div>
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h4>Payment Method:</h4>
              <p>{paymentMethod === 'credit-card' ? 'Credit Card (**** **** **** ' + creditCardDetails.cardNumber.slice(-4) + ')' : 'PayPal'}</p>
            </div>
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h4>Items:</h4>
              <ul>
                {cartItems.map(item => (
                  <li key={item.id}>{item.name} x {item.quantity} (${(item.price * item.quantity).toFixed(2)})</li>
                ))}
              </ul>
            </div>
            <Button onClick={() => setStep(2)} variant="secondary" style={{ marginTop: 'var(--spacing-md)', marginRight: 'var(--spacing-md)' }}>
              Back to Payment
            </Button>
            <Button onClick={handlePlaceOrder} variant="primary" style={{ marginTop: 'var(--spacing-md)' }} disabled={isLoading}>
              {isLoading ? 'Placing Order...' : 'Place Order'}
            </Button>
          </div>
        );
      case 4:
        return (
          <div className="card text-center">
            <h3>Order Placed Successfully!</h3>
            <p style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-md)' }}>
              Thank you for your purchase. Your order has been confirmed and will be processed shortly.
            </p>
            <p>Your order ID is: <strong>#{Math.floor(Math.random() * 1000000)}</strong></p>
            <Button onClick={() => navigate('/account/orders')} variant="primary" style={{ marginTop: 'var(--spacing-xl)', marginRight: 'var(--spacing-md)' }}>
              View Order History
            </Button>
            <Button onClick={() => navigate('/shop')} variant="secondary" style={{ marginTop: 'var(--spacing-xl)' }}>
              Continue Shopping
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
      {isLoading && <LoadingSpinner />}
      <h2>Checkout</h2>
      <div className="checkout-progress" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className={`checkout-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          <div className="checkout-step-icon">1</div>
          <div className="checkout-step-text">Shipping</div>
        </div>
        <div className={`checkout-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          <div className="checkout-step-icon">2</div>
          <div className="checkout-step-text">Payment</div>
        </div>
        <div className={`checkout-step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
          <div className="checkout-step-icon">3</div>
          <div className="checkout-step-text">Review</div>
        </div>
        <div className={`checkout-step ${step >= 4 ? 'active' : ''}`}>
          <div className="checkout-step-icon">4</div>
          <div className="checkout-step-text">Confirmation</div>
        </div>
      </div>

      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

      <div className="grid-2-col" style={{ alignItems: 'flex-start' }}>
        <div className="checkout-form-section">
          {renderStepContent()}
        </div>
        <div className="order-summary-section">
          <OrderSummary cartTotal={cartTotal} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;