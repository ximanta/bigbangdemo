import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VitalsContext } from '../context/VitalsContext';
import { formatVitalValue, formatDate, formatTime } from '../utils/formatters';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { PlusCircle, HeartPulse, Scale, Thermometer, Droplet, Clock } from 'lucide-react';

function Dashboard() {
  const { vitals, reminders, unitPreferences } = useContext(VitalsContext);
  const [latestVitals, setLatestVitals] = useState({});
  const [upcomingReminders, setUpcomingReminders] = useState([]);

  useEffect(() => {
    const sortedVitals = [...vitals].sort((a, b) => new Date(b.date + 'T' + b.time) - new Date(a.date + 'T' + a.time));
    const latest = {};
    const vitalTypes = [
      'Blood Pressure',
      'Heart Rate',
      'Body Weight',
      'Temperature',
      'Blood Glucose'
    ];

    vitalTypes.forEach(type => {
      const lastEntry = sortedVitals.find(v => v.type === type);
      if (lastEntry) {
        latest[type] = lastEntry;
      }
    });
    setLatestVitals(latest);

    const now = new Date();
    const sortedReminders = reminders
      .filter(r => r.isEnabled)
      .sort((a, b) => {
        const timeA = new Date(`2000-01-01T${a.time}`);
        const timeB = new Date(`2000-01-01T${b.time}`);
        return timeA - timeB;
      });

    setUpcomingReminders(sortedReminders.slice(0, 3)); // Show up to 3 upcoming reminders

  }, [vitals, reminders]);

  const getVitalDisplay = (vitalType) => {
    const vital = latestVitals[vitalType];
    if (!vital) return 'N/A';

    let value = '';
    let unit = '';

    switch (vitalType) {
      case 'Blood Pressure':
        value = `${vital.systolic}/${vital.diastolic}`;
        unit = unitPreferences.bloodPressure;
        break;
      case 'Heart Rate':
        value = vital.value;
        unit = vital.unit;
        break;
      case 'Body Weight':
        value = formatVitalValue(vitalType, vital.value, vital.unit, unitPreferences.weight);
        unit = unitPreferences.weight;
        break;
      case 'Temperature':
        value = formatVitalValue(vitalType, vital.value, vital.unit, unitPreferences.temperature);
        unit = unitPreferences.temperature;
        break;
      case 'Blood Glucose':
        value = formatVitalValue(vitalType, vital.value, vital.unit, unitPreferences.bloodGlucose);
        unit = unitPreferences.bloodGlucose;
        break;
      default:
        value = vital.value;
        unit = vital.unit;
    }
    return `${value} ${unit}`;
  };

  const getVitalIcon = (type) => {
    switch (type) {
      case 'Blood Pressure': return <HeartPulse size={20} color="var(--primary-color)" />;
      case 'Heart Rate': return <HeartPulse size={20} color="var(--primary-color)" />;
      case 'Body Weight': return <Scale size={20} color="var(--primary-color)" />;
      case 'Temperature': return <Thermometer size={20} color="var(--primary-color)" />;
      case 'Blood Glucose': return <Droplet size={20} color="var(--primary-color)" />;
      default: return null;
    }
  };

  return (
    <div className="dashboard-page">
      <div className="card mb-spacing">
        <h2 className="card-title">Recent Vitals</h2>
        <div className="list-group">
          {['Blood Pressure', 'Heart Rate', 'Body Weight', 'Temperature', 'Blood Glucose'].map((type) => (
            <div key={type} className="list-item">
              <div className="list-item-content">
                <div className="list-item-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  {getVitalIcon(type)}
                  {type}
                </div>
                <div className="list-item-subtitle">
                  {latestVitals[type] ? (
                    `Recorded on ${formatDate(latestVitals[type].date)} at ${formatTime(latestVitals[type].time)}`
                  ) : (
                    'No data recorded'
                  )}
                </div>
              </div>
              <div className="list-item-actions" style={{fontWeight: 'bold', color: 'var(--primary-color)'}}>
                {getVitalDisplay(type)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-spacing">
        <h2 className="card-title">Upcoming Reminders</h2>
        {upcomingReminders.length > 0 ? (
          <div className="list-group">
            {upcomingReminders.map(reminder => (
              <div key={reminder.id} className="list-item">
                <div className="list-item-content">
                  <div className="list-item-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Clock size={20} color="var(--text-color)" />
                    {reminder.vitalType}
                  </div>
                  <div className="list-item-subtitle">
                    Daily at {formatTime(reminder.time)}
                  </div>
                </div>
                <div className="list-item-actions">
                  <Link to="/reminders" className="button button-outline" style={{padding: '6px 10px', fontSize: '0.8rem'}}>View All</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            message="No reminders set yet."
            icon={Bell}
            actionButton={<Link to="/reminders"><Button variant="primary">Set a Reminder</Button></Link>}
          />
        )}
      </div>

      <div className="text-center mt-spacing">
        <Link to="/input">
          <Button variant="primary">
            <PlusCircle />
            Record New Vital
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;