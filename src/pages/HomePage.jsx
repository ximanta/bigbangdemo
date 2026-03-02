import React from 'react';
import HeroSection from '../components/HeroSection';
import ProcedureCard from '../components/ProcedureCard';
import TestimonialCard from '../components/TestimonialCard';
import SurgeonProfileCard from '../components/SurgeonProfileCard';
import BlogPostCard from '../components/BlogPostCard';
import CallToAction from '../components/CallToAction';
import { procedures, testimonials, blogPosts, surgeon } from '../data/mockData';

const HomePage = () => {
  const featuredProcedures = procedures.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 3);
  const featuredBlogPosts = blogPosts.slice(0, 3);

  return (
    <div className="home-page">
      <HeroSection />

      <section className="section-padding">
        <div className="container">
          <div className="section-heading">
            <h2>Our Signature Procedures</h2>
            <p>Discover the range of aesthetic enhancements we offer to help you achieve your desired look.</p>
          </div>
          <div className="grid-3-cols">
            {featuredProcedures.map((procedure) => (
              <ProcedureCard
                key={procedure.id}
                procedure={procedure}
              />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <CallToAction
              text="View All Procedures"
              to="/procedures"
              type="primary"
            />
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--primary-color)', color: 'var(--light-text-color)' }}>
        <div className="container">
          <div className="section-heading">
            <h2 style={{ color: 'var(--light-text-color)' }}>Meet Our Expert Surgeon</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Dr. Evelyn Thorne is committed to excellence and personalized patient care.
            </p>
          </div>
          <SurgeonProfileCard surgeon={surgeon} />
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <CallToAction
              text="Learn More About Dr. Thorne"
              to="/surgeon"
              type="accent"
            />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="section-heading">
            <h2>What Our Patients Say</h2>
            <p>Hear directly from those who have experienced our transformative care.</p>
          </div>
          <div className="grid-3-cols">
            {featuredTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <CallToAction
              text="Read All Testimonials"
              to="/testimonials"
              type="secondary"
            />
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--background-light)' }}>
        <div className="container">
          <div className="section-heading">
            <h2>Latest Insights from Our Blog</h2>
            <p>Stay informed with our articles on aesthetic health and wellness.</p>
          </div>
          <div className="grid-3-cols">
            {featuredBlogPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <CallToAction
              text="Visit Our Blog"
              to="/blog"
              type="primary"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
