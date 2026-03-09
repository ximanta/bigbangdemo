import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, SortAsc } from 'lucide-react';
import { format } from 'date-fns';
import { mockOrders, mockDeliveryPartners, mockBrands } from '../data/mockData';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Badge from '../components/Badge';
import Modal from '../components/Modal';

const OrdersPage = ({ addNotification }) => {
  const [orders, setOrders] = useState(mockOrders);
  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPartner, setFilterPartner] = useState('all');
  const [filterBrand, setFilterBrand] = useState('all');
  const [sortKey, setSortKey] = useState('orderTime');
  const [sortDirection, setSortDirection] = useState('desc');

  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    let currentOrders = [...orders];

    // Filter by search term
    if (searchTerm) {
      currentOrders = currentOrders.filter(
        (order) =>
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      currentOrders = currentOrders.filter(
        (order) => order.status === filterStatus
      );
    }

    // Filter by delivery partner
    if (filterPartner !== 'all') {
      currentOrders = currentOrders.filter(
        (order) => order.deliveryPartner === filterPartner
      );
    }

    // Filter by brand
    if (filterBrand !== 'all') {
      currentOrders = currentOrders.filter(
        (order) => order.brand === filterBrand
      );
    }

    // Sort orders
    currentOrders.sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      if (sortKey === 'orderTime') {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredOrders(currentOrders);
  }, [orders, searchTerm, filterStatus, filterPartner, filterBrand, sortKey, sortDirection]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'new':
        return 'new';
      case 'preparing':
        return 'preparing';
      case 'ready':
        return 'ready';
      case 'dispatched':
        return 'dispatched';
      case 'completed':
        return 'completed';
      case 'canceled':
        return 'canceled';
      default:
        return 'info';
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsOrderDetailsModalOpen(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    addNotification(`Order ${orderId} status updated to ${newStatus}.`, 'success');
    setSelectedOrder(null); // Close modal after action
    setIsOrderDetailsModalOpen(false);
  };

  const calculateTimeRemaining = (orderTime, prepTime) => {
    const orderDate = new Date(orderTime);
    const estimatedReadyTime = new Date(
      orderDate.getTime() + prepTime * 60 * 1000
    );
    const now = new Date();
    const remainingMillis = estimatedReadyTime.getTime() - now.getTime();

    if (remainingMillis <= 0) return 'Overdue';

    const minutes = Math.floor(remainingMillis / (1000 * 60));
    const seconds = Math.floor((remainingMillis % (1000 * 60)) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'new', label: 'New' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready' },
    { value: 'dispatched', label: 'Dispatched' },
    { value: 'completed', label: 'Completed' },
    { value: 'canceled', label: 'Canceled' },
  ];

  const deliveryPartnerOptions = [
    { value: 'all', label: 'All Partners' },
    ...mockDeliveryPartners.map((p) => ({ value: p.name, label: p.name })),
  ];

  const brandOptions = [
    { value: 'all', label: 'All Brands' },
    ...mockBrands.map((b) => ({ value: b.name, label: b.name })),
  ];

  const sortOptions = [
    { value: 'orderTime', label: 'Order Time' },
    { value: 'customerName', label: 'Customer Name' },
    { value: 'total', label: 'Total' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Order Management</h1>
        <Button variant="primary" icon={Plus} onClick={() => addNotification('Adding new orders is not supported in demo.', 'info')}>
          Add New Order
        </Button>
      </div>

      <Card className="mb-4">
        <div className="flex-row items-center gap-4 flex-wrap">
          <div className="flex-grow flex-row items-center gap-2">
            <Search size={20} color="var(--text-light)" />
            <Input
              placeholder="Search orders by ID, customer, brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
          </div>
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="Status"
            id="filter-status"
          />
          <Select
            options={deliveryPartnerOptions}
            value={filterPartner}
            onChange={(e) => setFilterPartner(e.target.value)}
            label="Partner"
            id="filter-partner"
          />
          <Select
            options={brandOptions}
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            label="Brand"
            id="filter-brand"
          />
          <Select
            options={sortOptions}
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            label="Sort By"
            id="sort-by"
          />
          <Button
            variant="secondary"
            onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
            icon={SortAsc}
            title="Toggle Sort Direction"
          >
            {sortDirection === 'asc' ? 'ASC' : 'DESC'}
          </Button>
        </div>
      </Card>

      <Card>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Brand</th>
                <th>Delivery Partner</th>
                <th>Status</th>
                <th>Order Time</th>
                <th>Total</th>
                <th>Time Left</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '1rem' }}>
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.brand}</td>
                    <td>{order.deliveryPartner}</td>
                    <td>
                      <Badge variant={getStatusVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td>{format(new Date(order.orderTime), 'MMM dd, HH:mm')}
                    </td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      {order.status === 'new' || order.status === 'preparing'
                        ? calculateTimeRemaining(order.orderTime, order.prepTime)
                        : '-'}
                    </td>
                    <td>
                      <Button
                        variant="secondary"
                        onClick={() => handleViewOrder(order)}
                        size="small"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={isOrderDetailsModalOpen}
        onClose={() => setIsOrderDetailsModalOpen(false)}
        title={`Order Details: ${selectedOrder?.id}`}
        actions={
          selectedOrder && selectedOrder.status !== 'completed' && selectedOrder.status !== 'canceled' && (
            <>
              {selectedOrder.status === 'new' && (
                <Button
                  variant="primary"
                  onClick={() => handleStatusChange(selectedOrder.id, 'preparing')}
                >
                  Accept & Prepare
                </Button>
              )}
              {selectedOrder.status === 'preparing' && (
                <Button
                  variant="primary"
                  onClick={() => handleStatusChange(selectedOrder.id, 'ready')}
                >
                  Mark as Ready
                </Button>
              )}
              {selectedOrder.status === 'ready' && (
                <Button
                  variant="primary"
                  onClick={() => handleStatusChange(selectedOrder.id, 'dispatched')}
                >
                  Dispatch
                </Button>
              )}
              {selectedOrder.status === 'dispatched' && (
                <Button
                  variant="primary"
                  onClick={() => handleStatusChange(selectedOrder.id, 'completed')}
                >
                  Mark as Completed
                </Button>
              )}
              <Button
                variant="danger"
                onClick={() => handleStatusChange(selectedOrder.id, 'canceled')}
              >
                Cancel Order
              </Button>
            </>
          )
        }
      >
        {selectedOrder && (
          <div>
            <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
            <p><strong>Address:</strong> {selectedOrder.deliveryAddress}</p>
            <p><strong>Brand:</strong> {selectedOrder.brand}</p>
            <p><strong>Partner:</strong> {selectedOrder.deliveryPartner}</p>
            <p><strong>Status:</strong> <Badge variant={getStatusVariant(selectedOrder.status)}>{selectedOrder.status}</Badge></p>
            <p><strong>Order Time:</strong> {format(new Date(selectedOrder.orderTime), 'PPP p')}</p>
            <p><strong>Preparation Time:</strong> {selectedOrder.prepTime} minutes</p>
            <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
            <p><strong>Notes:</strong> {selectedOrder.notes || 'N/A'}</p>
            <h4 className="mt-4 mb-2">Items:</h4>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.quantity}x {item.name} (${item.price.toFixed(2)} each)
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrdersPage;
