import React from 'react';

function SelectField({
  label,
  value,
  onChange,
  options = [],
  id,
  name,
  required = false,
  className = '',
}) {
  const selectId = id || name;

  return (
    <div className="form-group">
      {label && <label htmlFor={selectId} className="label">{label}{required && <span style={{color: 'var(--error-color)', marginLeft: '4px'}}>*</span>}</label>}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        className={`select-field ${className}`.trim()}
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

export default SelectField;