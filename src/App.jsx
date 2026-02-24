import React,
{
  useState
} from "react";
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { useEvents } from "./context/EventContext";

import Header from "./components/Header";
import NavigationDrawer from "./components/NavigationDrawer";
import Toast from "./components/Toast";

import HomePage from "./pages/HomePage";
import EventDetailPage from "./pages/EventDetailPage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toastMessage,
    toastType,
    getEventById } = useEvents();
  const location = useLocation();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const getEventNameForHeader = () => {
    const pathParts = location.pathname.split("/");
    if (pathParts[1] === "events" && pathParts[2]) {
      const event = getEventById(pathParts[2]);
      return event ? event.name : "Event Details";
    }
    if (location.pathname === "/create-event") return "Create Event";
    if (location.pathname.includes("/edit")) return "Edit Event";
    if (location.pathname.includes("/register")) return "Register";
    if (location.pathname === "/settings") return "Settings";
    return "My Events";
  };

  return (
    <div className="app-container">
      <Header
        onMenuToggle={toggleDrawer}
        eventName={getEventNameForHeader()}
      />
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/events/:eventId"
          element={<EventDetailPage />}
        />
        <Route
          path="/create-event"
          element={<CreateEventPage />}
        />
        <Route
          path="/events/:eventId/edit"
          element={<EditEventPage />}
        />
        <Route
          path="/events/:eventId/register"
          element={<RegisterPage />}
        />
        <Route
          path="/settings"
          element={<SettingsPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
      <Toast
        message={toastMessage}
        type={toastType}
      />
    </div>
  );
}

export default App;
