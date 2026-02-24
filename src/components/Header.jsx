import React from "react";
import {
  Menu,
  ArrowLeft
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

const Header = ({ onMenuToggle, eventName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailPage = location.pathname.includes("/events/") &&
    location.pathname.split("/").length > 2;

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className="header">
      {
        isDetailPage ? (
          <button
            className="icon-button"
            onClick={handleBackClick}
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
        ) : (
          <button
            className="icon-button"
            onClick={onMenuToggle}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        )
      }
      <h1 className="title">
        <Link to="/">
          {eventName || "Event Manager"}
        </Link>
      </h1>
      <div style={{ width: "40px" }}></div>
    </header>
  );
};

export default Header;
