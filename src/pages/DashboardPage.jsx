import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import TextInput from '../components/TextInput';
import Dropdown from '../components/Dropdown';
import Pagination from '../components/Pagination';
import Button from '../components/Button';
import { tickets, users, statuses, categories, priorities } from '../utils/mockData';
import { formatDate } from '../utils/helpers';
import { PlusCircle } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterAssignee, setFilterAssignee] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  const agentUsers = users.filter(user => user.role === 'agent');

  useEffect(() => {
    let results = tickets;

    if (searchTerm) {
      results = results.filter(
        ticket =>
          ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus) {
      results = results.filter(ticket => ticket.status === filterStatus);
    }

    if (filterAssignee) {
      results = results.filter(ticket => ticket.assigneeId === filterAssignee);
    }

    if (filterPriority) {
      results = results.filter(ticket => ticket.priority === filterPriority);
    }

    if (filterCategory) {
      results = results.filter(ticket => ticket.category === filterCategory);
    }

    setFilteredTickets(results);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, filterStatus, filterAssignee, filterPriority, filterCategory]);

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowClick = (ticket) => {
    navigate(`/tickets/${ticket.id}`);
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Subject', accessor: 'subject' },
    { header: 'Requester', render: (row) => users.find(u => u.id === row.requesterId)?.name || 'N/A' },
    { header: 'Status', accessor: 'status', className: (row) => `status-${row.status.toLowerCase().replace(/\s/g, '-')}` },
    { header: 'Priority', accessor: 'priority' },
    { header: 'Assignee', render: (row) => users.find(u => u.id === row.assigneeId)?.name || 'Unassigned' },
    { header: 'Created', render: (row) => formatDate(row.createdAt) },
    { header: 'Last Updated', render: (row) => formatDate(row.updatedAt) }
  ];

  return (
    <div className="main-content">
      <div className="container">
        <h2 className="card-header">Agent Dashboard</h2>

        <div className="search-filter-bar">
          <TextInput
            id="search"
            placeholder="Search by ID, subject, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dropdown
            id="status-filter"
            defaultOptionText="All Statuses"
            options={statuses}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          />
          <Dropdown
            id="assignee-filter"
            defaultOptionText="All Assignees"
            options={agentUsers.map(agent => ({ value: agent.id, label: agent.name }))}
            value={filterAssignee}
            onChange={(e) => setFilterAssignee(e.target.value)}
          />
          <Dropdown
            id="priority-filter"
            defaultOptionText="All Priorities"
            options={priorities}
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          />
          <Dropdown
            id="category-filter"
            defaultOptionText="All Categories"
            options={categories}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
          <Button onClick={() => navigate('/tickets/new')} variant="primary">
            <PlusCircle size={18} style={{ marginRight: '8px' }} /> New Ticket
          </Button>
        </div>

        <Table
          columns={columns}
          data={currentTickets}
          onRowClick={handleRowClick}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
