import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { getUserByUsername } from '../utils/mockData';

const LoginPage = ({ onLogin, addNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = getUserByUsername(username);

    if (user && password === 'password123') { // Simple mock password check
      onLogin(user);
      addNotification({ message: `Welcome, ${user.name}!`, type: 'success' });
      if (user.role === 'agent') {
        navigate('/dashboard');
      } else {
        navigate('/my-tickets');
      }
    } else {
      addNotification({ message: 'Invalid username or password.', type: 'error' });
    }
  };

  return (
    <div className="main-content login-page">
      <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Login to Helpdesk</h2>
        <form onSubmit={handleLogin}>
          <TextInput
            id="username"
            label="Username/Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username or email"
            required
          />
          <TextInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '20px' }}>
            Login
          </Button>
          <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
            <a href="#" onClick={() => addNotification({ message: 'Password reset functionality is not implemented in this demo.', type: 'error' })}>Forgot Password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
