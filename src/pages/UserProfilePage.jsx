import React,
{
  useState,
  useEffect
}
from 'react';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  User,
  Mail,
  Key
}
from 'lucide-react';

export const UserProfilePage = () => {
  const { currentUser,
    loading,
    updateUserNameEmail,
    showToast } = useAuth();
  const [name,
    setName]
  = useState('');
  const [email,
    setEmail]
  = useState('');
  const [isEditing,
    setIsEditing]
  = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      await updateUserNameEmail(currentUser.id, name, email);
      setIsEditing(false);
    } catch (error) {
      // Error toast handled by AuthContext
    }
  };

  if (loading || !currentUser) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '50px auto' }}>
        <div className="card-header">
          <h2>User Profile</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="button button-secondary"
            >
              Edit Profile
            </button>
          )}
        </div>

        <form onSubmit={handleSaveProfile}>
          <div className="form-group">
            <label htmlFor="profileName">Name</label>
            <input
              type="text"
              id="profileName"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing || loading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="profileEmail">Email</label>
            <input
              type="email"
              id="profileEmail"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing || loading}
              required
            />
          </div>

          {isEditing && (
            <div className="flex gap-10 mt-20">
              <button
                type="submit"
                className="button button-primary"
                disabled={loading}
              >
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  'Save Changes'
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setName(currentUser.name);
                  setEmail(currentUser.email);
                }}
                className="button button-secondary"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          )}
        </form>

        <div className="profile-section mt-20">
          <h3>Change Password</h3>
          <p>Password change functionality is not implemented in this demo.</p>
          <p>Please contact an administrator to reset your password.</p>
        </div>
      </div>
    </div>
  );
};
