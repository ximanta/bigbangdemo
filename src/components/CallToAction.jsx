import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = ({ text, to, type = 'primary' }) => {
  const buttonClass = `btn btn-${type}`;

  return (
    <Link
      to={to}
      className={buttonClass}
    >
      {text}
    </Link>
  );
};

export default CallToAction;
