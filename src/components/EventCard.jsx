import React from "react";
import {
  CalendarDays,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const formattedDate = `${event.dateStart} ${event.dateEnd !== event.dateStart ? `- ${event.dateEnd}` : ""}`;

  return (
    <Link
      to={`/events/${event.id}`}
      className="card event-card"
    >
      <div className="event-card-header">
        <h3>
          {event.name}
        </h3>
      </div>
      <div className="event-card-body">
        <p>
          <span>
            <CalendarDays size={16} />
          </span>
          <strong>
            Date:
          </strong>
          {formattedDate}
        </p>
        <p>
          <span>
            <MapPin size={16} />
          </span>
          <strong>
            Location:
          </strong>
          {event.location}
        </p>
        <p>
          {event.description.substring(0, 100)}
          ...
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
