import React,
{
  useState,
  useEffect
}
from 'react';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

export const UserForm = ({ user,
  onSubmit,
  onCancel,
  isNew = false }) => {
  const [name,
    setName]
  = useState('');
  const [email,
    setEmail]
  = useState('');
  const [role,
    setRole]
  = useState(1); // Default to Customer
  const [password,
    setPassword]
  = useState('');
  const { loading } = useAuth();

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setRole(user.role || 1);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: user?.id,
      name,
      email,
      role: parseInt(role),
      password: isNew ? password : undefined
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="userName">Name</label>
        <input
          type="text"
          id="userName"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="userEmail">Email</label>
        <input
          type="email"
          id="userEmail"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="userRole">Role</label>
        <select
          id="userRole"
          className="select-field"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          disabled={loading}
        >
          <option value={1}>Customer</option>
          <option value={2}>Agent</option>
          <option value={3}>Administrator</option>
        </select>
      </div>
      {isNew && (
        <div className="form-group">
          <label htmlFor="userPassword">Password</label>
          <input
            type="password"
            id="userPassword"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={isNew}
            disabled={loading}
          />
        </div>
      )}
      <div className="flex gap-10 mt-20">
        <button
          type="submit"
          className="button button-primary"
          disabled={loading}
        >
          {loading ? (
            <LoadingSpinner />
          ) : isNew ? (
            'Add User'
          ) : (
            'Save Changes'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="button button-secondary"
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
