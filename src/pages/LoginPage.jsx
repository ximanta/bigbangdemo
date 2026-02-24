import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Alert from '../components/Alert';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(null);

    if (!email || !password) {
      setAlert({ type: 'danger', message: 'Please enter both email and password.' });
      return;
    }

    const result = login(email, password);
    if (result.success) {
      setAlert({ type: 'success', message: 'Login successful!' });
      setTimeout(() => {
        navigate('/account');
      }, 1000);
    } else {
      setAlert({ type: 'danger', message: result.message || 'Login failed. Please check your credentials.' });
    }
  };

  return (
    <div className="container" style={{ padding: 'var(--spacing-xl) 0', maxWidth: '500px' }}>
      <div className="card">
        <h2>Login to Your Account</h2>
        {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email / Username</label>
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
          <div className="flex-group-end" style={{ marginBottom: 'var(--spacing-md)' }}>
            <Link to="/forgot-password" className="button-link">
              Forgot Password?
            </Link>
          </div>
          <Button type="submit" variant="primary" style={{ width: '100%' }}>
            Login
          </Button>
        </form>
        <p className="text-center" style={{ marginTop: 'var(--spacing-lg)' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;