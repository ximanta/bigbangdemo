import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { VitalsContext } from '../context/VitalsContext';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import ToastContainer from '../components/Toast';
import { User, LogOut, Globe } from 'lucide-react';

function Settings() {
  const { logout } = useContext(AuthContext);
  const { unitPreferences, updateUnitPreference } = useContext(VitalsContext);
  const navigate = useNavigate();
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, onClose: () => removeToast(id) }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleUnitChange = (category, value) => {
    updateUnitPreference(category, value);
    showToast(`Unit for ${category} updated to ${value}.`, 'success');
  };

  const weightUnitOptions = [
    { label: 'Kilograms (kg)', value: 'kg' },
    { label: 'Pounds (lbs)', value: 'lbs' },
  ];

  const temperatureUnitOptions = [
    { label: 'Celsius (°C)', value: 'C' },
    { label: 'Fahrenheit (°F)', value: 'F' },
  ];

  const bloodGlucoseUnitOptions = [
    { label: 'mg/dL', value: 'mg/dL' },
    { label: 'mmol/L', value: 'mmol/L' },
  ];

  return (
    <div className="settings-page">
      <div className="card mb-spacing">
        <h2 className="card-title">Account</h2>
        <div className="list-group">
          <Link to="/profile" className="list-item" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="list-item-content">
              <div className="list-item-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <User size={20} />
                Manage Profile
              </div>
            </div>
            <div className="list-item-actions"></div>
          </Link>
          <div className="list-item">
            <Button variant="danger" onClick={logout} style={{width: '100%', justifyContent: 'flex-start'}}>
              <LogOut size={20} />
              Log Out
            </Button>
          </div>
        </div>
      </div>

      <div className="card mb-spacing">
        <h2 className="card-title">Unit Preferences</h2>
        <SelectField
          label="Weight Unit"
          name="weightUnit"
          value={unitPreferences.weight}
          onChange={(e) => handleUnitChange('weight', e.target.value)}
          options={weightUnitOptions}
        />
        <SelectField
          label="Temperature Unit"
          name="temperatureUnit"
          value={unitPreferences.temperature}
          onChange={(e) => handleUnitChange('temperature', e.target.value)}
          options={temperatureUnitOptions}
        />
        <SelectField
          label="Blood Glucose Unit"
          name="bloodGlucoseUnit"
          value={unitPreferences.bloodGlucose}
          onChange={(e) => handleUnitChange('bloodGlucose', e.target.value)}
          options={bloodGlucoseUnitOptions}
        />
      </div>

      <div className="card">
        <h2 className="card-title">About</h2>
        <div className="list-group">
          <div className="list-item">
            <div className="list-item-content">
              <div className="list-item-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Globe size={20} />
                Version
              </div>
            </div>
            <div className="list-item-actions">1.0.0</div>
          </div>
        </div>
      </div>
      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default Settings;