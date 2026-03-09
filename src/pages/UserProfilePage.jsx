import React, { useState } from 'react';
import { UserCircle, Lock, Mail } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const UserProfilePage = () => {
  const [name, setName] = useState('Admin User');
  const [email, setEmail] = useState('admin@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleUpdateProfile = () => {
    alert('Profile updated successfully! (Demo)');
    console.log('Updating profile:', { name, email });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (currentPassword === 'password' && newPassword.length >= 6) {
      alert('Password changed successfully! (Demo)');
      console.log('Changing password');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } else {
      alert('Invalid current password or new password too short (min 6 chars)!');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>User Profile</h1>
      </div>

      <Card title="Personal Information" className="mb-4">
        <Input
          label="Full Name"
          id="profile-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={UserCircle}
        />
        <Input
          label="Email Address"
          id="profile-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
          readOnly
        />
        <Button variant="primary" onClick={handleUpdateProfile} className="mt-2">
          Update Profile
        </Button>
      </Card>

      <Card title="Change Password">
        <Input
          label="Current Password"
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          icon={Lock}
        />
        <Input
          label="New Password"
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          icon={Lock}
        />
        <Input
          label="Confirm New Password"
          id="confirm-new-password"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          icon={Lock}
        />
        <Button variant="primary" onClick={handleChangePassword} className="mt-2">
          Change Password
        </Button>
      </Card>
    </div>
  );
};

export default UserProfilePage;
