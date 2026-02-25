import React,
{
  useState,
  useEffect
}
from 'react';
import { useTickets } from '../context/TicketContext';
import { LoadingSpinner } from './LoadingSpinner';
import { Upload } from 'lucide-react';

export const TicketForm = ({ ticket,
  onSubmit,
  onCancel,
  isNew = false }) => {
  const [subject,
    setSubject]
  = useState('');
  const [description,
    setDescription]
  = useState('');
  const [category,
    setCategory]
  = useState('');
  const [priority,
    setPriority]
  = useState('Medium');
  const [attachments,
    setAttachments]
  = useState([]);
  const { loading } = useTickets();

  useEffect(() => {
    if (ticket) {
      setSubject(ticket.subject || '');
      setDescription(ticket.description || '');
      setCategory(ticket.category || '');
      setPriority(ticket.priority || 'Medium');
      setAttachments(ticket.attachments || []);
    }
  }, [ticket]);

  const handleFileChange = (e) => {
    // In a real app, you'd handle file uploads to a storage service
    const files = Array.from(e.target.files).map((file) => file.name);
    setAttachments((prev) => [
      ...
      prev,
      ...
      files
    ]);
    // Clear the input value so the same file can be selected again if needed
    e.target.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      subject,
      description,
      category,
      priority,
      attachments
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          className="input-field"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="textarea-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          disabled={loading}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="category">Category/Type (Optional)</label>
        <input
          type="text"
          id="category"
          className="input-field"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          className="select-field"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
          disabled={loading}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="attachments">Attachments</label>
        <input
          type="file"
          id="attachments"
          className="input-field"
          onChange={handleFileChange}
          multiple
          disabled={loading}
          style={{ display: 'none' }}
        />
        <label
          htmlFor="attachments"
          className="button button-secondary"
          style={{ display: 'inline-flex', cursor: 'pointer' }}
        >
          <Upload size={18} />
          Upload File(s)
        </label>
        {attachments.length > 0 && (
          <div className="mt-10">
            <p className="text-sm">Attached files:</p>
            <ul>
              {attachments.map((file, index) => (
                <li
                  key={index}
                  className="text-sm"
                >
                  {file}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex gap-10 mt-20">
        <button
          type="submit"
          className="button button-primary"
          disabled={loading}
        >
          {loading ? (
            <LoadingSpinner />
          ) : isNew ? (
            'Submit Ticket'
          ) : (
            'Save Changes'
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="button button-secondary"
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
