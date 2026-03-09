import React from 'react';
import Input from './Input';

const TimePicker = ({ label, id, value, onChange, ...props }) => {
  return (
    <Input
      label={label}
      id={id}
      type="time"
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default TimePicker;
