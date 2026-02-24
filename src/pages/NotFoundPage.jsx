import React from "react";
import { Link } from "react-router-dom";
import { Frown } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="container main-content text-center margin-top-large">
      <Frown
        size={64}
        color="var(--text-light)"
        style={{ marginBottom: "20px" }}
      />
      <h2>
        404 - Page Not Found
      </h2>
      <p>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="button primary margin-top-large"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
