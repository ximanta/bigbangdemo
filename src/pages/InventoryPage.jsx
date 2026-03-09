import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Package } from 'lucide-react';
import { mockInventory, mockSuppliers } from '../data/mockData';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Badge from '../components/Badge';

const InventoryPage = ({ addNotification }) => {
  const [inventory, setInventory] = useState(mockInventory);
  const [filteredInventory, setFilteredInventory] = useState(mockInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSupplier, setFilterSupplier] = useState('all');
  const [filterLowStock, setFilterLowStock] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    sku: '',
    description: '',
    currentStock: '',
    unit: '',
    reorderPoint: '',
    costPerUnit: '',
    supplier: '',
  });

  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [adjustmentItem, setAdjustmentItem] = useState(null);
  const [adjustmentQuantity, setAdjustmentQuantity] = useState('');
  const [adjustmentType, setAdjustmentType] = useState('add'); // 'add' or 'subtract'

  useEffect(() => {
    let currentInventory = [...inventory];

    if (searchTerm) {
      currentInventory = currentInventory.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterSupplier !== 'all') {
      currentInventory = currentInventory.filter(
        (item) => item.supplier === filterSupplier
      );
    }

    if (filterLowStock) {
      currentInventory = currentInventory.filter(
        (item) => item.currentStock <= item.reorderPoint
      );
    }

    setFilteredInventory(currentInventory);
  }, [inventory, searchTerm, filterSupplier, filterLowStock]);

  const supplierOptions = [
    { value: 'all', label: 'All Suppliers' },
    ...mockSuppliers.map((s) => ({ value: s.name, label: s.name })),
  ];

  const unitOptions = [
    { value: 'kg', label: 'Kilogram (kg)' },
    { value: 'g', label: 'Gram (g)' },
    { value: 'L', label: 'Liter (L)' },
    { value: 'ml', label: 'Milliliter (ml)' },
    { value: 'unit', label: 'Unit' },
    { value: 'pack', label: 'Pack' },
    { value: 'sheet', label: 'Sheet' },
  ];

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      setFormState({
        name: item.name,
        sku: item.sku,
        description: item.description,
        currentStock: item.currentStock,
        unit: item.unit,
        reorderPoint: item.reorderPoint,
        costPerUnit: item.costPerUnit,
        supplier: item.supplier,
      });
    } else {
      setFormState({
        name: '',
        sku: '',
        description: '',
        currentStock: 0,
        unit: unitOptions[0].value,
        reorderPoint: 0,
        costPerUnit: 0,
        supplier: mockSuppliers[0]?.name || '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormState({
      name: '',
      sku: '',
      description: '',
      currentStock: '',
      unit: '',
      reorderPoint: '',
      costPerUnit: '',
      supplier: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedFormState = {
      ...formState,
      currentStock: parseFloat(formState.currentStock),
      reorderPoint: parseFloat(formState.reorderPoint),
      costPerUnit: parseFloat(formState.costPerUnit),
    };

    if (editingItem) {
      setInventory((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...item, ...parsedFormState } : item
        )
      );
      addNotification(`Inventory item '${formState.name}' updated.`, 'success');
    } else {
      const newItem = {
        id: `ING${String(inventory.length + 1).padStart(3, '0')}`,
        ...parsedFormState,
      };
      setInventory((prev) => [...prev, newItem]);
      addNotification(`New inventory item '${formState.name}' added.`, 'success');
    }
    handleCloseModal();
  };

  const handleDeleteItem = (id) => {
    if (confirm('Are you sure you want to delete this inventory item?')) {
      setInventory((prev) => prev.filter((item) => item.id !== id));
      addNotification('Inventory item deleted successfully.', 'info');
    }
  };

  const handleOpenAdjustmentModal = (item) => {
    setAdjustmentItem(item);
    setAdjustmentQuantity('');
    setAdjustmentType('add');
    setIsAdjustmentModalOpen(true);
  };

  const handleCloseAdjustmentModal = () => {
    setIsAdjustmentModalOpen(false);
    setAdjustmentItem(null);
    setAdjustmentQuantity('');
  };

  const handleStockAdjustment = (e) => {
    e.preventDefault();
    if (!adjustmentItem || !adjustmentQuantity) return;

    const quantity = parseFloat(adjustmentQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      addNotification('Please enter a valid positive quantity.', 'error');
      return;
    }

    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === adjustmentItem.id) {
          const newStock = adjustmentType === 'add'
            ? item.currentStock + quantity
            : item.currentStock - quantity;
          if (newStock < 0) {
            addNotification('Stock cannot go below zero!', 'error');
            return item;
          }
          addNotification(
            `Stock for '${item.name}' ${adjustmentType === 'add' ? 'increased' : 'decreased'} by ${quantity}.`,
            'success'
          );
          return { ...item, currentStock: newStock };
        }
        return item;
      })
    );
    handleCloseAdjustmentModal();
  };

  return (
    <div>
      <div className="page-header">
        <h1>Inventory Management</h1>
        <Button variant="primary" icon={Plus} onClick={() => handleOpenModal()}>
          Add New Item
        </Button>
      </div>

      <Card className="mb-4">
        <div className="flex-row items-center gap-4 flex-wrap">
          <div className="flex-grow flex-row items-center gap-2">
            <Search size={20} color="var(--text-light)" />
            <Input
              placeholder="Search inventory by name, SKU, or supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
          </div>
          <Select
            label="Supplier"
            id="filter-supplier"
            options={supplierOptions}
            value={filterSupplier}
            onChange={(e) => setFilterSupplier(e.target.value)}
          />
          <ToggleSwitch
            label="Low Stock Only"
            id="filter-low-stock"
            checked={filterLowStock}
            onChange={(e) => setFilterLowStock(e.target.checked)}
          />
        </div>
      </Card>

      <Card>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Item Name</th>
                <th>Current Stock</th>
                <th>Unit</th>
                <th>Reorder Point</th>
                <th>Cost/Unit</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '1rem' }}>
                    No inventory items found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item) => (
                  <tr key={item.id}>
                    <td>{item.sku}</td>
                    <td>{item.name}</td>
                    <td>{item.currentStock}</td>
                    <td>{item.unit}</td>
                    <td>{item.reorderPoint}</td>
                    <td>${item.costPerUnit.toFixed(2)}</td>
                    <td>{item.supplier}</td>
                    <td>
                      {item.currentStock <= item.reorderPoint ? (
                        <Badge variant="low-stock">Low Stock</Badge>
                      ) : (
                        <Badge variant="success">In Stock</Badge>
                      )}
                    </td>
                    <td>
                      <div className="flex-row gap-2">
                        <Button
                          variant="secondary"
                          icon={Edit}
                          onClick={() => handleOpenModal(item)}
                          title="Edit Item"
                        />
                        <Button
                          variant="secondary"
                          onClick={() => handleOpenAdjustmentModal(item)}
                          title="Adjust Stock"
                        >
                          Adjust
                        </Button>
                        <Button
                          variant="danger"
                          icon={Trash2}
                          onClick={() => handleDeleteItem(item.id)}
                          title="Delete Item"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}
        actions={
          <Button type="submit" form="inventory-item-form" variant="primary">
            {editingItem ? 'Update Item' : 'Add Item'}
          </Button>
        }
      >
        <form id="inventory-item-form" onSubmit={handleSubmit}>
          <Input
            label="Item Name"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
          />
          <Input
            label="SKU"
            id="sku"
            name="sku"
            value={formState.sku}
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
              rows="2"
            ></textarea>
          </div>
          <Input
            label="Current Stock"
            id="currentStock"
            name="currentStock"
            type="number"
            value={formState.currentStock}
            onChange={handleChange}
            required
          />
          <Select
            label="Unit of Measure"
            id="unit"
            name="unit"
            options={unitOptions}
            value={formState.unit}
            onChange={handleChange}
            required
          />
          <Input
            label="Reorder Point"
            id="reorderPoint"
            name="reorderPoint"
            type="number"
            value={formState.reorderPoint}
            onChange={handleChange}
            required
          />
          <Input
            label="Cost Per Unit"
            id="costPerUnit"
            name="costPerUnit"
            type="number"
            value={formState.costPerUnit}
            onChange={handleChange}
            step="0.01"
            required
          />
          <Select
            label="Supplier"
            id="supplier"
            name="supplier"
            options={mockSuppliers.map((s) => ({ value: s.name, label: s.name }))}
            value={formState.supplier}
            onChange={handleChange}
            required
          />
        </form>
      </Modal>

      <Modal
        isOpen={isAdjustmentModalOpen}
        onClose={handleCloseAdjustmentModal}
        title={`Adjust Stock for ${adjustmentItem?.name}`}
        actions={
          <Button type="submit" form="stock-adjustment-form" variant="primary">
            Apply Adjustment
          </Button>
        }
      >
        {adjustmentItem && (
          <form id="stock-adjustment-form" onSubmit={handleStockAdjustment}>
            <p><strong>Current Stock:</strong> {adjustmentItem.currentStock} {adjustmentItem.unit}</p>
            <div className="form-group flex-row items-center gap-4">
              <label>
                <input
                  type="radio"
                  name="adjustmentType"
                  value="add"
                  checked={adjustmentType === 'add'}
                  onChange={() => setAdjustmentType('add')}
                />
                Add Stock
              </label>
              <label>
                <input
                  type="radio"
                  name="adjustmentType"
                  value="subtract"
                  checked={adjustmentType === 'subtract'}
                  onChange={() => setAdjustmentType('subtract')}
                />
                Subtract Stock
              </label>
            </div>
            <Input
              label="Quantity"
              id="adjustment-quantity"
              type="number"
              value={adjustmentQuantity}
              onChange={(e) => setAdjustmentQuantity(e.target.value)}
              required
              min="0.01"
              step="any"
            />
          </form>
        )}
      </Modal>
    </div>
  );
};

export default InventoryPage;
