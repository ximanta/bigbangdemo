import React from 'react';

function ChartComponent({ vitalName, period, data }) {
  // In a real application, this would use a charting library
  // For this demo, we'll just show a placeholder div.
  return (
    <div className="chart-container">
      <p>Chart data for {vitalName} over {period}</p>
      {data && data.length === 0 && (
        <p style={{ marginTop: '8px', fontSize: '0.9em' }}>No data available to display chart.</p>
      )}
    </div>
  );
}

export default ChartComponent;