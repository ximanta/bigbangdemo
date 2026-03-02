import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ImageGallery from '../components/ImageGallery';
import CallToAction from '../components/CallToAction';
import { procedures } from '../data/mockData';

const GalleryPage = () => {
  // Aggregate all before/after images from all procedures
  const allGalleryImages = procedures.reduce((acc, procedure) => {
    return [...acc, ...procedure.beforeAfterImages];
  }, []);

  return (
    <div className="gallery-page">
      <Breadcrumbs />
      <section className="section-padding">
        <div className="container">
          <div className="section-heading">
            <h2>Our Before & After Gallery</h2>
            <p>
              Witness the transformative results achieved by our skilled surgeons.
              Each image reflects our commitment to natural beauty and patient satisfaction.
            </p>
          </div>
          <ImageGallery
            images={allGalleryImages}
            title=""
          />
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <CallToAction
              text="Request a Personal Consultation"
              to="/contact"
              type="primary"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
