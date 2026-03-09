import React from 'react';

function RadioButton({ label, value, checked, onChange, name, id }) {
  return (
    <label htmlFor={id} className="radio-container">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

export default RadioButton;
