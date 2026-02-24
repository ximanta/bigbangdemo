import React,
{
  useState,
  useEffect
} from "react";
import { useEvents } from "../context/EventContext";
import EventCard from "../components/EventCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const HomePage = () => {
  const { events } = useEvents();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    },
      500
    );
    return () => clearTimeout(timer);
  },
    []
  );

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="container main-content">
      <h2 className="text-center margin-top-large">
        My Events
      </h2>
      {
        events.length === 0 ? (
          <div className="empty-state">
            <p>
              No events created yet.
            </p>
            <Link
              to="/create-event"
              className="button primary margin-top-large"
            >
              <PlusCircle size={20} />
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="card-list margin-top-large">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        )
      }
    </div>
  );
};

export default HomePage;
