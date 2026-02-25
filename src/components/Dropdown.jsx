import React from 'react';

const Dropdown = ({ label, id, value, onChange, options, required = false, defaultOptionText = "Select an option" }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        className="select-field"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">{defaultOptionText}</option>
        {options.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
