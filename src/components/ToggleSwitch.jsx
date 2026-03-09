import React from 'react';

const ToggleSwitch = ({
  label,
  id,
  checked,
  onChange,
  className = '',
  ...props
}) => {
  return (
    <div className={`form-group ${className}`.trim()}>
      <label htmlFor={id} className="flex-row items-center gap-2">
        {label}
        <label className="toggle-switch">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            {...props}
          />
          <span className="toggle-slider"></span>
        </label>
      </label>
    </div>
  );
};

export default ToggleSwitch;
