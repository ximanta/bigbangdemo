import React from 'react';

function ProgressBar({ progress, label }) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div style={{ marginBottom: '15px' }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span style={{ fontSize: '0.9em', color: 'var(--text-light-color)' }}>{label}</span>
          <span style={{ fontSize: '0.9em', color: 'var(--text-color)', fontWeight: '500' }}>{clampedProgress}%</span>
        </div>
      )}
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${clampedProgress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
