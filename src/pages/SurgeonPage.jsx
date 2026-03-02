import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { surgeon } from '../data/mockData';
import CallToAction from '../components/CallToAction';

const SurgeonPage = () => {
  return (
    <div className="surgeon-page">
      <Breadcrumbs />
      <section className="section-padding">
        <div className="container">
          <div className="section-heading">
            <h2>Meet Dr. Evelyn Thorne</h2>
            <p>Our lead plastic surgeon, dedicated to artistry and patient well-being.</p>
          </div>

          <div className="surgeon-page-intro">
            <img
              src={surgeon.imageUrl}
              alt={surgeon.name}
              className="surgeon-page-intro-image"
            />
            <div className="surgeon-page-intro-text">
              <h1>{surgeon.name}</h1>
              <h2>{surgeon.title}</h2>
              <p>{surgeon.bioFull}</p>
            </div>
          </div>

          <div className="surgeon-page-qualifications">
            <h3>Qualifications & Affiliations</h3>
            <ul>
              {surgeon.qualifications.map((qual, index) => (
                <li key={index}>
                  {qual}
                </li>
              ))}
            </ul>
          </div>

          <div className="surgeon-page-specialties">
            <h3>Areas of Expertise</h3>
            <ul>
              {surgeon.specialties.map((spec, index) => (
                <li key={index}>
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <div className="surgeon-page-philosophy">
            <h3>Our Surgeon's Philosophy</h3>
            <p>
              <em>"{surgeon.philosophy}"</em>
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <CallToAction
              text="Schedule a Consultation"
              to="/contact"
              type="primary"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SurgeonPage;
