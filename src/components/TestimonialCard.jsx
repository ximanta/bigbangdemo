import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          fill={i < rating ? 'currentColor' : 'none'}
          size={20}
          strokeWidth={1.5}
        />
      );
    }
    return stars;
  };

  return (
    <div className="testimonial-card">
      <div className="quote-icon">
        <Quote size={48} />
      </div>
      <p>"{testimonial.review}"</p>
      <div className="stars">
        {renderStars(testimonial.rating)}
      </div>
      <p className="patient-name">- {testimonial.patientName}</p>
    </div>
  );
};

export default TestimonialCard;
