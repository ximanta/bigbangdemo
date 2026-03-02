import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactForm = ({ onFormSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
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
    if (!formData.message) {
      newErrors.message = 'Message is required';
    }
    if (!formData.consent) {
      newErrors.consent = 'You must consent to privacy policy';
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
        console.log('Contact Form Submitted:', formData);
        setIsSubmitting(false);
        onFormSubmit({ message: 'Your message has been sent!', type: 'success' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          consent: false,
        });
        // Optionally navigate or show a success message
        // navigate('/thank-you');
      }, 1500);
    } else {
      onFormSubmit({ message: 'Please correct the errors in the form.', type: 'error' });
    }
  };

  return (
    <form
      className="contact-form"
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
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
        ></textarea>
        {errors.message && <p className="form-error">{errors.message}</p>}
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <label htmlFor="consent">
          I agree to the privacy policy and terms of service.
        </label>
        {errors.consent && <p className="form-error">{errors.consent}</p>}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
