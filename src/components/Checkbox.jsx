import React from 'react';

function Checkbox({ label, checked, onChange, id, name }) {
  return (
    <label htmlFor={id} className="checkbox-container">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

export default Checkbox;
