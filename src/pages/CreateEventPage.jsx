import React,
{
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import { PlusCircle, Save } from "lucide-react";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { addEvent } = useEvents();

  const [eventForm, setEventForm] = useState({
    name: "",
    dateStart: "",
    dateEnd: "",
    location: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(eventForm);
    navigate("/");
  };

  return (
    <div className="container main-content">
      <h2 className="text-center margin-top-large">
        Create New Event
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
              onClick={() => navigate(-1)}
              className="button secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button primary"
            >
              <PlusCircle size={20} />
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
