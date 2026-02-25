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
import { useTickets } from '../context/TicketContext';
import { useAuth } from '../context/AuthContext';
import { TicketCard } from '../components/TicketCard';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  Search,
  PlusCircle,
  LayoutDashboard,
  Ticket,
  UserCheck
}
from 'lucide-react';

export const TicketsPage = () => {
  const { tickets,
    getAgents,
    loading } = useTickets();
  const { currentUser,
    isAdmin,
    isAgent } = useAuth();
  const navigate = useNavigate();

  const [searchTerm,
    setSearchTerm]
  = useState('');
  const [filterStatus,
    setFilterStatus]
  = useState('all');
  const [filterPriority,
    setFilterPriority]
  = useState('all');
  const [filterAssignee,
    setFilterAssignee]
  = useState('all');
  const [currentPage,
    setCurrentPage]
  = useState(1);
  const ticketsPerPage = 10;

  const agents = getAgents();

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesAssignee = filterAssignee === 'all' || ticket.assigneeId === filterAssignee;

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
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
              <Link
                to="/tickets"
                className="active"
              >
                <Ticket size={18} />
                All Tickets
              </Link>
            </li>
            {(isAdmin || isAgent) && (
              <li>
                <Link to="/users">
                  <UserCheck size={18} />
                  Users
                </Link>
              </li>
            )}
          </ul>
        </div>
      </aside>
      <main className="main-content">
        <div className="card-header">
          <h2>All Tickets</h2>
          <button
            onClick={() => navigate('/new-ticket')}
            className="button button-primary"
          >
            <PlusCircle size={18} />
            New Ticket
          </button>
        </div>

        <div className="filter-bar">
          <div className="form-group search-input">
            <input
              type="text"
              placeholder="Search tickets..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="form-group filter-group">
            <label htmlFor="statusFilter">Status</label>
            <select
              id="statusFilter"
              className="select-field"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="form-group filter-group">
            <label htmlFor="priorityFilter">Priority</label>
            <select
              id="priorityFilter"
              className="select-field"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="form-group filter-group">
            <label htmlFor="assigneeFilter">Assignee</label>
            <select
              id="assigneeFilter"
              className="select-field"
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
            >
              <option value="all">All</option>
              <option value="null">Unassigned</option>
              {agents.map((agent) => (
                <option
                  key={agent.id}
                  value={agent.id}
                >
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-actions">
            <button
              className="button button-outline"
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setFilterPriority('all');
                setFilterAssignee('all');
                setCurrentPage(1);
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="card">
          {currentTickets.length === 0 ? (
            <p className="text-center">No tickets found matching your criteria.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Subject</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assignee</th>
                  <th>Last Update</th>
                </tr>
              </thead>
              <tbody>
                {currentTickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};
