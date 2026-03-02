import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactForm from '../components/ContactForm';
import AppointmentForm from '../components/AppointmentForm';
import NotificationToast from '../components/NotificationToast';
import { clinicInfo } from '../data/mockData';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (newNotification) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { ...newNotification, id }]);
  };

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="contact-page">
      <Breadcrumbs />
      <section className="section-padding">
        <div className="container">
          <div className="section-heading">
            <h2>Get in Touch with AestheticLink</h2>
            <p>
              We're here to answer your questions and help you start your aesthetic journey.
            </p>
          </div>

          <div className="contact-info-grid">
            <div className="contact-info-item card">
              <div className="icon-wrapper">
                <Phone />
              </div>
              <h4>Call Us</h4>
              <p>{clinicInfo.phone}</p>
              <p>Available Mon-Sat</p>
            </div>
            <div className="contact-info-item card">
              <div className="icon-wrapper">
                <Mail />
              </div>
              <h4>Email Us</h4>
              <p>{clinicInfo.email}</p>
              <p>We respond within 24 hours</p>
            </div>
            <div className="contact-info-item card">
              <div className="icon-wrapper">
                <MapPin />
              </div>
              <h4>Visit Us</h4>
              <p>{clinicInfo.address}</p>
              <p>By appointment only</p>
            </div>
            <div className="contact-info-item card">
              <div className="icon-wrapper">
                <Clock />
              </div>
              <h4>Clinic Hours</h4>
              {clinicInfo.hours.map((hour, index) => (
                <p key={index}>{hour}</p>
              ))}
            </div>
          </div>

          <div className="contact-page-form-section">
            <h3>Send Us a Message</h3>
            <ContactForm onFormSubmit={addNotification} />
          </div>

          <div className="contact-page-form-section" style={{ marginTop: '60px' }}>
            <h3>Request an Appointment</h3>
            <AppointmentForm onFormSubmit={addNotification} />
          </div>
        </div>
      </section>

      <div className="notification-toast-container">
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            onDismiss={dismissNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactPage;
