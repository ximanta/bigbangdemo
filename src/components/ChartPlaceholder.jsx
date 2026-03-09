import React from 'react';
import { BarChart, LineChart, PieChart } from 'lucide-react';

function ChartPlaceholder({ type = 'bar', title = 'Chart Title' }) {
  let IconComponent;
  switch (type) {
    case 'line':
      IconComponent = LineChart;
      break;
    case 'pie':
      IconComponent = PieChart;
      break;
    case 'bar':
    default:
      IconComponent = BarChart;
      break;
  }

  return (
    <div className="chart-placeholder">
      <IconComponent size={48} style={{ marginRight: '10px', color: 'var(--border-color)' }} />
      <span>{title} (Placeholder)</span>
    </div>
  );
}

export default ChartPlaceholder;
