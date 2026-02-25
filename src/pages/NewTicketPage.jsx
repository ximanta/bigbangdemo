import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../context/TicketContext';
import { TicketForm } from '../components/TicketForm';
import { PlusCircle,
  ChevronLeft } from 'lucide-react';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const NewTicketPage = () => {
  const { addTicket,
    loading } = useTickets();
  const navigate = useNavigate();

  const handleSubmit = async (ticketData) => {
    await addTicket(ticketData);
    navigate('/my-tickets');
  };

  return (
    <div className="container">
      <button
        onClick={() => navigate(-1)}
        className="button button-outline mb-20"
      >
        <ChevronLeft size={18} />
        Back
      </button>
      <div className="card">
        <div className="card-header">
          <h2>
            <PlusCircle size={24} />
            Submit New Ticket
          </h2>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <TicketForm
            isNew
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};
