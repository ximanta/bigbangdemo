import React,
{
  useState,
  useEffect
} from "react";
import {
  useParams,
  useNavigate
} from "react-router-dom";
import { useEvents } from "../context/EventContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { Save, XCircle } from "lucide-react";

const EditEventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { getEventById,
    updateEvent } = useEvents();

  const [eventForm, setEventForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundEvent = getEventById(eventId);
    if (foundEvent) {
      setEventForm({
        id: foundEvent.id,
        name: foundEvent.name,
        dateStart: foundEvent.dateStart,
        dateEnd: foundEvent.dateEnd,
        location: foundEvent.location,
        description: foundEvent.description,
        agenda: foundEvent.agenda,
        delegates: foundEvent.delegates
      });
    } else {
      navigate("/404");
    }
    setLoading(false);
  },
    [eventId,
      getEventById,
      navigate]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEvent(eventForm);
    navigate(`/events/${eventId}`);
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!eventForm) {
    return null;
  }

  return (
    <div className="container main-content">
      <h2 className="text-center margin-top-large">
        Edit Event: "
        {eventForm.name}
        "
      </h2>
      <div className="card margin-top-large">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="eventName">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              name="name"
              value={eventForm.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateStart">
              Start Date
            </label>
            <input
              type="date"
              id="dateStart"
              name="dateStart"
              value={eventForm.dateStart}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateEnd">
              End Date
            </label>
            <input
              type="date"
              id="dateEnd"
              name="dateEnd"
              value={eventForm.dateEnd}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={eventForm.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={eventForm.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(`/events/${eventId}`)}
              className="button secondary"
            >
              <XCircle size={20} />
              Cancel
            </button>
            <button
              type="submit"
              className="button primary"
            >
              <Save size={20} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventPage;
