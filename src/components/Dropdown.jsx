import React from 'react';

function Dropdown({ label, options, value, onChange, id, name, required = false }) {
  return (
    <div className="input-field-group">
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="dropdown-select"
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
