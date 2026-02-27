import React, { useState, useContext, useEffect } from 'react';
import { VitalsContext } from '../context/VitalsContext';
import { formatDate, formatTime, formatVitalValue } from '../utils/formatters';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import ChartComponent from '../components/ChartComponent';
import EmptyState from '../components/EmptyState';
import { LineChart, Calendar, History } from 'lucide-react';

function Trends() {
  const { vitals, unitPreferences, getVitalsByType, getVitalsByDateRange } = useContext(VitalsContext);

  const vitalTypeOptions = [
    { label: 'Blood Pressure', value: 'Blood Pressure' },
    { label: 'Heart Rate', value: 'Heart Rate' },
    { label: 'Body Weight', value: 'Body Weight' },
    { label: 'Temperature', value: 'Temperature' },
    { label: 'Blood Glucose', value: 'Blood Glucose' },
  ];

  const dateRangeOptions = [
    { label: 'Last 7 Days', value: '7' },
    { label: 'Last 30 Days', value: '30' },
    { label: 'Last 90 Days', value: '90' },
    { label: 'Last Year', value: '365' },
    { label: 'All Time', value: 'all' },
  ];

  const [selectedVitalType, setSelectedVitalType] = useState('Blood Pressure');
  const [selectedDateRange, setSelectedDateRange] = useState('30');
  const [filteredVitals, setFilteredVitals] = useState([]);
  const [summaryStats, setSummaryStats] = useState({});

  useEffect(() => {
    filterAndProcessVitals();
  }, [selectedVitalType, selectedDateRange, vitals, unitPreferences]);

  const filterAndProcessVitals = () => {
    let filtered = getVitalsByType(selectedVitalType);

    if (selectedDateRange !== 'all') {
      const days = parseInt(selectedDateRange);
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - days);
      filtered = filtered.filter(v => {
        const vitalDateTime = new Date(v.date + 'T' + v.time);
        return vitalDateTime >= startDate && vitalDateTime <= endDate;
      });
    }

    filtered.sort((a, b) => new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));
    setFilteredVitals(filtered);
    calculateSummaryStats(filtered);
  };

  const calculateSummaryStats = (data) => {
    if (data.length === 0) {
      setSummaryStats({
        average: 'N/A',
        min: 'N/A',
        max: 'N/A',
        lastRecorded: 'N/A',
        unit: ''
      });
      return;
    }

    const values = data.map(v => {
      if (selectedVitalType === 'Blood Pressure') {
        return { systolic: v.systolic, diastolic: v.diastolic };
      } else {
        return parseFloat(formatVitalValue(selectedVitalType, v.value, v.unit, unitPreferences[getUnitCategory(selectedVitalType)]));
      }
    }).filter(val => !isNaN(val));

    let avg, min, max, unit;

    if (selectedVitalType === 'Blood Pressure') {
      const systolicValues = values.map(v => v.systolic);
      const diastolicValues = values.map(v => v.diastolic);

      const avgSystolic = (systolicValues.reduce((sum, val) => sum + val, 0) / systolicValues.length).toFixed(0);
      const minSystolic = Math.min(...systolicValues);
      const maxSystolic = Math.max(...systolicValues);

      const avgDiastolic = (diastolicValues.reduce((sum, val) => sum + val, 0) / diastolicValues.length).toFixed(0);
      const minDiastolic = Math.min(...diastolicValues);
      const maxDiastolic = Math.max(...diastolicValues);

      avg = `${avgSystolic}/${avgDiastolic}`;
      min = `${minSystolic}/${minDiastolic}`;
      max = `${maxSystolic}/${maxDiastolic}`;
      unit = unitPreferences.bloodPressure;
    } else {
      avg = (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(1);
      min = Math.min(...values).toFixed(1);
      max = Math.max(...values).toFixed(1);
      unit = getUnitForDisplay(selectedVitalType);
    }

    setSummaryStats({
      average: avg,
      min: min,
      max: max,
      lastRecorded: formatVitalValue(selectedVitalType, data[0].value, data[0].unit, unitPreferences[getUnitCategory(selectedVitalType)]),
      unit: unit,
    });
  };

  const getUnitCategory = (vitalType) => {
    switch (vitalType) {
      case 'Blood Pressure': return 'bloodPressure';
      case 'Heart Rate': return 'heartRate'; // Although bpm is fixed, good to have consistent structure
      case 'Body Weight': return 'weight';
      case 'Temperature': return 'temperature';
      case 'Blood Glucose': return 'bloodGlucose';
      default: return '';
    }
  };

  const getUnitForDisplay = (vitalType) => {
    switch (vitalType) {
      case 'Blood Pressure': return unitPreferences.bloodPressure;
      case 'Heart Rate': return 'bpm';
      case 'Body Weight': return unitPreferences.weight;
      case 'Temperature': return unitPreferences.temperature;
      case 'Blood Glucose': return unitPreferences.bloodGlucose;
      default: return '';
    }
  };

  const renderVitalValue = (vital) => {
    if (vital.type === 'Blood Pressure') {
      return `${vital.systolic}/${vital.diastolic} ${unitPreferences.bloodPressure}`;
    } else {
      const unitCat = getUnitCategory(vital.type);
      return `${formatVitalValue(vital.type, vital.value, vital.unit, unitPreferences[unitCat])} ${unitPreferences[unitCat] || vital.unit}`;
    }
  };

  return (
    <div className="trends-page">
      <div className="card mb-spacing">
        <SelectField
          label="Select Vital"
          value={selectedVitalType}
          onChange={(e) => setSelectedVitalType(e.target.value)}
          options={vitalTypeOptions}
        />

        <div className="form-group">
          <label className="label">Date Range</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {dateRangeOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedDateRange === option.value ? 'primary' : 'outline'}
                onClick={() => setSelectedDateRange(option.value)}
                style={{padding: '8px 12px', fontSize: '0.9rem', flexGrow: 1, minWidth: 'auto'}}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="card mb-spacing">
        <h2 className="card-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <LineChart size={20} />
          {selectedVitalType} Trend
        </h2>
        <ChartComponent vitalName={selectedVitalType} period={dateRangeOptions.find(o => o.value === selectedDateRange)?.label || ''} data={filteredVitals} />
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-label">Avg.</div>
            <div className="stat-value">{summaryStats.average} {summaryStats.unit}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Min.</div>
            <div className="stat-value">{summaryStats.min} {summaryStats.unit}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Max.</div>
            <div className="stat-value">{summaryStats.max} {summaryStats.unit}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Last</div>
            <div className="stat-value">{summaryStats.lastRecorded} {summaryStats.unit}</div>
          </div>
        </div>
      </div>

      <div className="card mb-spacing">
        <h2 className="card-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <History size={20} />
          History
        </h2>
        {filteredVitals.length > 0 ? (
          <div className="list-group">
            {filteredVitals.map((vital) => (
              <div key={vital.id} className="list-item">
                <div className="list-item-content">
                  <div className="list-item-title">{renderVitalValue(vital)}</div>
                  <div className="list-item-subtitle">
                    {formatDate(vital.date)} at {formatTime(vital.time)}
                  </div>
                  {vital.notes && (
                    <div className="list-item-subtitle" style={{fontStyle: 'italic', fontSize: '0.8em'}}>Notes: {vital.notes}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            message={`No ${selectedVitalType} data for the selected period.`}
            icon={Calendar}
          />
        )}
      </div>
    </div>
  );
}

export default Trends;