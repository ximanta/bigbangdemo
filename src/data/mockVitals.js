import { generateUniqueId } from '../utils/helpers';

// Helper to get a date string for N days ago
const getDateNDaysAgo = (n) => {
  const date = new Date();
  date.setDate(date.getDate() - n);
  return date.toISOString().split('T')[0];
};

// Helper to get a random time string
const getRandomTime = () => {
  const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${hour}:${minute}`;
};

export const MOCK_VITALS = [
  // Blood Pressure
  {
    id: generateUniqueId(),
    type: 'Blood Pressure',
    date: getDateNDaysAgo(0),
    time: getRandomTime(),
    systolic: 122,
    diastolic: 81,
    unit: 'mmHg',
    notes: 'After morning walk.'
  },
  {
    id: generateUniqueId(),
    type: 'Blood Pressure',
    date: getDateNDaysAgo(1),
    time: getRandomTime(),
    systolic: 128,
    diastolic: 85,
    unit: 'mmHg',
    notes: 'Felt a bit stressed.'
  },
  {
    id: generateUniqueId(),
    type: 'Blood Pressure',
    date: getDateNDaysAgo(3),
    time: getRandomTime(),
    systolic: 118,
    diastolic: 76,
    unit: 'mmHg',
    notes: 'Relaxed evening.'
  },
  {
    id: generateUniqueId(),
    type: 'Blood Pressure',
    date: getDateNDaysAgo(7),
    time: getRandomTime(),
    systolic: 130,
    diastolic: 88,
    unit: 'mmHg',
    notes: 'After coffee.'
  },

  // Heart Rate
  {
    id: generateUniqueId(),
    type: 'Heart Rate',
    date: getDateNDaysAgo(0),
    time: getRandomTime(),
    value: 72,
    unit: 'bpm',
    notes: 'Resting heart rate in the morning.'
  },
  {
    id: generateUniqueId(),
    type: 'Heart Rate',
    date: getDateNDaysAgo(2),
    time: getRandomTime(),
    value: 85,
    unit: 'bpm',
    notes: 'After light exercise.'
  },
  {
    id: generateUniqueId(),
    type: 'Heart Rate',
    date: getDateNDaysAgo(5),
    time: getRandomTime(),
    value: 68,
    unit: 'bpm',
    notes: 'Before sleep.'
  },

  // Body Weight
  {
    id: generateUniqueId(),
    type: 'Body Weight',
    date: getDateNDaysAgo(0),
    time: getRandomTime(),
    value: 70.5,
    unit: 'kg',
    notes: 'Morning weight.'
  },
  {
    id: generateUniqueId(),
    type: 'Body Weight',
    date: getDateNDaysAgo(7),
    time: getRandomTime(),
    value: 71.2,
    unit: 'kg',
    notes: 'Start of the week.'
  },
  {
    id: generateUniqueId(),
    type: 'Body Weight',
    date: getDateNDaysAgo(14),
    time: getRandomTime(),
    value: 70.8,
    unit: 'kg',
    notes: 'Two weeks ago.'
  },

  // Temperature
  {
    id: generateUniqueId(),
    type: 'Temperature',
    date: getDateNDaysAgo(0),
    time: getRandomTime(),
    value: 36.7,
    unit: 'C',
    notes: 'Normal reading.'
  },
  {
    id: generateUniqueId(),
    type: 'Temperature',
    date: getDateNDaysAgo(4),
    time: getRandomTime(),
    value: 37.1,
    unit: 'C',
    notes: 'Felt a bit warm.'
  },

  // Blood Glucose
  {
    id: generateUniqueId(),
    type: 'Blood Glucose',
    date: getDateNDaysAgo(0),
    time: getRandomTime(),
    value: 98,
    unit: 'mg/dL',
    notes: 'Fasting glucose.'
  },
  {
    id: generateUniqueId(),
    type: 'Blood Glucose',
    date: getDateNDaysAgo(1),
    time: getRandomTime(),
    value: 145,
    unit: 'mg/dL',
    notes: '2 hours after meal.'
  },
  {
    id: generateUniqueId(),
    type: 'Blood Glucose',
    date: getDateNDaysAgo(3),
    time: getRandomTime(),
    value: 102,
    unit: 'mg/dL',
    notes: 'Morning, before breakfast.'
  }
];