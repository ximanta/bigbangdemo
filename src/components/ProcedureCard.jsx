import React from 'react';
import { Link } from 'react-router-dom';
import CallToAction from './CallToAction';

const ProcedureCard = ({ procedure }) => {
  return (
    <div className="procedure-card">
      <img
        src={procedure.imageUrl}
        alt={procedure.name}
        className="procedure-card-image"
      />
      <div className="procedure-card-content">
        <h3>{procedure.name}</h3>
        <p>{procedure.shortDescription}</p>
        <CallToAction
          text="Learn More"
          to={`/procedures/${procedure.id}`}
          type="secondary"
        />
      </div>
    </div>
  );
};

export default ProcedureCard;
