import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockOrders } from '../data/orders';
import Button from '../components/Button';

const AccountDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null; // Or a loading spinner/message while redirecting
  }

  return (
    <div>
      <h3>Welcome, {currentUser.name}!</h3>
      <p>This is your account dashboard. Use the sidebar to navigate your account settings.</p>
    </div>
  );
};

const OrderHistory = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // In a real app, you'd fetch orders for currentUser.id
    setOrders(mockOrders);
  }, [currentUser]);

  return (
    <div>
      <h3>Order History</h3>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <table className="order-history-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>
                  <Button variant="link" onClick={() => alert(`Viewing details for order ${order.id}`)}>
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const ProfileDetails = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    // Add more profile fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // In a real app, you'd update the user profile via an API
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div>
      <h3>Profile Details</h3>
      <div className="card">
        <div className="form-group">
          <label htmlFor="profileName">Name</label>
          <input
            type="text"
            id="profileName"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profileEmail">Email</label>
          <input
            type="email"
            id="profileEmail"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="secondary">
            Edit Profile
          </Button>
        ) : (
          <div className="flex-group">
            <Button onClick={handleSave} variant="primary">
              Save Changes
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="secondary">
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      fullName: 'John Doe',
      addressLine1: '123 Main St',
      addressLine2: '',
      city: 'Anytown',
      state: 'CA',
      zipCode: '90210',
      country: 'USA',
      phone: '555-123-4567'
    },
    {
      id: '2',
      fullName: 'John Doe',
      addressLine1: '456 Oak Ave',
      addressLine2: 'Apt 101',
      city: 'Otherville',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      phone: '555-987-6543'
    }
  ]);

  const handleRemoveAddress = (id) => {
    if (window.confirm('Are you sure you want to remove this address?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
      alert('Address removed!');
    }
  };

  return (
    <div>
      <h3>Saved Addresses</h3>
      {addresses.length === 0 ? (
        <p>No saved addresses.</p>
      ) : (
        <div className="grid-2-col">
          {addresses.map(address => (
            <div key={address.id} className="card">
              <p><strong>{address.fullName}</strong></p>
              <p>{address.addressLine1}</p>
              {address.addressLine2 && <p>{address.addressLine2}</p>}
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
              <p>Phone: {address.phone}</p>
              <div className="flex-group" style={{ marginTop: 'var(--spacing-md)' }}>
                <Button variant="secondary" size="small" onClick={() => alert(`Editing address ${address.id}`)}>
                  Edit
                </Button>
                <Button variant="danger" size="small" onClick={() => handleRemoveAddress(address.id)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Button variant="primary" style={{ marginTop: 'var(--spacing-md)' }} onClick={() => alert('Add new address form would open')}>
        Add New Address
      </Button>
    </div>
  );
};

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'cc1',
      type: 'Credit Card',
      details: 'Visa ending in 1234',
      expiration: '12/25'
    },
    {
      id: 'pp1',
      type: 'PayPal',
      details: 'john.doe@example.com'
    }
  ]);

  const handleRemoveMethod = (id) => {
    if (window.confirm('Are you sure you want to remove this payment method?')) {
      setPaymentMethods(prev => prev.filter(method => method.id !== id));
      alert('Payment method removed!');
    }
  };

  return (
    <div>
      <h3>Payment Methods</h3>
      {paymentMethods.length === 0 ? (
        <p>No saved payment methods.</p>
      ) : (
        <div className="grid-2-col">
          {paymentMethods.map(method => (
            <div key={method.id} className="card">
              <p><strong>{method.type}</strong></p>
              <p>{method.details}</p>
              {method.expiration && <p>Expires: {method.expiration}</p>}
              <div className="flex-group" style={{ marginTop: 'var(--spacing-md)' }}>
                <Button variant="secondary" size="small" onClick={() => alert(`Editing payment method ${method.id}`)}>
                  Edit
                </Button>
                <Button variant="danger" size="small" onClick={() => handleRemoveMethod(method.id)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Button variant="primary" style={{ marginTop: 'var(--spacing-md)' }} onClick={() => alert('Add new payment method form would open')}>
        Add New Payment Method
      </Button>
    </div>
  );
};

const AccountPage = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'dashboard';

  return (
    <div className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
      <h2>My Account</h2>
      <div className="account-dashboard">
        <div className="account-sidebar">
          <ul>
            <li>
              <Link to="/account" className={currentPath === 'account' || currentPath === 'dashboard' ? 'active' : ''}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/account/orders" className={currentPath === 'orders' ? 'active' : ''}>
                Order History
              </Link>
            </li>
            <li>
              <Link to="/account/profile" className={currentPath === 'profile' ? 'active' : ''}>
                Profile Details
              </Link>
            </li>
            <li>
              <Link to="/account/addresses" className={currentPath === 'addresses' ? 'active' : ''}>
                Saved Addresses
              </Link>
            </li>
            <li>
              <Link to="/account/payment" className={currentPath === 'payment' ? 'active' : ''}>
                Payment Methods
              </Link>
            </li>
          </ul>
        </div>
        <div className="account-content card">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { AccountPage, AccountDashboard, OrderHistory, ProfileDetails, SavedAddresses, PaymentMethods };