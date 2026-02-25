import React,
{
  useState,
  useEffect
}
from 'react';
import {
  Link,
  useNavigate
}
from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketContext'; // To get allUsers
import { LoadingSpinner } from '../components/LoadingSpinner';
import { UserForm } from '../components/UserForm';
import {
  User,
  UserPlus,
  LayoutDashboard,
  Ticket,
  UserCheck
}
from 'lucide-react';
import {
  getRoleName
}
from '../utils/helpers';

export const UsersPage = () => {
  const { allUsers,
    loading: ticketsLoading } = useTickets();
  const { register,
    updateUserRole,
    loading: authLoading,
    showToast } = useAuth();
  const navigate = useNavigate();

  const [users,
    setUsers]
  = useState([]);
  const [isAddingUser,
    setIsAddingUser]
  = useState(false);
  const [editingUser,
    setEditingUser]
  = useState(null);

  useEffect(() => {
    if (allUsers) {
      setUsers(allUsers);
    }
  }, [allUsers]);

  const handleAddUser = async (userData) => {
    try {
      await register(userData.name, userData.email, userData.password);
      // After registration, update the role if it's not default customer
      if (userData.role !== 1) {
        const newUser = allUsers.find(u => u.email === userData.email);
        if (newUser) {
          await updateUserRole(newUser.id, userData.role);
        }
      }
      showToast('User added successfully!', 'success');
      setIsAddingUser(false);
    } catch (error) {
      // Toast is handled by AuthContext
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsAddingUser(false);
  };

  const handleUpdateUser = async (userData) => {
    try {
      await updateUserRole(userData.id, userData.role);
      showToast('User updated successfully!', 'success');
      setEditingUser(null);
    } catch (error) {
      // Toast is handled by AuthContext
    }
  };

  if (ticketsLoading || authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container flex-row">
      <aside className="sidebar">
        <div className="sidebar-nav">
          <ul>
            <li>
              <Link to="/dashboard">
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/tickets">
                <Ticket size={18} />
                All Tickets
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className="active"
              >
                <UserCheck size={18} />
                Users
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <main className="main-content">
        <div className="card-header">
          <h2>User Management</h2>
          {!isAddingUser && !editingUser && (
            <button
              onClick={() => setIsAddingUser(true)}
              className="button button-primary"
            >
              <UserPlus size={18} />
              Add User
            </button>
          )}
        </div>

        {(isAddingUser || editingUser) && (
          <div className="card mb-20">
            <h3>{isAddingUser ? 'Add New User' : `Edit User: ${editingUser?.name}`}</h3>
            <UserForm
              user={editingUser}
              isNew={isAddingUser}
              onSubmit={isAddingUser ? handleAddUser : handleUpdateUser}
              onCancel={() => {
                setIsAddingUser(false);
                setEditingUser(null);
              }}
            />
          </div>
        )}

        <div className="card">
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
                  <td>{getRoleName(user.role)}</td>
                  <td>
                    <button
                      onClick={() => handleEditUser(user)}
                      className="button button-outline button-sm"
                      style={{ padding: '6px 12px', fontSize: '0.85em' }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};
