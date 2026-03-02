import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <div
        className={`accordion-header ${isOpen ? 'open' : ''}`}
        onClick={toggleAccordion}
      >
        {title}
        <ChevronDown className="icon" />
      </div>
      <div
        className={`accordion-content ${isOpen ? 'open' : ''}`}
        style={{ maxHeight: isOpen ? '500px' : '0' }}
      >
        {content}
      </div>
    </div>
  );
};

const Accordion = ({ items }) => {
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
        />
      ))}
    </div>
  );
};

export default Accordion;
