import React from 'react';
import { formatDate, getUserById } from '../utils/helpers';
import { users } from '../utils/mockData';

const ActivityLog = ({ activities = [] }) => {
  if (!activities || activities.length === 0) {
    return <p>No activity recorded for this ticket.</p>;
  }

  return (
    <div className="activity-log">
      {activities.map((activity, index) => {
        const author = getUserById(activity.authorId, users);
        const authorName = author ? author.name : 'Unknown User';

        return (
          <div key={index} className="activity-item">
            <div className="activity-item-header">
              <strong>{authorName}</strong>
              <span>{formatDate(activity.createdAt)}</span>
            </div>
            <div className="activity-item-content">
              {activity.content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityLog;
