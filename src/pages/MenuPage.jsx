import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Utensils } from 'lucide-react';
import { mockMenuItems, mockBrands, mockCategories, mockInventory } from '../data/mockData';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import ToggleSwitch from '../components/ToggleSwitch';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Badge from '../components/Badge';

const MenuPage = ({ addNotification }) => {
  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [filteredMenuItems, setFilteredMenuItems] = useState(mockMenuItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    availability: true,
    vegetarian: false,
    vegan: false,
    category: '',
    brand: '',
    prepTime: '',
    ingredients: [],
  });

  useEffect(() => {
    let currentItems = [...menuItems];

    if (searchTerm) {
      currentItems = currentItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBrand !== 'all') {
      currentItems = currentItems.filter((item) => item.brand === filterBrand);
    }

    if (filterCategory !== 'all') {
      currentItems = currentItems.filter(
        (item) => item.category === filterCategory
      );
    }

    if (filterAvailability !== 'all') {
      const isAvailable = filterAvailability === 'available';
      currentItems = currentItems.filter(
        (item) => item.availability === isAvailable
      );
    }

    setFilteredMenuItems(currentItems);
  }, [menuItems, searchTerm, filterBrand, filterCategory, filterAvailability]);

  const brandOptions = [
    { value: 'all', label: 'All Brands' },
    ...mockBrands.map((b) => ({ value: b.name, label: b.name })),
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...mockCategories.map((c) => ({ value: c.name, label: c.name })),
  ];

  const availabilityOptions = [
    { value: 'all', label: 'All' },
    { value: 'available', label: 'Available' },
    { value: 'unavailable', label: 'Unavailable' },
  ];

  const inventoryOptions = mockInventory.map((ing) => ({
    value: ing.id,
    label: `${ing.name} (${ing.unit})`,
  }));

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      setFormState({
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        availability: item.availability,
        vegetarian: item.vegetarian,
        vegan: item.vegan,
        category: item.category,
        brand: item.brand,
        prepTime: item.prepTime,
        ingredients: item.ingredients || [],
      });
    } else {
      setFormState({
        name: '',
        description: '',
        price: '',
        image: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Item',
        availability: true,
        vegetarian: false,
        vegan: false,
        category: mockCategories[0]?.name || '',
        brand: mockBrands[0]?.name || '',
        prepTime: 15,
        ingredients: [],
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormState({
      name: '',
      description: '',
      price: '',
      image: '',
      availability: true,
      vegetarian: false,
      vegan: false,
      category: '',
      brand: '',
      prepTime: '',
      ingredients: [],
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formState.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFormState((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const handleAddIngredient = () => {
    setFormState((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { id: inventoryOptions[0]?.value || '', quantity: 1, unit: 'unit' },
      ],
    }));
  };

  const handleRemoveIngredient = (index) => {
    setFormState((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...item, ...formState, price: parseFloat(formState.price), prepTime: parseInt(formState.prepTime) } : item
        )
      );
      addNotification(`Menu item '${formState.name}' updated.`, 'success');
    } else {
      const newItem = {
        id: `MI${String(menuItems.length + 1).padStart(3, '0')}`,
        ...formState,
        price: parseFloat(formState.price),
        prepTime: parseInt(formState.prepTime),
      };
      setMenuItems((prev) => [...prev, newItem]);
      addNotification(`New menu item '${formState.name}' added.`, 'success');
    }
    handleCloseModal();
  };

  const handleDeleteItem = (id) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
      addNotification('Menu item deleted successfully.', 'info');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Menu Management</h1>
        <Button variant="primary" icon={Plus} onClick={() => handleOpenModal()}>
          Add New Item
        </Button>
      </div>

      <Card className="mb-4">
        <div className="flex-row items-center gap-4 flex-wrap">
          <div className="flex-grow flex-row items-center gap-2">
            <Search size={20} color="var(--text-light)" />
            <Input
              placeholder="Search menu items by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
          </div>
          <Select
            label="Brand"
            id="filter-brand"
            options={brandOptions}
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
          />
          <Select
            label="Category"
            id="filter-category"
            options={categoryOptions}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
          <Select
            label="Availability"
            id="filter-availability"
            options={availabilityOptions}
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
          />
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {filteredMenuItems.length === 0 ? (
          <p>No menu items found matching your criteria.</p>
        ) : (
          filteredMenuItems.map((item) => (
            <Card key={item.id} className="flex-col">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="flex-row justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <Badge variant={item.availability ? 'available' : 'unavailable'}>
                  {item.availability ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2 flex-grow">
                {item.description.substring(0, 100)}...
              </p>
              <div className="flex-row justify-between items-center mt-auto pt-2 border-t border-border-color">
                <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                <div className="flex-row gap-2">
                  <Button
                    variant="secondary"
                    icon={Edit}
                    onClick={() => handleOpenModal(item)}
                    title="Edit Item"
                  />
                  <Button
                    variant="danger"
                    icon={Trash2}
                    onClick={() => handleDeleteItem(item.id)}
                    title="Delete Item"
                  />
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
        actions={
          <Button type="submit" form="menu-item-form" variant="primary">
            {editingItem ? 'Update Item' : 'Add Item'}
          </Button>
        }
      >
        <form id="menu-item-form" onSubmit={handleSubmit}>
          <Input
            label="Item Name"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
          />
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              className="textarea-field"
              rows="3"
              required
            ></textarea>
          </div>
          <Input
            label="Price"
            id="price"
            name="price"
            type="number"
            value={formState.price}
            onChange={handleChange}
            step="0.01"
            required
          />
          <Input
            label="Preparation Time (minutes)"
            id="prepTime"
            name="prepTime"
            type="number"
            value={formState.prepTime}
            onChange={handleChange}
            required
          />
          <Input
            label="Image URL"
            id="image"
            name="image"
            value={formState.image}
            onChange={handleChange}
            placeholder="e.g., https://via.placeholder.com/150"
          />
          <Select
            label="Category"
            id="category"
            name="category"
            options={mockCategories.map((c) => ({ value: c.name, label: c.name }))}
            value={formState.category}
            onChange={handleChange}
            required
          />
          <Select
            label="Brand"
            id="brand"
            name="brand"
            options={mockBrands.map((b) => ({ value: b.name, label: b.name }))}
            value={formState.brand}
            onChange={handleChange}
            required
          />
          <ToggleSwitch
            label="Available"
            id="availability"
            name="availability"
            checked={formState.availability}
            onChange={handleChange}
          />
          <ToggleSwitch
            label="Vegetarian"
            id="vegetarian"
            name="vegetarian"
            checked={formState.vegetarian}
            onChange={handleChange}
          />
          <ToggleSwitch
            label="Vegan"
            id="vegan"
            name="vegan"
            checked={formState.vegan}
            onChange={handleChange}
          />

          <h4 className="mt-4 mb-2">Ingredients</h4>
          {formState.ingredients.map((ing, index) => (
            <div key={index} className="flex-row gap-2 items-center mb-2">
              <Select
                options={inventoryOptions}
                value={ing.id}
                onChange={(e) => handleIngredientChange(index, 'id', e.target.value)}
                className="flex-grow"
              />
              <Input
                type="number"
                value={ing.quantity}
                onChange={(e) => handleIngredientChange(index, 'quantity', parseFloat(e.target.value))}
                placeholder="Quantity"
                className="w-24"
              />
              <Input
                type="text"
                value={ing.unit}
                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                placeholder="Unit"
                className="w-20"
              />
              <Button
                variant="danger"
                onClick={() => handleRemoveIngredient(index)}
                type="button"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={handleAddIngredient}
            className="mt-2"
          >
            Add Ingredient
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default MenuPage;
