import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { procedures } from '../data/mockData';
import Breadcrumbs from '../components/Breadcrumbs';
import Accordion from '../components/Accordion';
import ImageGallery from '../components/ImageGallery';
import VideoPlayer from '../components/VideoPlayer';
import CallToAction from '../components/CallToAction';

const ProcedureDetailPage = () => {
  const { id } = useParams();
  const procedure = procedures.find((p) => p.id === id);

  if (!procedure) {
    return <Navigate to="/404" replace />;
  }

  const accordionItems = [
    {
      title: 'Full Procedure Description',
      content: <p>{procedure.fullDescription}</p>,
    },
    {
      title: 'Benefits',
      content: (
        <ul>
          {procedure.benefits.map((benefit, index) => (
            <li key={index}>
              {benefit}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Recovery Time',
      content: <p>{procedure.recoveryTime}</p>,
    },
    {
      title: 'Estimated Pricing',
      content: <p>{procedure.estimatedPricing}</p>,
    },
  ];

  return (
    <div className="procedure-detail-page">
      <Breadcrumbs />
      <div className="procedure-detail-header">
        <div className="container">
          <h1>{procedure.name}</h1>
          <p>{procedure.shortDescription}</p>
        </div>
      </div>

      <section className="section-padding" style={{ paddingTop: '0' }}>
        <div className="container procedure-detail-content">
          <div>
            <Accordion items={accordionItems} />

            <h2 style={{ marginTop: '40px' }}>Before & After Gallery</h2>
            <ImageGallery
              images={procedure.beforeAfterImages}
              title=""
            />

            {procedure.videoUrl && (
              <div style={{ marginTop: '40px' }}>
                <h2>Watch a Procedure Overview</h2>
                <VideoPlayer
                  videoUrl={procedure.videoUrl}
                  title={`${procedure.name} Overview`}
                />
              </div>
            )}
          </div>

          <aside className="procedure-detail-sidebar">
            <div className="price-box">
              <h4>Starting From</h4>
              <p>{procedure.estimatedPricing}</p>
              <CallToAction
                text="Schedule a Consultation"
                to="/contact"
                type="accent"
              />
            </div>
            <div>
              <h3>Why Choose AestheticLink?</h3>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: 'var(--secondary-color)' }}>Expert Surgeons:</strong> Board-certified and highly experienced.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: 'var(--secondary-color)' }}>Personalized Care:</strong> Tailored treatment plans for every patient.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: 'var(--secondary-color)' }}>Natural Results:</strong> Focused on enhancing your natural beauty.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong style={{ color: 'var(--secondary-color)' }}>State-of-the-Art Facility:</strong> Modern and safe environment.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default ProcedureDetailPage;
