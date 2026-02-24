import React,
{
  useEffect,
  useRef
} from "react";
import {
  Link,
  useLocation
} from "react-router-dom";
import {
  CalendarDays,
  PlusCircle,
  Settings,
  Home
} from "lucide-react";

const NavigationDrawer = (
  {
    isOpen,
    onClose
  }
) => {
  const drawerRef = useRef();
  const location = useLocation();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },
    [isOpen,
      onClose]
  );

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      <div
        className={`navigation-drawer-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>
      <nav
        ref={drawerRef}
        className={`navigation-drawer ${isOpen ? "open" : ""}`}
      >
        <div className="drawer-header">
          Organizer Menu
        </div>
        <ul className="drawer-nav-list">
          <li className="drawer-nav-item">
            <Link
              to="/"
              onClick={handleLinkClick}
              className={location.pathname === "/" ? "active" : ""}
            >
              <Home size={20} />
              My Events
            </Link>
          </li>
          <li className="drawer-nav-item">
            <Link
              to="/create-event"
              onClick={handleLinkClick}
              className={location.pathname === "/create-event" ? "active" : ""}
            >
              <PlusCircle size={20} />
              Create Event
            </Link>
          </li>
          <li className="drawer-nav-item">
            <Link
              to="/settings"
              onClick={handleLinkClick}
              className={location.pathname === "/settings" ? "active" : ""}
            >
              <Settings size={20} />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavigationDrawer;
