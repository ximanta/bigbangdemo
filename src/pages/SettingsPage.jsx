import React from "react";
import { Settings } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="container main-content text-center margin-top-large">
      <Settings
        size={64}
        color="var(--primary-color)"
        style={{ marginBottom: "20px" }}
      />
      <h2>
        Settings
      </h2>
      <p>
        This is a placeholder for future settings functionality.
      </p>
      <div className="card margin-top-large">
        <p>
          You can imagine options here like:
        </p>
        <ul>
          <li>
            User Profile Management
          </li>
          <li>
            Notification Preferences
          </li>
          <li>
            Theme Selection
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SettingsPage;
