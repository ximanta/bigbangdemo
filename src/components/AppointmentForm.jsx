import React, { useState } from 'react';
import { procedures } from '../data/mockData';

const AppointmentForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Appointment Form Submitted:', formData);
        setIsSubmitting(false);
        onFormSubmit({ message: 'Appointment request sent!', type: 'success' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          message: '',
        });
      }, 1500);
    } else {
      onFormSubmit({ message: 'Please correct the errors in the form.', type: 'error' });
    }
  };

  return (
    <form
      className="appointment-form"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.phone && <p className="form-error">{errors.phone}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="service">Preferred Service</label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          disabled={isSubmitting}
        >
          <option value="">Select a service</option>
          {procedures.map((proc) => (
            <option
              key={proc.id}
              value={proc.name}
            >
              {proc.name}
            </option>
          ))}
          <option value="General Consultation">General Consultation</option>
        </select>
        {errors.service && <p className="form-error">{errors.service}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="date">Preferred Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]} // Min date is today
          disabled={isSubmitting}
        />
        {errors.date && <p className="form-error">{errors.date}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="time">Preferred Time</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.time && <p className="form-error">{errors.time}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="message">Additional Message (Optional)</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Requesting...' : 'Request Appointment'}
      </button>
    </form>
  );
};

export default AppointmentForm;
