import React from 'react';

const TextArea = ({ label, id, value, onChange, placeholder, required = false, rows = 5 }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        className="textarea-field"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
      ></textarea>
    </div>
  );
};

export default TextArea;
