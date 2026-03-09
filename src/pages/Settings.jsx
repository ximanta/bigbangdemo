import React, { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import Notification from '../components/Notification';
import { Save, User, Mail, Lock, Bell } from 'lucide-react';

function Settings() {
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    jobTitle: 'AI Strategist',
    organization: 'InnovateCorp',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailUpdates: true,
    assessmentReminders: false,
    resourceRecommendations: true,
  });
  const [notification, setNotification] = useState(null);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
    setNotification({ message: 'Profile updated successfully!', type: 'success' });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setNotification({ message: 'New passwords do not match.', type: 'error' });
      return;
    }
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setNotification({ message: 'Please fill all password fields.', type: 'error' });
      return;
    }
    console.log('Password changed:', passwordData);
    setNotification({ message: 'Password changed successfully!', type: 'success' });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleUpdateNotifications = (e) => {
    e.preventDefault();
    console.log('Notification settings updated:', notificationSettings);
    setNotification({ message: 'Notification settings updated!', type: 'success' });
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">User Settings</h1>
      </div>

      <div className="grid-cols-2">
        <Card title="Profile Information">
          <form onSubmit={handleUpdateProfile}>
            <Input
              label="Full Name"
              id="fullName"
              name="fullName"
              value={profileData.fullName}
              onChange={handleProfileChange}
              required
            />
            <Input
              label="Email Address"
              id="email"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleProfileChange}
              required
            />
            <Input
              label="Job Title"
              id="jobTitle"
              name="jobTitle"
              value={profileData.jobTitle}
              onChange={handleProfileChange}
            />
            <Input
              label="Organization"
              id="organization"
              name="organization"
              value={profileData.organization}
              onChange={handleProfileChange}
            />
            <Button type="submit" style={{ marginTop: '20px' }}>
              <Save size={18} /> Save Profile
            </Button>
          </form>
        </Card>

        <Card title="Change Password">
          <form onSubmit={handleChangePassword}>
            <Input
              label="Current Password"
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
            />
            <Input
              label="New Password"
              id="newPassword"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
            />
            <Input
              label="Confirm New Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
            <Button type="submit" style={{ marginTop: '20px' }}>
              <Lock size={18} /> Change Password
            </Button>
          </form>
        </Card>
      </div>

      <Card title="Notification Preferences" style={{ marginTop: '20px' }}>
        <form onSubmit={handleUpdateNotifications}>
          <div className="form-group">
            <Checkbox
              id="emailUpdates"
              name="emailUpdates"
              label="Receive email updates and newsletters"
              checked={notificationSettings.emailUpdates}
              onChange={handleNotificationChange}
            />
            <Checkbox
              id="assessmentReminders"
              name="assessmentReminders"
              label="Get reminders for pending assessments"
              checked={notificationSettings.assessmentReminders}
              onChange={handleNotificationChange}
            />
            <Checkbox
              id="resourceRecommendations"
              name="resourceRecommendations"
              label="Receive personalized resource recommendations"
              checked={notificationSettings.resourceRecommendations}
              onChange={handleNotificationChange}
            />
          </div>
          <Button type="submit" style={{ marginTop: '10px' }}>
            <Bell size={18} /> Update Notifications
          </Button>
        </form>
      </Card>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default Settings;
