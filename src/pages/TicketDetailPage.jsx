import React,
{
  useState,
  useEffect
}
from 'react';
import {
  useParams,
  useNavigate
}
from 'react-router-dom';
import { useTickets } from '../context/TicketContext';
import { useAuth } from '../context/AuthContext';
import { CommentSection } from '../components/CommentSection';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  formatDate,
  getStatusBadgeClass,
  getPriorityBadgeClass
}
from '../utils/helpers';
import {
  User,
  Tag,
  Clock,
  Calendar,
  Hash,
  AlertCircle,
  FileText,
  Activity,
  CheckCircle,
  XCircle,
  Trash2,
  ChevronLeft
}
from 'lucide-react';

export const TicketDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser,
    isAdmin,
    isAgent } = useAuth();
  const { tickets,
    getTicketById,
    getCommentsForTicket,
    getActivityForTicket,
    updateTicket,
    resolveTicket,
    closeTicket,
    deleteTicket,
    getAgents,
    loading } = useTickets();

  const [ticket,
    setTicket]
  = useState(null);
  const [comments,
    setComments]
  = useState([]);
  const [activities,
    setActivities]
  = useState([]);
  const [editMode,
    setEditMode]
  = useState(false);
  const [currentStatus,
    setCurrentStatus]
  = useState('');
  const [currentPriority,
    setCurrentPriority]
  = useState('');
  const [currentAssigneeId,
    setCurrentAssigneeId]
  = useState('');

  const agents = getAgents();

  useEffect(() => {
    if (tickets.length > 0) {
      const foundTicket = getTicketById(id);
      if (foundTicket) {
        setTicket(foundTicket);
        setCurrentStatus(foundTicket.status);
        setCurrentPriority(foundTicket.priority);
        setCurrentAssigneeId(foundTicket.assigneeId || 'null');
        setComments(getCommentsForTicket(id));
        setActivities(getActivityForTicket(id));
      } else {
        navigate('/tickets'); // Redirect if ticket not found
      }
    }
  },
  [
    id,
    tickets,
    getTicketById,
    getCommentsForTicket,
    getActivityForTicket,
    navigate
  ]);

  const handleUpdateTicket = async () => {
    if (!ticket) return;
    await updateTicket(ticket.id, {
      status: currentStatus,
      priority: currentPriority,
      assigneeId: currentAssigneeId === 'null' ? null : currentAssigneeId
    });
    setEditMode(false);
  };

  const handleResolveTicket = async () => {
    if (window.confirm('Are you sure you want to resolve this ticket?')) {
      await resolveTicket(ticket.id);
    }
  };

  const handleCloseTicket = async () => {
    if (window.confirm('Are you sure you want to close this ticket?')) {
      await closeTicket(ticket.id);
    }
  };

  const handleDeleteTicket = async () => {
    if (window.confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) {
      await deleteTicket(ticket.id);
      navigate('/tickets');
    }
  };

  if (loading || !ticket) {
    return <LoadingSpinner />;
  }

  const canEdit = isAdmin || isAgent;

  return (
    <div className="container">
      <button
        onClick={() => navigate(-1)}
        className="button button-outline mb-20"
      >
        <ChevronLeft size={18} />
        Back to Tickets
      </button>

      <div className="card">
        <div className="ticket-detail-header">
          <h2>Ticket: {ticket.subject}</h2>
          <div className="ticket-actions">
            {canEdit && !editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="button button-secondary"
                disabled={loading}
              >
                Edit
              </button>
            )}
            {canEdit && editMode && (
              <button
                onClick={handleUpdateTicket}
                className="button button-primary"
                disabled={loading}
              >
                Save
              </button>
            )}
            {canEdit && editMode && (
              <button
                onClick={() => setEditMode(false)}
                className="button button-secondary"
                disabled={loading}
              >
                Cancel
              </button>
            )}
            {canEdit && ticket.status !== 'Resolved' && (
              <button
                onClick={handleResolveTicket}
                className="button button-primary"
                disabled={loading}
              >
                <CheckCircle size={18} />
                Resolve Ticket
              </button>
            )}
            {canEdit && ticket.status !== 'Closed' && (
              <button
                onClick={handleCloseTicket}
                className="button button-secondary"
                disabled={loading}
              >
                <XCircle size={18} />
                Close Ticket
              </button>
            )}
            {isAdmin && (
              <button
                onClick={handleDeleteTicket}
                className="button button-danger"
                disabled={loading}
              >
                <Trash2 size={18} />
                Delete Ticket
              </button>
            )}
          </div>
        </div>

        <div className="ticket-meta mb-20">
          <div className="meta-item">
            <label><Hash size={14} /> Ticket ID</label>
            <span>{ticket.id}</span>
          </div>
          <div className="meta-item">
            <label><User size={14} /> Customer</label>
            <span>{ticket.customerName} ({ticket.customerId})</span>
          </div>
          <div className="meta-item">
            <label><Tag size={14} /> Status</label>
            {editMode && canEdit ? (
              <select
                className="select-field"
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}
                disabled={loading}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            ) : (
              <span className={`status-badge ${getStatusBadgeClass(ticket.status)}`}>
                {ticket.status}
              </span>
            )}
          </div>
          <div className="meta-item">
            <label><AlertCircle size={14} /> Priority</label>
            {editMode && canEdit ? (
              <select
                className="select-field"
                value={currentPriority}
                onChange={(e) => setCurrentPriority(e.target.value)}
                disabled={loading}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            ) : (
              <span className={`status-badge ${getPriorityBadgeClass(ticket.priority)}`}>
                {ticket.priority}
              </span>
            )}
          </div>
          <div className="meta-item">
            <label><User size={14} /> Assignee</label>
            {editMode && canEdit ? (
              <select
                className="select-field"
                value={currentAssigneeId}
                onChange={(e) => setCurrentAssigneeId(e.target.value)}
                disabled={loading}
              >
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
            ) : (
              <span>{ticket.assigneeName || 'Unassigned'}</span>
            )}
          </div>
          <div className="meta-item">
            <label><Calendar size={14} /> Created At</label>
            <span>{formatDate(ticket.createdAt)}</span>
          </div>
          <div className="meta-item">
            <label><Clock size={14} /> Last Updated</label>
            <span>{formatDate(ticket.updatedAt)}</span>
          </div>
          {ticket.category && (
            <div className="meta-item">
              <label><Tag size={14} /> Category</label>
              <span>{ticket.category}</span>
            </div>
          )}
        </div>

        <div className="card mt-20">
          <h3>Description</h3>
          <p>{ticket.description}</p>
        </div>

        {ticket.attachments && ticket.attachments.length > 0 && (
          <div className="card mt-20">
            <h3>Attachments</h3>
            <ul>
              {ticket.attachments.map((file, index) => (
                <li key={index}>
                  <FileText size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  {file}
                </li>
              ))}
            </ul>
          </div>
        )}

        <CommentSection
          ticketId={ticket.id}
          comments={comments}
        />

        <div className="activity-log">
          <h3>Activity Log</h3>
          <ul className="activity-list">
            {activities.length === 0 ? (
              <li>No activity yet.</li>
            ) : (
              activities.map((activity) => (
                <li
                  key={activity.id}
                  className="activity-item"
                >
                  <div className="activity-icon">
                    <Activity size={18} />
                  </div>
                  <div className="activity-content">
                    {activity.description}
                    <span className="activity-timestamp">
                      {formatDate(activity.timestamp)}
                    </span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
