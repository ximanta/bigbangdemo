import React from 'react';
import CallToAction from './CallToAction';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1>Your Journey to Confidence Starts Here</h1>
        <p>
          Discover personalized aesthetic solutions with our board-certified surgeons.
          Experience excellence in plastic surgery and natural-looking results.
        </p>
        <CallToAction
          text="Explore Procedures"
          to="/procedures"
          type="primary"
        />
      </div>
    </section>
  );
};

export default HeroSection;
