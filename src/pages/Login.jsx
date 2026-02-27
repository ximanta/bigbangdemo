import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ToastContainer from '../components/Toast';

function Login() {
  const { login, register } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, onClose: () => removeToast(id) }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      if (login(email, password)) {
        showToast('Login successful!', 'success');
      } else {
        showToast('Invalid email or password.', 'error');
      }
    } else {
      if (register(email, password)) {
        showToast('Registration successful! Logging in...', 'success');
      } else {
        showToast('Registration failed. Please try again.', 'error');
      }
    }
  };

  return (
    <div className="login-page app-container">
      <h1 className="header-title" style={{ color: 'var(--primary-color)', marginBottom: 'var(--spacing-unit)', marginTop: 'calc(var(--spacing-unit) * 2)' }}>
        Health Tracker
      </h1>
      <div className="card" style={{padding: 'var(--spacing-unit) * 2'}}>
        <h2 className="card-title text-center" style={{marginBottom: 'var(--spacing-unit)'}}>
          {isLoginMode ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            required
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          <Button type="submit" variant="primary" className="mt-spacing" style={{width: '100%'}}>
            {isLoginMode ? 'Log In' : 'Sign Up'}
          </Button>
        </form>
        <p className="text-center mt-spacing" style={{fontSize: '0.9rem', color: 'var(--text-light-color)'}}>
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{' '}
          <Button
            variant="outline"
            onClick={() => setIsLoginMode(!isLoginMode)}
            style={{padding: '4px 8px', fontSize: '0.85rem', marginLeft: '8px'}}
          >
            {isLoginMode ? 'Sign Up' : 'Log In'}
          </Button>
        </p>
      </div>
      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default Login;