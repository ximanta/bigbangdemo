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
  ChevronLeft
}
from 'lucide-react';

export const MyTicketDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { tickets,
    getTicketById,
    getCommentsForTicket,
    getActivityForTicket,
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

  useEffect(() => {
    if (tickets.length > 0) {
      const foundTicket = getTicketById(id);
      if (foundTicket && foundTicket.customerId === currentUser.id) {
        setTicket(foundTicket);
        setComments(getCommentsForTicket(id));
        setActivities(getActivityForTicket(id));
      } else {
        navigate('/my-tickets'); // Redirect if ticket not found or not owned by user
      }
    }
  },
  [
    id,
    tickets,
    getTicketById,
    getCommentsForTicket,
    getActivityForTicket,
    navigate,
    currentUser.id
  ]);

  if (loading || !ticket) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <button
        onClick={() => navigate(-1)}
        className="button button-outline mb-20"
      >
        <ChevronLeft size={18} />
        Back to My Tickets
      </button>

      <div className="card">
        <div className="ticket-detail-header">
          <h2>Ticket: {ticket.subject}</h2>
        </div>

        <div className="ticket-meta mb-20">
          <div className="meta-item">
            <label><Hash size={14} /> Ticket ID</label>
            <span>{ticket.id}</span>
          </div>
          <div className="meta-item">
            <label><User size={14} /> Customer</label>
            <span>{ticket.customerName}</span>
          </div>
          <div className="meta-item">
            <label><Tag size={14} /> Status</label>
            <span className={`status-badge ${getStatusBadgeClass(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>
          <div className="meta-item">
            <label><AlertCircle size={14} /> Priority</label>
            <span className={`status-badge ${getPriorityBadgeClass(ticket.priority)}`}>
              {ticket.priority}
            </span>
          </div>
          <div className="meta-item">
            <label><User size={14} /> Assigned To</label>
            <span>{ticket.assigneeName || 'Unassigned'}</span>
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
