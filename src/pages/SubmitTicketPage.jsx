import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';
import TextArea from '../components/TextArea';
import Dropdown from '../components/Dropdown';
import FileUpload from '../components/FileUpload';
import Button from '../components/Button';
import { addTicket, categories, priorities } from '../utils/mockData';
import { generateId } from '../utils/helpers';

const SubmitTicketPage = ({ currentUser, addNotification }) => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      addNotification({ message: 'You must be logged in to submit a ticket.', type: 'error' });
      navigate('/login');
      return;
    }

    const newTicket = {
      id: generateId('TKT'),
      subject,
      description,
      status: 'Open',
      priority: priority || 'Low', // Default to Low if customer doesn't select
      category: category || 'General Inquiry',
      requesterId: currentUser.id,
      assigneeId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [
        { id: generateId('COMM'), authorId: currentUser.id, type: 'external', content: 'Ticket submitted.', createdAt: new Date().toISOString() }
      ],
      attachments: attachments.map(file => ({ fileName: file.name, url: `/uploads/${file.name}` }))
    };

    addTicket(newTicket);
    addNotification({ message: `Ticket ${newTicket.id} submitted successfully!`, type: 'success' });

    // Clear form
    setSubject('');
    setDescription('');
    setCategory('');
    setPriority('');
    setAttachments([]);

    // Redirect based on user role
    if (currentUser.role === 'agent') {
      navigate('/dashboard');
    } else {
      navigate('/my-tickets');
    }
  };

  return (
    <div className="main-content">
      <div className="container" style={{ maxWidth: '700px' }}>
        <h2 className="card-header">Submit New Ticket</h2>
        <form onSubmit={handleSubmit}>
          <TextInput
            id="subject"
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Briefly describe your issue or request"
            required
          />
          <TextArea
            id="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a detailed description of your issue or request"
            required
          />
          <Dropdown
            id="category"
            label="Category"
            options={categories}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            defaultOptionText="Select a category"
            required
          />
          <Dropdown
            id="priority"
            label="Priority (Optional)"
            options={priorities}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            defaultOptionText="Select priority (e.g., Low, High)"
          />
          <FileUpload
            label="Attach Files (Optional)"
            onFileSelect={setAttachments}
            multiple
          />
          <Button type="submit" variant="primary" style={{ marginTop: '20px' }}>
            Submit Ticket
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SubmitTicketPage;
