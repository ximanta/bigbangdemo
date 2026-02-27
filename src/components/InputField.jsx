import React from 'react';

function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  unit = '',
  id,
  name,
  required = false,
  min,
  max,
  step,
  className = '',
}) {
  const inputId = id || name;

  return (
    <div className="form-group">
      {label && <label htmlFor={inputId} className="label">{label}{required && <span style={{color: 'var(--error-color)', marginLeft: '4px'}}>*</span>}</label>}
      <div className={unit ? "input-with-unit" : ""}>
        <input
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${className}`.trim()}
          required={required}
          min={min}
          max={max}
          step={step}
        />
        {unit && <span className="input-unit-label">{unit}</span>}
      </div>
    </div>
  );
}

export default InputField;