import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Filter } from 'lucide-react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';
import AlertMessage from '../components/AlertMessage';
import {
  mockShoppingList,
  mockInventory,
  mockRecipes,
  mockMealPlan,
  inventoryUnits,
  inventoryCategories,
} from '../data/mockData';
import { getTodayDateString } from '../utils/dateUtils';

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState(mockShoppingList);
  const [newItemName, setNewItemName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [alert, setAlert] = useState({ message: '', type: '', show: false });

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type, show: true });
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  // Function to generate shopping list from meal plan and inventory
  const generateShoppingList = () => {
    const requiredIngredients = {};

    // Iterate through meal plan
    for (const date in mockMealPlan) {
      const meals = mockMealPlan[date];
      for (const slot in meals) {
        const recipeId = meals[slot];
        if (recipeId) {
          const recipe = mockRecipes.find(r => r.id === recipeId);
          if (recipe) {
            recipe.ingredients.forEach(ingredient => {
              const key = ingredient.item.toLowerCase();
              requiredIngredients[key] = requiredIngredients[key] || {
                item: ingredient.item,
                quantity: 0,
                unit: ingredient.unit,
              };
              requiredIngredients[key].quantity += parseFloat(ingredient.quantity);
            });
          }
        }
      }
    }

    // Compare with inventory
    const itemsToBuy = [];
    for (const key in requiredIngredients) {
      const required = requiredIngredients[key];
      const inventoryItem = mockInventory.find(
        inv => inv.name.toLowerCase() === required.item.toLowerCase() &&
               new Date(inv.expiryDate) >= new Date(getTodayDateString())
      );

      let quantityNeeded = required.quantity;
      if (inventoryItem) {
        // Simple unit conversion for demo, assuming compatible units
        // In a real app, this would be complex
        if (inventoryItem.unit === required.unit) {
          quantityNeeded = Math.max(0, required.quantity - inventoryItem.quantity);
        } else {
          // For now, if units don't match, assume we need to buy it.
          // Or, assume inventory is in 'units' and recipe is 'gram' etc.
          // For simplicity, if units differ, it's needed.
          // This is a simplification due to "no external libs" constraint.
        }
      }

      if (quantityNeeded > 0) {
        itemsToBuy.push({
          id: `sl-gen-${Date.now()}-${Math.random()}`,
          name: required.item,
          quantity: quantityNeeded,
          unit: required.unit,
          category: mockInventory.find(inv => inv.name.toLowerCase() === required.item.toLowerCase())?.category || 'General',
          purchased: false,
        });
      }
    }

    // Combine generated list with existing manual list, avoiding duplicates
    const combinedList = [...shoppingList];
    itemsToBuy.forEach(generatedItem => {
      const existingItemIndex = combinedList.findIndex(
        item => item.name.toLowerCase() === generatedItem.name.toLowerCase() && !item.purchased
      );
      if (existingItemIndex !== -1) {
        // Update quantity if item already exists
        combinedList[existingItemIndex].quantity += generatedItem.quantity;
      } else {
        combinedList.push(generatedItem);
      }
    });

    setShoppingList(combinedList);
    showAlert('Shopping list updated from meal plan and inventory!');
  };

  useEffect(() => {
    // Initial generation or regeneration based on data changes
    // For this demo, we'll call it once on mount
    // generateShoppingList(); // Uncomment to auto-generate on load
  }, []);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItemName.trim() === '') {
      showAlert('Item name cannot be empty.', 'danger');
      return;
    }
    setShoppingList((prev) => [
      ...prev,
      {
        id: `sl${Date.now()}`,
        name: newItemName.trim(),
        quantity: 1,
        unit: 'units', // Default unit for manually added items
        category: 'General',
        purchased: false,
      },
    ]);
    setNewItemName('');
    showAlert('Item added to shopping list!');
  };

  const togglePurchased = (id) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item,
      ),
    );
    showAlert('Item purchase status updated!');
  };

  const handleEditItem = (id, field, value) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      setShoppingList((prev) => prev.filter((item) => item.id !== id));
      showAlert('Item removed from shopping list!', 'danger');
    }
  };

  const filteredItems = shoppingList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === 'All' || item.category === filterCategory)
  );

  const categories = ['All', ...inventoryCategories.filter(cat => cat !== 'Other'), 'General', 'Other'];

  return (
    <>
      <Header title="Shopping List" />
      <AlertMessage
        message={alert.message}
        type={alert.type}
        show={alert.show}
        onClose={closeAlert}
      />
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search shopping list"
      />
      <div className="container">
        <div className="flex-row flex-space-between" style={{ marginBottom: '16px' }}>
          <Button onClick={generateShoppingList} style={{ marginRight: '8px' }}>
            <Plus size={20} style={{ marginRight: '8px' }} />
            Generate from Plan
          </Button>
          <div className="flex-row">
            <Filter size={20} style={{ marginRight: '8px', color: 'var(--text-light-color)' }} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="select-field"
              style={{ width: '150px', marginBottom: 0 }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <form onSubmit={handleAddItem} className="flex-row" style={{ marginBottom: '24px' }}>
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Add new item manually"
            className="input-field"
            style={{ flexGrow: 1, marginRight: '8px', marginBottom: 0 }}
          />
          <Button type="submit" style={{ padding: '10px 15px', minWidth: 'unset' }}>
            <Plus size={20} />
          </Button>
        </form>

        {filteredItems.length === 0 ? (
          <p className="text-center text-light-color">Your shopping list is empty. Time to add some items!</p>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="card flex-row flex-space-between" style={{ alignItems: 'center' }}>
              <div className="flex-row" style={{ alignItems: 'center', flexGrow: 1 }}>
                <input
                  type="checkbox"
                  checked={item.purchased}
                  onChange={() => togglePurchased(item.id)}
                  style={{ marginRight: '12px', transform: 'scale(1.2)' }}
                />
                <div style={{ flexGrow: 1 }}>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleEditItem(item.id, 'name', e.target.value)}
                    className="input-field"
                    style={{
                      textDecoration: item.purchased ? 'line-through' : 'none',
                      color: item.purchased ? 'var(--text-light-color)' : 'var(--text-color)',
                      fontWeight: item.purchased ? 'normal' : 'bold',
                      border: 'none',
                      padding: 0,
                      marginBottom: '4px',
                      backgroundColor: 'transparent',
                    }}
                  />
                  <div className="flex-row">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleEditItem(item.id, 'quantity', e.target.value)}
                      className="input-field"
                      style={{
                        width: '60px',
                        marginRight: '4px',
                        padding: '4px 8px',
                        fontSize: '14px',
                        marginBottom: 0,
                      }}
                      min="1"
                    />
                    <select
                      value={item.unit}
                      onChange={(e) => handleEditItem(item.id, 'unit', e.target.value)}
                      className="select-field"
                      style={{
                        width: '80px',
                        padding: '4px 8px',
                        fontSize: '14px',
                        marginBottom: 0,
                      }}
                    >
                      {inventoryUnits.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <button
                className="icon-button danger"
                onClick={() => handleDeleteItem(item.id)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ShoppingList;
