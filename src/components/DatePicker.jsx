import React from 'react';
import Input from './Input';

const DatePicker = ({ label, id, value, onChange, ...props }) => {
  return (
    <Input
      label={label}
      id={id}
      type="date"
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default DatePicker;
