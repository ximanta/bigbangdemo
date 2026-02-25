import React from 'react';
import {
  Link
}
from 'react-router-dom';
import {
  formatDate,
  getStatusBadgeClass,
  getPriorityBadgeClass
}
from '../utils/helpers';
import {
  Tag,
  User,
  Clock
}
from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const TicketCard = ({ ticket }) => {
  const { isCustomer } = useAuth();
  const detailPath = isCustomer ? `/my-tickets/${ticket.id}` : `/tickets/${ticket.id}`;

  return (
    <tr className="data-table-row">
      <td>
        <Link
          to={detailPath}
          className="text-md font-bold"
        >
          {ticket.id}
        </Link>
      </td>
      <td>
        <Link
          to={detailPath}
          className="text-md"
        >
          {ticket.subject}
        </Link>
      </td>
      {!isCustomer && <td>{ticket.customerName}</td>}
      <td>
        <span className={`status-badge ${getStatusBadgeClass(ticket.status)}`}>
          {ticket.status}
        </span>
      </td>
      <td>
        <span className={`status-badge ${getPriorityBadgeClass(ticket.priority)}`}>
          {ticket.priority}
        </span>
      </td>
      <td>{ticket.assigneeName || 'Unassigned'}</td>
      <td>{formatDate(ticket.updatedAt)}</td>
    </tr>
  );
};
