import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';
import Notification from '../components/Notification';
import { UserPlus } from 'lucide-react';

function Register({ onRegister }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setNotification({ message: 'Passwords do not match.', type: 'error' });
      return;
    }
    // Dummy registration logic
    if (email && password && fullName) {
      onRegister(fullName); // Pass full name to simulate user creation
    } else {
      setNotification({ message: 'Please fill in all fields.', type: 'error' });
    }
  };

  return (
    <div className="register-container">
      <Card className="auth-card">
        <h2>Create Your Account</h2>
        <p style={{ marginBottom: '25px', color: 'var(--text-light-color)' }}>
          Join the AI Readiness Navigator to start your journey.
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            id="register-fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            required
          />
          <Input
            label="Email Address"
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@example.com"
            required
          />
          <Input
            label="Password"
            id="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Input
            label="Confirm Password"
            id="register-confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button type="submit" style={{ width: '100%', marginTop: '20px' }}>
            <UserPlus size={18} /> Register
          </Button>
        </form>
        <p>
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </Card>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default Register;
