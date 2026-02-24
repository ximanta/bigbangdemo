import React,
{
  useState,
  useEffect
} from "react";
import {
  useParams,
  useNavigate,
  Link
} from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  ChevronDown,
  UserPlus,
  Edit,
  Trash2,
  PlusCircle
} from "lucide-react";
import { useEvents } from "../context/EventContext";
import Modal from "../components/Modal";
import LoadingSpinner from "../components/LoadingSpinner";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { getEventById,
    deleteEvent,
    addSessionToEvent,
    updateSessionInEvent,
    deleteSessionFromEvent } = useEvents();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [expandedSession, setExpandedSession] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [sessionForm, setSessionForm] = useState({
    title: "",
    speaker: "",
    speakerBio: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    description: ""
  });

  useEffect(() => {
    const fetchEvent = () => {
      setLoading(true);
      const foundEvent = getEventById(eventId);
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        navigate("/404");
      }
      setLoading(false);
    };
    fetchEvent();
  },
    [eventId,
      getEventById,
      navigate]
  );

  // Re-fetch event data after any updates to context
  useEffect(() => {
    const updatedEvent = getEventById(eventId);
    if (updatedEvent) {
      setEvent(updatedEvent);
    }
  },
    [getEventById,
      eventId]
  );

  const handleDeleteEvent = () => {
    deleteEvent(eventId);
    setShowDeleteModal(false);
    navigate("/");
  };

  const toggleSession = (sessionId) => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId);
  };

  const handleAddSessionClick = () => {
    setCurrentSession(null);
    setSessionForm({
      title: "",
      speaker: "",
      speakerBio: "",
      date: event.dateStart,
      timeStart: "09:00",
      timeEnd: "10:00",
      description: ""
    });
    setShowSessionModal(true);
  };

  const handleEditSessionClick = (session) => {
    setCurrentSession(session);
    setSessionForm({
      title: session.title,
      speaker: session.speaker,
      speakerBio: session.speakerBio,
      date: session.date,
      timeStart: session.timeStart,
      timeEnd: session.timeEnd,
      description: session.description
    });
    setShowSessionModal(true);
  };

  const handleDeleteSessionClick = (sessionId) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      deleteSessionFromEvent(eventId, sessionId);
    }
  };

  const handleSessionFormChange = (e) => {
    const { name, value } = e.target;
    setSessionForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSessionFormSubmit = (e) => {
    e.preventDefault();
    if (currentSession) {
      updateSessionInEvent(eventId,
        {
          ...sessionForm,
          id: currentSession.id
        }
      );
    } else {
      addSessionToEvent(eventId,
        sessionForm
      );
    }
    setShowSessionModal(false);
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!event) {
    return null;
  }

  const formattedDate = `${event.dateStart} ${event.dateEnd !== event.dateStart ? `- ${event.dateEnd}` : ""}`;

  return (
    <div className="main-content">
      <div className="detail-page-header">
        <div className="container">
          <h1>
            {event.name}
          </h1>
          <p className="date-location">
            <span>
              <CalendarDays size={18} />
              {formattedDate}
            </span>
            <span>
              <MapPin size={18} />
              {event.location}
            </span>
          </p>
          <div className="form-actions margin-top-large">
            <Link
              to={`/events/${event.id}/register`}
              className="button primary"
            >
              <UserPlus size={20} />
              Register Now
            </Link>
            <Link
              to={`/events/${event.id}/edit`}
              className="button secondary"
            >
              <Edit size={20} />
              Edit Event
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="button danger"
            >
              <Trash2 size={20} />
              Delete Event
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="tabs-container">
          <button
            className={`tab-button ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`tab-button ${activeTab === "agenda" ? "active" : ""}`}
            onClick={() => setActiveTab("agenda")}
          >
            Agenda
          </button>
          <button
            className={`tab-button ${activeTab === "delegates" ? "active" : ""}`}
            onClick={() => setActiveTab("delegates")}
          >
            Delegates
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "details" && (
            <div className="detail-content-section">
              <h2>
                Event Overview
              </h2>
              <p>
                {event.description}
              </p>
            </div>
          )}

          {activeTab === "agenda" && (
            <div className="detail-content-section">
              <div className="form-actions">
                <h2>
                  Agenda
                </h2>
                <button
                  onClick={handleAddSessionClick}
                  className="button primary"
                >
                  <PlusCircle size={20} />
                  Add Session
                </button>
              </div>
              {
                event.agenda && event.agenda.length > 0 ? (
                  <ul className="agenda-list">
                    {event.agenda.map((session) => (
                      <li
                        key={session.id}
                        className="agenda-item"
                      >
                        <div
                          className={`agenda-item-header ${expandedSession === session.id ? "expanded" : ""}`}
                          onClick={() => toggleSession(session.id)}
                        >
                          <h3>
                            {session.title}
                          </h3>
                          <span>
                            {`${session.timeStart} - ${session.timeEnd}`}
                          </span>
                          <span className="toggle-icon">
                            <ChevronDown size={20} />
                          </span>
                        </div>
                        <div
                          className={`agenda-item-content ${expandedSession === session.id ? "expanded" : ""}`}
                        >
                          <p>
                            <strong>
                              Speaker:
                            </strong>
                            {session.speaker}
                          </p>
                          <p>
                            <strong>
                              Date:
                            </strong>
                            {session.date}
                          </p>
                          <p>
                            <strong>
                              Description:
                            </strong>
                            {session.description}
                          </p>
                          {
                            session.speakerBio && (
                              <p>
                                <strong>
                                  Speaker Bio:
                                </strong>
                                {session.speakerBio}
                              </p>
                            )
                          }
                          <div className="agenda-item-actions">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditSessionClick(session);
                              }}
                              className="button secondary"
                            >
                              <Edit size={16} />
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSessionClick(session.id);
                              }}
                              className="button danger"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty-state">
                    <p>
                      No sessions added to the agenda yet.
                    </p>
                  </div>
                )
              }
            </div>
          )}

          {activeTab === "delegates" && (
            <div className="detail-content-section">
              <h2>
                Registered Delegates
              </h2>
              {
                event.delegates && event.delegates.length > 0 ? (
                  <table className="delegate-table">
                    <thead>
                      <tr>
                        <th>
                          Name
                        </th>
                        <th>
                          Email
                        </th>
                        <th>
                          Registered On
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.delegates.map((delegate) => (
                        <tr key={delegate.id}>
                          <td>
                            {delegate.name}
                          </td>
                          <td>
                            {delegate.email}
                          </td>
                          <td>
                            {delegate.registrationDate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="empty-state">
                    <p>
                      No delegates registered for this event yet.
                    </p>
                    <Link
                      to={`/events/${event.id}/register`}
                      className="button primary margin-top-large"
                    >
                      <UserPlus size={20} />
                      Register as a Delegate
                    </Link>
                  </div>
                )
              }
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
        footerContent={(
          <>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="button secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteEvent}
              className="button danger"
            >
              Delete Event
            </button>
          </>
        )}
      >
        <p>
          Are you sure you want to delete the event "
          <strong>
            {event.name}
          </strong>
          "?
        </p>
        <p>
          This action cannot be undone.
        </p>
      </Modal>

      <Modal
        isOpen={showSessionModal}
        onClose={() => setShowSessionModal(false)}
        title={currentSession ? "Edit Session" : "Add New Session"}
        footerContent={(
          <>
            <button
              onClick={() => setShowSessionModal(false)}
              className="button secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleSessionFormSubmit}
              className="button primary"
            >
              {currentSession ? "Save Changes" : "Add Session"}
            </button>
          </>
        )}
      >
        <form onSubmit={handleSessionFormSubmit}>
          <div className="form-group">
            <label htmlFor="session-title">
              Title
            </label>
            <input
              type="text"
              id="session-title"
              name="title"
              value={sessionForm.title}
              onChange={handleSessionFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="session-speaker">
              Speaker
            </label>
            <input
              type="text"
              id="session-speaker"
              name="speaker"
              value={sessionForm.speaker}
              onChange={handleSessionFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="session-speaker-bio">
              Speaker Bio
            </label>
            <textarea
              id="session-speaker-bio"
              name="speakerBio"
              value={sessionForm.speakerBio}
              onChange={handleSessionFormChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="session-date">
              Date
            </label>
            <input
              type="date"
              id="session-date"
              name="date"
              value={sessionForm.date}
              onChange={handleSessionFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="session-time-start">
              Start Time
            </label>
            <input
              type="time"
              id="session-time-start"
              name="timeStart"
              value={sessionForm.timeStart}
              onChange={handleSessionFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="session-time-end">
              End Time
            </label>
            <input
              type="time"
              id="session-time-end"
              name="timeEnd"
              value={sessionForm.timeEnd}
              onChange={handleSessionFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="session-description">
              Description
            </label>
            <textarea
              id="session-description"
              name="description"
              value={sessionForm.description}
              onChange={handleSessionFormChange}
              required
            ></textarea>
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={() => setShowSessionModal(false)}
              className="button secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button primary"
            >
              {currentSession ? "Save Changes" : "Add Session"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EventDetailPage;
