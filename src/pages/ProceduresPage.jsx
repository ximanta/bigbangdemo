import React from 'react';
import ProcedureCard from '../components/ProcedureCard';
import Breadcrumbs from '../components/Breadcrumbs';
import CallToAction from '../components/CallToAction';
import { procedures } from '../data/mockData';

const ProceduresPage = () => {
  return (
    <div className="procedures-page">
      <Breadcrumbs />
      <section className="section-padding">
        <div className="container">
          <div className="section-heading">
            <h2>Our Comprehensive Procedures</h2>
            <p>
              Explore our extensive range of plastic surgery procedures designed to
              meet your unique aesthetic desires.
            </p>
          </div>
          <div className="grid-3-cols">
            {procedures.map((procedure) => (
              <ProcedureCard
                key={procedure.id}
                procedure={procedure}
              />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <CallToAction
              text="Book a Consultation"
              to="/contact"
              type="primary"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProceduresPage;
