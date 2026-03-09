import React from 'react';

const Chart = ({ title, type, data }) => {
  // In a real application, this would integrate with a charting library.
  // For this demo, we'll just display a placeholder.
  return (
    <div className="card">
      <h3>{title}</h3>
      <div
        style={{
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--background-color)',
          borderRadius: '4px',
          color: 'var(--text-light)',
          fontSize: '0.9rem',
        }}
      >
        {`[Placeholder for ${type} chart: ${title}]`}
      </div>
      {/* You could render some simplified data here if needed */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default Chart;
