import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Alert from '../components/Alert';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(null);

    if (!name || !email || !password || !confirmPassword) {
      setAlert({ type: 'danger', message: 'All fields are required.' });
      return;
    }
    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Passwords do not match.' });
      return;
    }
    if (password.length < 6) {
      setAlert({ type: 'danger', message: 'Password must be at least 6 characters long.' });
      return;
    }

    const result = register(name, email, password);
    if (result.success) {
      setAlert({ type: 'success', message: 'Registration successful! You are now logged in.' });
      setTimeout(() => {
        navigate('/account');
      }, 1000);
    } else {
      setAlert({ type: 'danger', message: result.message || 'Registration failed.' });
    }
  };

  return (
    <div className="container" style={{ padding: 'var(--spacing-xl) 0', maxWidth: '500px' }}>
      <div className="card">
        <h2>Create Your Account</h2>
        {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="primary" style={{ width: '100%' }}>
            Register
          </Button>
        </form>
        <p className="text-center" style={{ marginTop: 'var(--spacing-lg)' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;