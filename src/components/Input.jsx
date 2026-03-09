import React from 'react';

function Input({ label, type = 'text', value, onChange, placeholder, id, name, required = false }) {
  return (
    <div className="input-field-group">
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
        required={required}
      />
    </div>
  );
}

export default Input;
