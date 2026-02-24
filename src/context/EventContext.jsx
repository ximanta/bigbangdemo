import React,
{
  createContext,
  useState,
  useContext
} from "react";
import { mockEvents } from "../data/mockData";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(mockEvents);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("success");

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [
      {
        ...newEvent,
        id: `e${prevEvents.length + 1}`,
        agenda: [],
        delegates: []
      },
      ...prevEvents
    ]);
    showToast("Event created successfully!", "success");
  };

  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    showToast("Event updated successfully!", "success");
  };

  const deleteEvent = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
    showToast("Event deleted successfully!", "success");
  };

  const addDelegate = (eventId, delegate) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
            ...event,
            delegates: [
              {
                ...delegate,
                id: `d${event.delegates.length + 1}`,
                registrationDate: new Date().toISOString().split("T")[0]
              },
              ...event.delegates
            ]
          }
          : event
      )
    );
    showToast("Registered successfully!", "success");
  };

  const getEventById = (id) => {
    return events.find((event) => event.id === id);
  };

  const addSessionToEvent = (eventId, newSession) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
            ...event,
            agenda: [
              {
                ...newSession,
                id: `s${event.agenda.length + 1}`
              },
              ...event.agenda
            ]
          }
          : event
      )
    );
    showToast("Session added successfully!", "success");
  };

  const updateSessionInEvent = (eventId, updatedSession) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
            ...event,
            agenda: event.agenda.map((session) =>
              session.id === updatedSession.id ? updatedSession : session
            )
          }
          : event
      )
    );
    showToast("Session updated successfully!", "success");
  };

  const deleteSessionFromEvent = (eventId, sessionId) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
            ...event,
            agenda: event.agenda.filter((session) => session.id !== sessionId)
          }
          : event
      )
    );
    showToast("Session deleted successfully!", "success");
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        addDelegate,
        getEventById,
        addSessionToEvent,
        updateSessionInEvent,
        deleteSessionFromEvent,
        toastMessage,
        toastType,
        showToast
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
