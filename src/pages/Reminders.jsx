import React, { useState, useContext } from 'react';
import { VitalsContext } from '../context/VitalsContext';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import ToastContainer from '../components/Toast';
import { Bell, Clock, Edit, Trash } from 'lucide-react';

function Reminders() {
  const { reminders, addReminder, updateReminder, deleteReminder } = useContext(VitalsContext);

  const [newReminderTime, setNewReminderTime] = useState('09:00');
  const [newReminderVitalType, setNewReminderVitalType] = useState('Blood Pressure');
  const [editingReminderId, setEditingReminderId] = useState(null);
  const [toasts, setToasts] = useState([]);

  const vitalTypeOptions = [
    { label: 'Blood Pressure', value: 'Blood Pressure' },
    { label: 'Heart Rate', value: 'Heart Rate' },
    { label: 'Body Weight', value: 'Body Weight' },
    { label: 'Temperature', value: 'Temperature' },
    { label: 'Blood Glucose', value: 'Blood Glucose' },
  ];

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, onClose: () => removeToast(id) }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (editingReminderId) {
      updateReminder(editingReminderId, {
        time: newReminderTime,
        vitalType: newReminderVitalType,
      });
      showToast('Reminder updated successfully!', 'success');
      setEditingReminderId(null);
    } else {
      addReminder({
        time: newReminderTime,
        vitalType: newReminderVitalType,
      });
      showToast('Reminder added successfully!', 'success');
    }
    setNewReminderTime('09:00');
    setNewReminderVitalType('Blood Pressure');
  };

  const handleToggleReminder = (id, isEnabled) => {
    updateReminder(id, { isEnabled: !isEnabled });
    showToast(`Reminder ${!isEnabled ? 'enabled' : 'disabled'}.`, 'info');
  };

  const handleEditClick = (reminder) => {
    setEditingReminderId(reminder.id);
    setNewReminderTime(reminder.time);
    setNewReminderVitalType(reminder.vitalType);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      deleteReminder(id);
      showToast('Reminder deleted.', 'info');
    }
  };

  return (
    <div className="reminders-page">
      <div className="card mb-spacing">
        <h2 className="card-title">{editingReminderId ? 'Edit Reminder' : 'Add New Reminder'}</h2>
        <form onSubmit={handleAddReminder}>
          <SelectField
            label="Vital Type"
            name="newReminderVitalType"
            value={newReminderVitalType}
            onChange={(e) => setNewReminderVitalType(e.target.value)}
            options={vitalTypeOptions}
            required
          />
          <InputField
            label="Time"
            type="time"
            name="newReminderTime"
            value={newReminderTime}
            onChange={(e) => setNewReminderTime(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" className="mt-spacing">
            {editingReminderId ? 'Update Reminder' : 'Add Reminder'}
          </Button>
          {editingReminderId && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setEditingReminderId(null);
                setNewReminderTime('09:00');
                setNewReminderVitalType('Blood Pressure');
              }}
              className="mt-spacing"
              style={{marginLeft: 'var(--spacing-unit)'}}
            >
              Cancel Edit
            </Button>
          )}
        </form>
      </div>

      <div className="card">
        <h2 className="card-title">Scheduled Reminders</h2>
        {reminders.length > 0 ? (
          <div className="list-group">
            {reminders.map((reminder) => (
              <div key={reminder.id} className="list-item">
                <div className="list-item-content">
                  <div className="list-item-title" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Clock size={20} />
                    {reminder.vitalType}
                  </div>
                  <div className="list-item-subtitle">
                    Daily at {reminder.time}
                  </div>
                </div>
                <div className="list-item-actions">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={reminder.isEnabled}
                      onChange={() => handleToggleReminder(reminder.id, reminder.isEnabled)}
                    />
                    <span className="slider"></span>
                  </label>
                  <Button
                    variant="outline"
                    onClick={() => handleEditClick(reminder)}
                    style={{padding: '6px 10px', fontSize: '0.8rem'}}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(reminder.id)}
                    style={{padding: '6px 10px', fontSize: '0.8rem'}}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            message="No reminders set. Add one above!"
            icon={Bell}
          />
        )}
      </div>
      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default Reminders;