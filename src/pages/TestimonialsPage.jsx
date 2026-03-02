import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import TestimonialCard from '../components/TestimonialCard';
import CallToAction from '../components/CallToAction';
import { testimonials } from '../data/mockData';

const TestimonialsPage = () => {
  return (
    <div className="testimonials-page">
      <Breadcrumbs />
      <section className="section-padding">
        <div className="container">
          <div className="section-heading">
            <h2>Patient Success Stories</h2>
            <p>
              Read heartfelt reviews from our satisfied patients and discover the positive
              impact of our care.
            </p>
          </div>
          <div className="grid-3-cols">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <CallToAction
              text="Share Your Story"
              to="/contact"
              type="secondary"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
