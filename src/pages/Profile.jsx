import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail } from 'lucide-react';
import Button from '../components/Button';

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-page">
      <div className="card">
        <h2 className="card-title">User Profile</h2>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-unit)' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: 'var(--background-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--spacing-unit)',
            border: '1px solid var(--border-color)'
          }}>
            <User size={50} color="var(--text-light-color)" />
          </div>
          <h3 style={{ marginBottom: 'calc(var(--spacing-unit) / 2)' }}>{user?.name || 'Guest User'}</h3>
          <p style={{ color: 'var(--text-light-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Mail size={16} />
            {user?.email || 'N/A'}
          </p>
        </div>

        <div className="list-group mt-spacing">
          <div className="list-item">
            <div className="list-item-content">
              <div className="list-item-title">Account Status</div>
              <div className="list-item-subtitle">Active</div>
            </div>
          </div>
          <div className="list-item">
            <div className="list-item-content">
              <div className="list-item-title">Member Since</div>
              <div className="list-item-subtitle">January 2023</div>
            </div>
          </div>
        </div>

        <Button variant="outline" style={{ width: '100%', marginTop: 'var(--spacing-unit)' }}>
          Edit Profile
        </Button>
      </div>
    </div>
  );
}

export default Profile;