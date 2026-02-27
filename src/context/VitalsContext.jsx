import React, { createContext, useState, useEffect } from 'react';
import { MOCK_VITALS } from '../data/mockVitals';
import { generateUniqueId } from '../utils/helpers';

export const VitalsContext = createContext();

export function VitalsProvider({ children }) {
  const [vitals, setVitals] = useState(() => {
    const savedVitals = localStorage.getItem('healthVitals');
    return savedVitals ? JSON.parse(savedVitals) : MOCK_VITALS;
  });

  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem('healthReminders');
    return savedReminders ? JSON.parse(savedReminders) : [];
  });

  const [unitPreferences, setUnitPreferences] = useState(() => {
    const savedUnits = localStorage.getItem('unitPreferences');
    return savedUnits ? JSON.parse(savedUnits) : {
      weight: 'kg',
      temperature: 'C',
      bloodGlucose: 'mg/dL',
      bloodPressure: 'mmHg'
    };
  });

  useEffect(() => {
    localStorage.setItem('healthVitals', JSON.stringify(vitals));
  }, [vitals]);

  useEffect(() => {
    localStorage.setItem('healthReminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('unitPreferences', JSON.stringify(unitPreferences));
  }, [unitPreferences]);

  const addVital = (newVital) => {
    setVitals((prevVitals) => [{
      id: generateUniqueId(),
      timestamp: new Date().toISOString(),
      ...newVital
    }, ...prevVitals]);
  };

  const updateVital = (id, updatedFields) => {
    setVitals((prevVitals) =>
      prevVitals.map((vital) =>
        vital.id === id ? { ...vital, ...updatedFields } : vital
      )
    );
  };

  const deleteVital = (id) => {
    setVitals((prevVitals) => prevVitals.filter((vital) => vital.id !== id));
  };

  const addReminder = (newReminder) => {
    setReminders((prevReminders) => [{
      id: generateUniqueId(),
      isEnabled: true,
      ...newReminder
    }, ...prevReminders]);
  };

  const updateReminder = (id, updatedFields) => {
    setReminders((prevReminders) =>
      prevReminders.map((reminder) =>
        reminder.id === id ? { ...reminder, ...updatedFields } : reminder
      )
    );
  };

  const deleteReminder = (id) => {
    setReminders((prevReminders) => prevReminders.filter((reminder) => reminder.id !== id));
  };

  const updateUnitPreference = (category, unit) => {
    setUnitPreferences((prevUnits) => ({ ...prevUnits, [category]: unit }));
  };

  const getVitalsByType = (type) => {
    return vitals.filter(vital => vital.type === type).sort((a,b) => new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));
  };

  const getVitalsByDateRange = (startDate, endDate) => {
    return vitals.filter(vital => {
      const vitalDateTime = new Date(vital.date + 'T' + vital.time);
      return vitalDateTime >= startDate && vitalDateTime <= endDate;
    }).sort((a,b) => new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));
  };

  return (
    <VitalsContext.Provider
      value={{
        vitals,
        reminders,
        unitPreferences,
        addVital,
        updateVital,
        deleteVital,
        addReminder,
        updateReminder,
        deleteReminder,
        updateUnitPreference,
        getVitalsByType,
        getVitalsByDateRange,
      }}
    >
      {children}
    </VitalsContext.Provider>
  );
}