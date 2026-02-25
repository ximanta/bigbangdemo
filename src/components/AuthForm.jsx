import React,
{
  useState
}
from 'react';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';

export const AuthForm = ({ type,
  onSubmit,
  isLoading,
  error }) => {
  const [name,
    setName]
  = useState('');
  const [email,
    setEmail]
  = useState('');
  const [password,
    setPassword]
  = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'register') {
      onSubmit(name, email, password);
    } else {
      onSubmit(email, password);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2 className="text-center mb-20">
        {type === 'login' ? 'Login' : 'Register'}
      </h2>
      <form onSubmit={handleSubmit}>
        {type === 'register' && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="input-field"
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
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
        <button
          type="submit"
          className="button button-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : type === 'login' ? (
            'Login'
          ) : (
            'Register'
          )}
        </button>
      </form>
      <p className="text-center mt-20">
        {type === 'login' ? (
          <>
            Don't have an account?{' '}
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link to="/login">Login</Link>
          </>
        )}
      </p>
    </div>
  );
};
