import React, { useState } from 'react';
import { Settings as SettingsIcon, Wifi, Users, Store } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Select from '../components/Select';
import Modal from '../components/Modal';
import { mockUsers } from '../data/mockData';

const SettingsPage = ({ addNotification }) => {
  const [kitchenName, setKitchenName] = useState('Cloud Kitchen Hub');
  const [address, setAddress] = useState('123 Virtual Way, Digital City');
  const [contactEmail, setContactEmail] = useState('info@cloudkitchenhub.com');
  const [operatingHours, setOperatingHours] = useState('Mon-Sun, 9 AM - 10 PM');

  const [uberEatsApiKey, setUberEatsApiKey] = useState('sk_ubereats_xxxx');
  const [doorDashApiKey, setDoorDashApiKey] = useState('sk_doordash_yyyy');
  const [zomatoApiKey, setZomatoApiKey] = useState('sk_zomato_zzzz');

  const [users, setUsers] = useState(mockUsers);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userFormState, setUserFormState] = useState({
    name: '',
    email: '',
    role: 'Chef',
  });

  const handleSaveKitchenSettings = () => {
    addNotification('Kitchen profile settings saved!', 'success');
    console.log('Kitchen settings:', { kitchenName, address, contactEmail, operatingHours });
  };

  const handleSaveIntegrationSettings = () => {
    addNotification('Integration settings saved!', 'success');
    console.log('Integration settings:', { uberEatsApiKey, doorDashApiKey, zomatoApiKey });
  };

  const handleConnectPlatform = (platform) => {
    addNotification(`Attempting to connect to ${platform}... (Demo)`, 'info');
    console.log(`Connecting to ${platform}`);
  };

  const handleOpenUserModal = (user = null) => {
    setEditingUser(user);
    if (user) {
      setUserFormState({ name: user.name, email: user.email, role: user.role });
    } else {
      setUserFormState({ name: '', email: '', role: 'Chef' });
    }
    setIsUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
    setEditingUser(null);
    setUserFormState({ name: '', email: '', role: 'Chef' });
  };

  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id ? { ...user, ...userFormState } : user
        )
      );
      addNotification(`User '${userFormState.name}' updated.`, 'success');
    } else {
      const newUser = {
        id: `USR${String(users.length + 1).padStart(3, '0')}`,
        ...userFormState,
      };
      setUsers((prev) => [...prev, newUser]);
      addNotification(`New user '${userFormState.name}' added.`, 'success');
    }
    handleCloseUserModal();
  };

  const handleDeleteUser = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
      addNotification('User deleted successfully.', 'info');
    }
  };

  const roleOptions = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Chef', label: 'Chef' },
    { value: 'Dispatcher', label: 'Dispatcher' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Settings</h1>
      </div>

      <Card title="Kitchen Profile Settings" className="mb-4" icon={Store}>
        <Input
          label="Kitchen Name"
          id="kitchen-name"
          value={kitchenName}
          onChange={(e) => setKitchenName(e.target.value)}
        />
        <Input
          label="Address"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          label="Contact Email"
          id="contact-email"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <Input
          label="Operating Hours"
          id="operating-hours"
          value={operatingHours}
          onChange={(e) => setOperatingHours(e.target.value)}
        />
        <Button variant="primary" onClick={handleSaveKitchenSettings} className="mt-2">
          Save Profile
        </Button>
      </Card>

      <Card title="Integration Settings" className="mb-4" icon={Wifi}>
        <Input
          label="Uber Eats API Key"
          id="ubereats-api-key"
          value={uberEatsApiKey}
          onChange={(e) => setUberEatsApiKey(e.target.value)}
          type="password"
        />
        <Button variant="secondary" onClick={() => handleConnectPlatform('Uber Eats')} className="mt-2 mb-4">
          Connect Uber Eats
        </Button>

        <Input
          label="DoorDash API Key"
          id="doordash-api-key"
          value={doorDashApiKey}
          onChange={(e) => setDoorDashApiKey(e.target.value)}
          type="password"
        />
        <Button variant="secondary" onClick={() => handleConnectPlatform('DoorDash')} className="mt-2 mb-4">
          Connect DoorDash
        </Button>

        <Input
          label="Zomato API Key"
          id="zomato-api-key"
          value={zomatoApiKey}
          onChange={(e) => setZomatoApiKey(e.target.value)}
          type="password"
        />
        <Button variant="secondary" onClick={() => handleConnectPlatform('Zomato')} className="mt-2">
          Connect Zomato
        </Button>

        <Button variant="primary" onClick={handleSaveIntegrationSettings} className="mt-4">
          Save Integration Settings
        </Button>
      </Card>

      <Card title="User Management" icon={Users}>
        <Button variant="primary" icon={Plus} onClick={() => handleOpenUserModal()} className="mb-4">
          Add New User
        </Button>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className="flex-row gap-2">
                      <Button
                        variant="secondary"
                        icon={Edit}
                        onClick={() => handleOpenUserModal(user)}
                        title="Edit User"
                      />
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete User"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={isUserModalOpen}
        onClose={handleCloseUserModal}
        title={editingUser ? 'Edit User' : 'Add New User'}
        actions={
          <Button type="submit" form="user-form" variant="primary">
            {editingUser ? 'Update User' : 'Add User'}
          </Button>
        }
      >
        <form id="user-form" onSubmit={handleUserSubmit}>
          <Input
            label="Name"
            id="user-name"
            name="name"
            value={userFormState.name}
            onChange={handleUserFormChange}
            required
          />
          <Input
            label="Email"
            id="user-email"
            name="email"
            type="email"
            value={userFormState.email}
            onChange={handleUserFormChange}
            required
          />
          <Select
            label="Role"
            id="user-role"
            name="role"
            options={roleOptions}
            value={userFormState.role}
            onChange={handleUserFormChange}
            required
          />
        </form>
      </Modal>
    </div>
  );
};

export default SettingsPage;
