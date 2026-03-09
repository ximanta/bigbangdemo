import React, { useState, useEffect } from 'react';
import { CircleDollarSign, Utensils, Package, ListOrdered } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Chart from '../components/Chart';
import { mockOrders, mockInventory, mockMenuItems } from '../data/mockData';

const DashboardPage = ({ addNotification }) => {
  const [orders, setOrders] = useState(mockOrders);
  const [inventory, setInventory] = useState(mockInventory);
  const [menuItems, setMenuItems] = useState(mockMenuItems);

  useEffect(() => {
    const newOrdersCount = orders.filter((order) => order.status === 'new').length;
    if (newOrdersCount > 0) {
      addNotification(`You have ${newOrdersCount} new orders!`, 'info');
    }

    const lowStockItems = inventory.filter(
      (item) => item.currentStock <= item.reorderPoint
    ).length;
    if (lowStockItems > 0) {
      addNotification(`Attention: ${lowStockItems} inventory items are low on stock!`, 'warning');
    }
  }, [orders, inventory, addNotification]);

  const totalSales = orders
    .filter((order) => order.status === 'completed')
    .reduce((sum, order) => sum + order.total, 0);

  const ordersInProgress = orders.filter(
    (order) => order.status === 'new' || order.status === 'preparing'
  ).length;

  const totalMenuItems = menuItems.length;
  const lowStockCount = inventory.filter(
    (item) => item.currentStock <= item.reorderPoint
  ).length;

  const handleRefresh = () => {
    // In a real app, this would refetch data from API
    setOrders([...mockOrders]);
    setInventory([...mockInventory]);
    setMenuItems([...mockMenuItems]);
    addNotification('Dashboard data refreshed!', 'success');
  };

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <Button variant="secondary" onClick={handleRefresh}>
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card className="flex-col items-center justify-center p-4">
          <CircleDollarSign size={36} color="var(--success-color)" />
          <h3 className="mt-2 text-lg">Total Sales</h3>
          <p className="text-2xl font-bold">${totalSales.toFixed(2)}</p>
        </Card>
        <Card className="flex-col items-center justify-center p-4">
          <ListOrdered size={36} color="var(--primary-color)" />
          <h3 className="mt-2 text-lg">Orders In Progress</h3>
          <p className="text-2xl font-bold">{ordersInProgress}</p>
        </Card>
        <Card className="flex-col items-center justify-center p-4">
          <Utensils size={36} color="var(--accent-color)" />
          <h3 className="mt-2 text-lg">Total Menu Items</h3>
          <p className="text-2xl font-bold">{totalMenuItems}</p>
        </Card>
        <Card className="flex-col items-center justify-center p-4">
          <Package size={36} color="var(--danger-color)" />
          <h3 className="mt-2 text-lg">Low Stock Items</h3>
          <p className="text-2xl font-bold">{lowStockCount}</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Chart
          title="Monthly Sales Trend"
          type="Line Chart"
          data={[
            { month: 'Jan', sales: 10000 },
            { month: 'Feb', sales: 12000 },
            { month: 'Mar', sales: 11000 },
            { month: 'Apr', sales: 13500 },
          ]}
        />
        <Chart
          title="Top Selling Items (Quantity)"
          type="Bar Chart"
          data={[
            { item: 'Classic Burger', count: 500 },
            { item: 'Margherita Pizza', count: 350 },
            { item: 'French Fries', count: 450 },
          ]}
        />
        <Chart
          title="Order Status Distribution"
          type="Pie Chart"
          data={[
            { status: 'New', count: 5 },
            { status: 'Preparing', count: 8 },
            { status: 'Ready', count: 3 },
            { status: 'Dispatched', count: 6 },
            { status: 'Completed', count: 20 },
          ]}
        />
        <Chart
          title="Inventory Usage (Last Week)"
          type="Bar Chart"
          data={[
            { item: 'Ground Beef', usage: 20 },
            { item: 'Potatoes', usage: 30 },
            { item: 'Pizza Dough', usage: 15 },
          ]}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
