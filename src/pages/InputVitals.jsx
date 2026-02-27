import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VitalsContext } from '../context/VitalsContext';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import TextAreaField from '../components/TextAreaField';
import Button from '../components/Button';
import ToastContainer from '../components/Toast';

function InputVitals() {
  const { addVital, unitPreferences } = useContext(VitalsContext);
  const navigate = useNavigate();

  const initialFormState = {
    vitalType: 'Blood Pressure',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    systolic: '',
    diastolic: '',
    heartRate: '',
    bodyWeight: '',
    temperature: '',
    bloodGlucose: '',
    notes: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [toasts, setToasts] = useState([]);

  const vitalTypeOptions = [
    { label: 'Blood Pressure', value: 'Blood Pressure' },
    { label: 'Heart Rate', value: 'Heart Rate' },
    { label: 'Body Weight', value: 'Body Weight' },
    { label: 'Temperature', value: 'Temperature' },
    { label: 'Blood Glucose', value: 'Blood Glucose' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, onClose: () => removeToast(id) }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newVital = {
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
    };

    switch (formData.vitalType) {
      case 'Blood Pressure':
        if (!formData.systolic || !formData.diastolic) {
          showToast('Please enter both systolic and diastolic values.', 'error');
          return;
        }
        newVital = {
          ...newVital,
          type: 'Blood Pressure',
          systolic: parseFloat(formData.systolic),
          diastolic: parseFloat(formData.diastolic),
          unit: unitPreferences.bloodPressure,
        };
        break;
      case 'Heart Rate':
        if (!formData.heartRate) {
          showToast('Please enter heart rate value.', 'error');
          return;
        }
        newVital = {
          ...newVital,
          type: 'Heart Rate',
          value: parseFloat(formData.heartRate),
          unit: 'bpm',
        };
        break;
      case 'Body Weight':
        if (!formData.bodyWeight) {
          showToast('Please enter body weight value.', 'error');
          return;
        }
        newVital = {
          ...newVital,
          type: 'Body Weight',
          value: parseFloat(formData.bodyWeight),
          unit: unitPreferences.weight,
        };
        break;
      case 'Temperature':
        if (!formData.temperature) {
          showToast('Please enter temperature value.', 'error');
          return;
        }
        newVital = {
          ...newVital,
          type: 'Temperature',
          value: parseFloat(formData.temperature),
          unit: unitPreferences.temperature,
        };
        break;
      case 'Blood Glucose':
        if (!formData.bloodGlucose) {
          showToast('Please enter blood glucose value.', 'error');
          return;
        }
        newVital = {
          ...newVital,
          type: 'Blood Glucose',
          value: parseFloat(formData.bloodGlucose),
          unit: unitPreferences.bloodGlucose,
        };
        break;
      default:
        showToast('Invalid vital type selected.', 'error');
        return;
    }

    addVital(newVital);
    showToast(`${formData.vitalType} recorded successfully!`, 'success');
    setFormData(initialFormState);
    navigate('/'); // Navigate back to dashboard or trends
  };

  const renderVitalSpecificFields = () => {
    switch (formData.vitalType) {
      case 'Blood Pressure':
        return (
          <div className="flex-row">
            <InputField
              label="Systolic"
              type="number"
              name="systolic"
              value={formData.systolic}
              onChange={handleInputChange}
              unit={unitPreferences.bloodPressure}
              placeholder="e.g., 120"
              required
              min="0"
            />
            <InputField
              label="Diastolic"
              type="number"
              name="diastolic"
              value={formData.diastolic}
              onChange={handleInputChange}
              unit={unitPreferences.bloodPressure}
              placeholder="e.g., 80"
              required
              min="0"
            />
          </div>
        );
      case 'Heart Rate':
        return (
          <InputField
            label="Heart Rate"
            type="number"
            name="heartRate"
            value={formData.heartRate}
            onChange={handleInputChange}
            unit="bpm"
            placeholder="e.g., 75"
            required
            min="0"
          />
        );
      case 'Body Weight':
        return (
          <InputField
            label="Body Weight"
            type="number"
            name="bodyWeight"
            value={formData.bodyWeight}
            onChange={handleInputChange}
            unit={unitPreferences.weight}
            placeholder="e.g., 70.5"
            step="0.1"
            required
            min="0"
          />
        );
      case 'Temperature':
        return (
          <InputField
            label="Temperature"
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleInputChange}
            unit={unitPreferences.temperature}
            placeholder="e.g., 36.8"
            step="0.1"
            required
            min="0"
          />
        );
      case 'Blood Glucose':
        return (
          <InputField
            label="Blood Glucose"
            type="number"
            name="bloodGlucose"
            value={formData.bloodGlucose}
            onChange={handleInputChange}
            unit={unitPreferences.bloodGlucose}
            placeholder="e.g., 90"
            required
            min="0"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="input-vitals-page">
      <form onSubmit={handleSubmit} className="card">
        <SelectField
          label="Vital Type"
          name="vitalType"
          value={formData.vitalType}
          onChange={handleInputChange}
          options={vitalTypeOptions}
          required
        />

        <div className="flex-row">
          <InputField
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
          />
        </div>

        {renderVitalSpecificFields()}

        <TextAreaField
          label="Notes (Optional)"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Add any relevant details or context..."
          rows="3"
        />

        <Button type="submit" variant="primary" className="mt-spacing">
          Save Vital Entry
        </Button>
      </form>
      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default InputVitals;