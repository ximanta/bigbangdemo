import React from 'react';

function TextAreaField({
  label,
  value,
  onChange,
  placeholder = '',
  id,
  name,
  required = false,
  rows = 3,
  className = '',
}) {
  const textareaId = id || name;

  return (
    <div className="form-group">
      {label && <label htmlFor={textareaId} className="label">{label}{required && <span style={{color: 'var(--error-color)', marginLeft: '4px'}}>*</span>}</label>}
      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`textarea-field ${className}`.trim()}
        required={required}
        rows={rows}
      ></textarea>
    </div>
  );
}

export default TextAreaField;