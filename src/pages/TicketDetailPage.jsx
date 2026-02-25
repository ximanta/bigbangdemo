import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicketById, updateTicket, users, statuses, priorities, categories } from '../utils/mockData';
import { formatDate, generateId } from '../utils/helpers';
import Dropdown from '../components/Dropdown';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import FileUpload from '../components/FileUpload';
import ActivityLog from '../components/ActivityLog';
import Modal from '../components/Modal';
import { Send, XCircle } from 'lucide-react';

const TicketDetailPage = ({ currentUser, addNotification }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAgent = currentUser && currentUser.role === 'agent';

  useEffect(() => {
    const foundTicket = getTicketById(id);
    if (foundTicket) {
      setTicket(foundTicket);
    } else {
      addNotification({ message: 'Ticket not found.', type: 'error' });
      navigate(isAgent ? '/dashboard' : '/my-tickets');
    }
  }, [id, navigate, isAgent, addNotification]);

  const handleUpdateTicket = (field, value) => {
    if (!ticket) return;

    const updatedTicket = {
      ...ticket,
      [field]: value,
      updatedAt: new Date().toISOString()
    };

    if (field === 'status' && value === 'Closed') {
      setIsModalOpen(true);
      return; // Wait for modal confirmation
    }

    // Add activity log entry for status/assignee changes
    let commentContent = '';
    if (field === 'status' && value !== ticket.status) {
      commentContent = `Status changed from '${ticket.status}' to '${value}'.`;
    } else if (field === 'assigneeId' && value !== ticket.assigneeId) {
      const oldAssignee = users.find(u => u.id === ticket.assigneeId)?.name || 'Unassigned';
      const newAssignee = users.find(u => u.id === value)?.name || 'Unassigned';
      commentContent = `Assignee changed from '${oldAssignee}' to '${newAssignee}'.`;
    }

    if (commentContent) {
      updatedTicket.comments = [
        ...(updatedTicket.comments || []),
        {
          id: generateId('COMM'),
          authorId: currentUser.id,
          type: 'internal',
          content: commentContent,
          createdAt: new Date().toISOString()
        }
      ];
    }

    updateTicket(updatedTicket);
    setTicket(updatedTicket);
    addNotification({ message: 'Ticket updated successfully!', type: 'success' });
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !currentUser || !ticket) return;

    const commentType = isAgent ? 'internal' : 'external';
    const updatedComments = [
      ...(ticket.comments || []),
      {
        id: generateId('COMM'),
        authorId: currentUser.id,
        type: commentType,
        content: newComment.trim(),
        createdAt: new Date().toISOString()
      }
    ];

    const updatedTicket = {
      ...ticket,
      comments: updatedComments,
      updatedAt: new Date().toISOString()
    };

    updateTicket(updatedTicket);
    setTicket(updatedTicket);
    setNewComment('');
    addNotification({ message: 'Comment added!', type: 'success' });
  };

  const handleFileAttach = (files) => {
    if (!ticket || !currentUser) return;

    const newAttachments = Array.isArray(files) ? files : [files];
    const attachmentObjects = newAttachments.map(file => ({
      fileName: file.name,
      url: `/uploads/${file.name}` // Mock URL
    }));

    const updatedTicket = {
      ...ticket,
      attachments: [...(ticket.attachments || []), ...attachmentObjects],
      updatedAt: new Date().toISOString()
    };

    updateTicket(updatedTicket);
    setTicket(updatedTicket);
    addNotification({ message: 'File(s) attached successfully!', type: 'success' });
  };

  const confirmCloseTicket = () => {
    if (!ticket) return;
    const updatedTicket = {
      ...ticket,
      status: 'Closed',
      updatedAt: new Date().toISOString(),
      comments: [
        ...(ticket.comments || []),
        {
          id: generateId('COMM'),
          authorId: currentUser.id,
          type: 'internal',
          content: 'Ticket confirmed closed.',
          createdAt: new Date().toISOString()
        }
      ]
    };
    updateTicket(updatedTicket);
    setTicket(updatedTicket);
    setIsModalOpen(false);
    addNotification({ message: 'Ticket has been closed.', type: 'success' });
  };

  if (!ticket) {
    return (
      <div className="main-content">
        <div className="container">
          <p>Loading ticket details...</p>
        </div>
      </div>
    );
  }

  const requester = users.find(u => u.id === ticket.requesterId);
  const assignee = users.find(u => u.id === ticket.assigneeId);
  const agentUsers = users.filter(user => user.role === 'agent');

  return (
    <div className="main-content">
      <div className="container">
        <h2 className="card-header">Ticket: {ticket.subject} ({ticket.id})</h2>

        <div className="ticket-detail-grid">
          <div className="detail-item">
            <strong>Requester:</strong> {requester?.name || 'N/A'}
          </div>
          <div className="detail-item">
            <strong>Category:</strong> {ticket.category}
          </div>
          <div className="detail-item">
            <strong>Created:</strong> {formatDate(ticket.createdAt)}
          </div>
          <div className="detail-item">
            <strong>Last Updated:</strong> {formatDate(ticket.updatedAt)}
          </div>
          <div className="detail-item">
            <strong>Status:</strong>
            {isAgent ? (
              <Dropdown
                id="status"
                options={statuses}
                value={ticket.status}
                onChange={(e) => handleUpdateTicket('status', e.target.value)}
              />
            ) : (
              <span className={`status-${ticket.status.toLowerCase().replace(/\s/g, '-')}`}>
                {ticket.status}
              </span>
            )}
          </div>
          <div className="detail-item">
            <strong>Priority:</strong>
            {isAgent ? (
              <Dropdown
                id="priority"
                options={priorities}
                value={ticket.priority}
                onChange={(e) => handleUpdateTicket('priority', e.target.value)}
              />
            ) : (
              <span>{ticket.priority}</span>
            )}
          </div>
          <div className="detail-item">
            <strong>Assignee:</strong>
            {isAgent ? (
              <Dropdown
                id="assignee"
                options={agentUsers.map(agent => ({ value: agent.id, label: agent.name }))}
                value={ticket.assigneeId || ''}
                onChange={(e) => handleUpdateTicket('assigneeId', e.target.value)}
                defaultOptionText="Unassigned"
              />
            ) : (
              <span>{assignee?.name || 'Unassigned'}</span>
            )}
          </div>
          <div className="detail-item full-width">
            <strong>Description:</strong>
            <p>{ticket.description}</p>
          </div>
        </div>

        <div className="card">
          <h3 className="card-header">Comments & Activity</h3>
          <ActivityLog activities={ticket.comments} />

          <div style={{ marginTop: '20px' }}>
            <TextArea
              id="new-comment"
              placeholder={isAgent ? "Add an internal note or public comment..." : "Add a comment to your ticket..."}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <Button onClick={handleAddComment} variant="primary" style={{ marginTop: '10px' }}>
              <Send size={18} style={{ marginRight: '8px' }} /> Add Comment
            </Button>
          </div>
        </div>

        <div className="card">
          <h3 className="card-header">Attachments</h3>
          <div className="file-list">
            {ticket.attachments && ticket.attachments.length > 0 ? (
              ticket.attachments.map((file, index) => (
                <p key={index}>
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    {file.fileName}
                  </a>
                </p>
              ))
            ) : (
              <p>No attachments.</p>
            )}
          </div>
          {(isAgent || currentUser.id === ticket.requesterId) && (
            <FileUpload
              label="Add new attachments"
              onFileSelect={handleFileAttach}
              multiple
            />
          )}
        </div>

        {isAgent && ticket.status !== 'Closed' && (
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            {ticket.status !== 'Resolved' && (
              <Button onClick={() => handleUpdateTicket('status', 'Resolved')} variant="success">
                Mark as Resolved
              </Button>
            )}
            <Button onClick={() => handleUpdateTicket('status', 'Closed')} variant="danger">
              <XCircle size={18} style={{ marginRight: '8px' }} /> Close Ticket
            </Button>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Confirm Close Ticket"
          footerButtons={[
            { children: 'Cancel', onClick: () => setIsModalOpen(false), variant: 'secondary' },
            { children: 'Confirm Close', onClick: confirmCloseTicket, variant: 'danger' }
          ]}
        >
          <p>Are you sure you want to close this ticket? This action cannot be undone.</p>
        </Modal>
      </div>
    </div>
  );
};

export default TicketDetailPage;
