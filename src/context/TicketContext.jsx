import React,
{
  createContext,
  useState,
  useEffect,
  useContext
}
from 'react';
import {
  mockTickets,
  mockUsers,
  mockComments,
  mockActivityLog
}
from '../data/mockData';
import {
  generateUniqueId,
  formatDate
}
from '../utils/helpers';
import { useAuth } from './AuthContext';

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets,
    setTickets]
  = useState([]);
  const [users,
    setUsers]
  = useState([]);
  const [comments,
    setComments]
  = useState([]);
  const [activityLog,
    setActivityLog]
  = useState([]);
  const [loading,
    setLoading]
  = useState(true);
  const { currentUser,
    showToast } = useAuth();

  useEffect(() => {
    // Simulate fetching data
    setLoading(true);
    setTimeout(() => {
      setTickets([...mockTickets]);
      setUsers([...mockUsers]);
      setComments([...mockComments]);
      setActivityLog([...mockActivityLog]);
      setLoading(false);
    }, 500);
  }, []);

  const addActivity = (ticketId, description) => {
    const newActivity = {
      id: generateUniqueId(),
      ticketId,
      timestamp: new Date().toISOString(),
      description
    };
    setActivityLog((prev) => [
      ...
      prev,
      newActivity
    ]);
  };

  const getTickets = () => {
    return tickets;
  };

  const getTicketById = (id) => {
    return tickets.find((ticket) => ticket.id === id);
  };

  const getCommentsForTicket = (ticketId) => {
    return comments
      .filter((comment) => comment.ticketId === ticketId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const getActivityForTicket = (ticketId) => {
    return activityLog
      .filter((activity) => activity.ticketId === ticketId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const addTicket = (newTicketData) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTicket = {
          id: `TKT-${(tickets.length + 1).toString().padStart(3, '0')}`,
          ...newTicketData,
          customerId: currentUser.id,
          customerName: currentUser.name,
          status: 'Open',
          priority: newTicketData.priority || 'Medium',
          assigneeId: null,
          assigneeName: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setTickets((prev) => [
          ...
          prev,
          newTicket
        ]);
        addActivity(
          newTicket.id,
          `Ticket created by ${newTicket.customerName}.`
        );
        showToast('Ticket submitted successfully!', 'success');
        setLoading(false);
        resolve(newTicket);
      }, 300);
    });
  };

  const updateTicket = (ticketId, updates) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        let updatedTicket = null;
        setTickets((prev) =>
          prev.map((ticket) => {
            if (ticket.id === ticketId) {
              const oldStatus = ticket.status;
              const oldAssignee = ticket.assigneeName;
              const newStatus = updates.status || ticket.status;
              const newAssigneeId = updates.assigneeId || ticket.assigneeId;
              const newAssigneeName = newAssigneeId
                ? users.find((u) => u.id === newAssigneeId)?.name
                : null;

              updatedTicket = {
                ...
                ticket,
                ...
                updates,
                assigneeName: newAssigneeName,
                updatedAt: new Date().toISOString()
              };

              if (newStatus !== oldStatus) {
                addActivity(
                  ticketId,
                  `Ticket status changed from ${oldStatus} to ${newStatus} by ${currentUser.name}.`
                );
              }
              if (newAssigneeId && newAssigneeId !== ticket.assigneeId) {
                addActivity(
                  ticketId,
                  `Ticket assigned to ${newAssigneeName} by ${currentUser.name}.`
                );
              } else if (!newAssigneeId && ticket.assigneeId) {
                addActivity(
                  ticketId,
                  `Ticket unassigned from ${oldAssignee} by ${currentUser.name}.`
                );
              }
              showToast('Ticket updated successfully!', 'success');
              return updatedTicket;
            }
            return ticket;
          })
        );
        setLoading(false);
        resolve(updatedTicket);
      }, 300);
    });
  };

  const addComment = (ticketId, content, type = 'public') => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComment = {
          id: generateUniqueId(),
          ticketId,
          authorId: currentUser.id,
          authorName: currentUser.name,
          type,
          content,
          timestamp: new Date().toISOString()
        };
        setComments((prev) => [
          ...
          prev,
          newComment
        ]);
        addActivity(
          ticketId,
          `Comment added by ${currentUser.name} (${type}).`
        );
        showToast('Comment added!', 'success');
        setLoading(false);
        resolve(newComment);
      }, 300);
    });
  };

  const resolveTicket = (ticketId) => {
    return updateTicket(ticketId, { status: 'Resolved' });
  };

  const closeTicket = (ticketId) => {
    return updateTicket(ticketId, { status: 'Closed' });
  };

  const deleteTicket = (ticketId) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
        // Also delete comments and activity for this ticket (in a real app, this would be handled by backend)
        setComments((prev) =>
          prev.filter((comment) => comment.ticketId !== ticketId)
        );
        setActivityLog((prev) =>
          prev.filter((activity) => activity.ticketId !== ticketId)
        );
        showToast('Ticket deleted successfully!', 'info');
        setLoading(false);
        resolve();
      }, 300);
    });
  };

  const getAgents = () => {
    return users.filter((u) => u.role === 2 || u.role === 3);
  };

  const allUsers = users;

  const value = {
    tickets,
    users,
    loading,
    getTickets,
    getTicketById,
    getCommentsForTicket,
    getActivityForTicket,
    addTicket,
    updateTicket,
    addComment,
    resolveTicket,
    closeTicket,
    deleteTicket,
    getAgents,
    allUsers
  };

  return (
    <TicketContext.Provider value={value}>
      {!loading && children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  return useContext(TicketContext);
};
