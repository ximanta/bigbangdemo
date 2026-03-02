import React from 'react';
import { Link } from 'react-router-dom';
import CallToAction from './CallToAction';

const SurgeonProfileCard = ({ surgeon }) => {
  return (
    <div className="surgeon-profile-card">
      <img
        src={surgeon.imageUrl}
        alt={surgeon.name}
        className="surgeon-profile-card-image"
      />
      <h3>{surgeon.name}</h3>
      <p>{surgeon.title}</p>
      <p>{surgeon.bioShort}</p>
      <CallToAction
        text="Read Full Bio"
        to="/surgeon"
        type="primary"
      />
    </div>
  );
};

export default SurgeonProfileCard;
