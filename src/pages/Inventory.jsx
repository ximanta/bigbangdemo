import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import AlertMessage from '../components/AlertMessage';
import {
  mockInventory,
  inventoryCategories,
  inventoryUnits,
} from '../data/mockData';
import { getDaysUntilExpiry, formatDate, getTodayDateString } from '../utils/dateUtils';

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState(mockInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '', show: false });

  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    unit: inventoryUnits[0],
    category: inventoryCategories[0],
    purchaseDate: getTodayDateString(),
    expiryDate: '',
  });

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type, show: true });
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (delta) => {
    setNewItem((prev) => ({
      ...prev,
      quantity: Math.max(1, (prev.quantity || 0) + delta),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.quantity || !newItem.expiryDate) {
      showAlert('Please fill in all required fields.', 'danger');
      return;
    }

    if (editingItem) {
      setInventoryItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...newItem, id: item.id } : item,
        ),
      );
      showAlert('Item updated successfully!');
    } else {
      setInventoryItems((prev) => [
        ...prev,
        { ...newItem, id: `inv${Date.now()}` },
      ]);
      showAlert('Item added successfully!');
    }
    resetForm();
  };

  const resetForm = () => {
    setNewItem({
      name: '',
      quantity: 1,
      unit: inventoryUnits[0],
      category: inventoryCategories[0],
      purchaseDate: getTodayDateString(),
      expiryDate: '',
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventoryItems((prev) => prev.filter((item) => item.id !== id));
      showAlert('Item deleted successfully!', 'danger');
    }
  };

  const getExpiryProgress = (expiryDate) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days <= 0) return { width: '100%', color: 'red', text: 'Expired!' };
    if (days <= 3) return { width: '100%', color: 'red', text: `${days} day${days === 1 ? '' : 's'} left` };
    if (days <= 7) return { width: '50%', color: 'orange', text: `${days} days left` };
    return { width: '20%', color: 'green', text: `${days} days left` };
  };

  const filteredItems = inventoryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Header title="My Inventory" />
      <AlertMessage
        message={alert.message}
        type={alert.type}
        show={alert.show}
        onClose={closeAlert}
      />
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search inventory items"
      />
      <div className="container">
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus size={20} style={{ marginRight: '8px' }} />
          {showForm ? 'Hide Form' : 'Add New Item'}
        </Button>

        {showForm && (
          <div className="card" style={{ marginTop: '16px' }}>
            <h3>{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleInputChange}
                placeholder="Item Name"
                className="input-field"
                required
              />
              <div className="flex-row flex-space-between" style={{ marginBottom: '12px' }}>
                <div style={{ flex: 1, marginRight: '8px' }}>
                  <label htmlFor="quantity" className="text-small">Quantity:</label>
                  <div className="flex-row">
                    <Button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      variant="secondary"
                      style={{ padding: '8px 12px', minWidth: 'unset', marginRight: '4px' }}
                    >
                      <ChevronDown size={16} />
                    </Button>
                    <input
                      type="number"
                      name="quantity"
                      value={newItem.quantity}
                      onChange={handleInputChange}
                      className="input-field"
                      style={{ flex: 1, margin: 0, textAlign: 'center' }}
                      min="1"
                      required
                    />
                    <Button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      variant="secondary"
                      style={{ padding: '8px 12px', minWidth: 'unset', marginLeft: '4px' }}
                    >
                      <ChevronUp size={16} />
                    </Button>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label htmlFor="unit" className="text-small">Unit:</label>
                  <select
                    name="unit"
                    value={newItem.unit}
                    onChange={handleInputChange}
                    className="select-field"
                    required
                  >
                    {inventoryUnits.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label htmlFor="category" className="text-small">Category:</label>
              <select
                name="category"
                value={newItem.category}
                onChange={handleInputChange}
                className="select-field"
                required
              >
                {inventoryCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <label htmlFor="purchaseDate" className="text-small">Purchase Date:</label>
              <input
                type="date"
                name="purchaseDate"
                value={newItem.purchaseDate}
                onChange={handleInputChange}
                className="input-field"
                required
              />

              <label htmlFor="expiryDate" className="text-small">Expiry Date:</label>
              <input
                type="date"
                name="expiryDate"
                value={newItem.expiryDate}
                onChange={handleInputChange}
                className="input-field"
                required
              />

              <div className="flex-row" style={{ marginTop: '16px' }}>
                <Button type="submit" style={{ marginRight: '8px' }}>
                  {editingItem ? 'Save Changes' : 'Add Item'}
                </Button>
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <h2 style={{ marginTop: '24px', marginBottom: '16px' }}>Your Items</h2>
        {filteredItems.length === 0 ? (
          <p className="text-center text-light-color">No items found. Add some!</p>
        ) : (
          filteredItems.map((item) => {
            const expiryInfo = getExpiryProgress(item.expiryDate);
            return (
              <div key={item.id} className="card flex-row flex-align-start">
                <div style={{ flexGrow: 1 }}>
                  <h3>{item.name}</h3>
                  <p className="text-small">
                    {item.quantity} {item.unit} &bull; {item.category}
                  </p>
                  <p className="text-small">
                    Purchased: {formatDate(item.purchaseDate)}
                  </p>
                  <p className="text-small">
                    Expires: {formatDate(item.expiryDate)}
                  </p>
                  <div className="progress-bar-container">
                    <div
                      className={`progress-bar ${expiryInfo.color}`}
                      style={{ width: expiryInfo.width }}
                    ></div>
                  </div>
                  <p className="text-small" style={{ marginTop: '4px' }}>
                    {expiryInfo.text}
                  </p>
                </div>
                <div className="flex-row">
                  <button
                    className="icon-button primary"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    className="icon-button danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Inventory;
