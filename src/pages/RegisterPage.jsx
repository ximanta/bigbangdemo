import React,
{
  useState
}
from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

export const RegisterPage = () => {
  const [error,
    setError]
  = useState(null);
  const { register,
    loading } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (name, email, password) => {
    setError(null);
    try {
      await register(name, email, password);
      navigate('/my-tickets'); // Direct customer to their tickets after registration
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleRegister}
      isLoading={loading}
      error={error}
    />
  );
};
