import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import TextInput from '../components/TextInput';
import Dropdown from '../components/Dropdown';
import Pagination from '../components/Pagination';
import { tickets, statuses, users } from '../utils/mockData';
import { formatDate } from '../utils/helpers';

const MyTicketsPage = ({ currentUser }) => {
  const navigate = useNavigate();
  const [userTickets, setUserTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;

  useEffect(() => {
    if (currentUser) {
      const customerTickets = tickets.filter(ticket => ticket.requesterId === currentUser.id);
      setUserTickets(customerTickets);
    }
  }, [currentUser]);

  useEffect(() => {
    let results = userTickets;

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

    setFilteredTickets(results);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchTerm, filterStatus, userTickets]);

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowClick = (ticket) => {
    navigate(`/my-tickets/${ticket.id}`);
  };

  const columns = [
    { header: 'Ticket ID', accessor: 'id' },
    { header: 'Subject', accessor: 'subject' },
    { header: 'Status', accessor: 'status', className: (row) => `status-${row.status.toLowerCase().replace(/\s/g, '-')}` },
    { header: 'Created Date', render: (row) => formatDate(row.createdAt) },
    { header: 'Last Updated', render: (row) => formatDate(row.updatedAt) }
  ];

  return (
    <div className="main-content">
      <div className="container">
        <h2 className="card-header">My Tickets</h2>

        <div className="search-filter-bar">
          <TextInput
            id="search"
            placeholder="Search by ID, subject..."
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

export default MyTicketsPage;
