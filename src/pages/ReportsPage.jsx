import React, { useState } from 'react';
import { Download } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import DatePicker from '../components/DatePicker';
import Chart from '../components/Chart';
import { mockOrders, mockInventory } from '../data/mockData';

const ReportsPage = () => {
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-10-27');

  const generateSalesData = () => {
    const salesByDate = {};
    mockOrders.forEach((order) => {
      const orderDate = new Date(order.orderTime);
      if (
        orderDate >= new Date(startDate) &&
        orderDate <= new Date(endDate) &&
        order.status === 'completed'
      ) {
        const dateKey = orderDate.toISOString().split('T')[0];
        salesByDate[dateKey] = (salesByDate[dateKey] || 0) + order.total;
      }
    });

    return Object.keys(salesByDate).map((date) => ({
      date,
      sales: salesByDate[date],
    }));
  };

  const generateTopItemsData = () => {
    const itemSales = {};
    mockOrders.forEach((order) => {
      const orderDate = new Date(order.orderTime);
      if (
        orderDate >= new Date(startDate) &&
        orderDate <= new Date(endDate) &&
        order.status === 'completed'
      ) {
        order.items.forEach((item) => {
          itemSales[item.name] = (itemSales[item.name] || 0) + item.quantity;
        });
      }
    });

    return Object.keys(itemSales)
      .map((name) => ({ item: name, quantity: itemSales[name] }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  };

  const generateInventoryUsageData = () => {
    const usage = {};
    mockOrders.forEach((order) => {
      const orderDate = new Date(order.orderTime);
      if (
        orderDate >= new Date(startDate) &&
        orderDate <= new Date(endDate) &&
        order.status === 'completed'
      ) {
        order.items.forEach((menuItem) => {
          const fullMenuItem = mockInventory.find(
            (item) => item.name === menuItem.name
          );
          if (fullMenuItem && fullMenuItem.ingredients) {
            fullMenuItem.ingredients.forEach((ingredient) => {
              const actualIngredient = mockInventory.find(
                (inv) => inv.id === ingredient.id
              );
              if (actualIngredient) {
                const consumed = ingredient.quantity * menuItem.quantity;
                usage[actualIngredient.name] = (usage[actualIngredient.name] || 0) + consumed;
              }
            });
          }
        });
      }
    });

    return Object.keys(usage)
      .map((name) => ({ ingredient: name, usage: usage[name] }))
      .sort((a, b) => b.usage - a.usage)
      .slice(0, 5);
  };

  const handleExportData = () => {
    const dataToExport = {
      salesByDate: generateSalesData(),
      topSellingItems: generateTopItemsData(),
      inventoryUsage: generateInventoryUsageData(),
      // Add more data as needed
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataToExport, null, 2)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = `CKM_Report_${startDate}_to_${endDate}.json`;
    link.click();
  };

  return (
    <div>
      <div className="page-header">
        <h1>Reports & Analytics</h1>
        <Button variant="primary" icon={Download} onClick={handleExportData}>
          Export Data
        </Button>
      </div>

      <Card className="mb-4">
        <div className="flex-row items-center gap-4">
          <DatePicker
            label="Start Date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <DatePicker
            label="End Date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Chart
          title="Daily Sales (Completed Orders)"
          type="Line Chart"
          data={generateSalesData()}
        />
        <Chart
          title="Top 5 Selling Menu Items"
          type="Bar Chart"
          data={generateTopItemsData()}
        />
        <Chart
          title="Top 5 Inventory Usage"
          type="Bar Chart"
          data={generateInventoryUsageData()}
        />
        <Chart
          title="Delivery Performance (Avg Time)"
          type="Line Chart"
          data={[
            { date: '2023-10-20', avgTime: 25 },
            { date: '2023-10-21', avgTime: 22 },
            { date: '2023-10-22', avgTime: 28 },
            { date: '2023-10-23', avgTime: 20 },
          ]}
        />
      </div>

      <Card title="Sales Summary Table" className="mt-4">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Sales</th>
                <th>Number of Orders</th>
              </tr>
            </thead>
            <tbody>
              {generateSalesData().map((data) => (
                <tr key={data.date}>
                  <td>{data.date}</td>
                  <td>${data.sales.toFixed(2)}</td>
                  <td>{mockOrders.filter(o => o.status === 'completed' && o.orderTime.startsWith(data.date)).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ReportsPage;
