export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatTime(timeString) {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function formatVitalValue(vitalType, value, originalUnit, preferredUnit) {
  if (value === undefined || value === null) return '';

  let convertedValue = value;

  switch (vitalType) {
    case 'Body Weight':
      if (originalUnit === 'kg' && preferredUnit === 'lbs') {
        convertedValue = value * 2.20462;
      } else if (originalUnit === 'lbs' && preferredUnit === 'kg') {
        convertedValue = value / 2.20462;
      }
      return convertedValue.toFixed(1);

    case 'Temperature':
      if (originalUnit === 'C' && preferredUnit === 'F') {
        convertedValue = (value * 9 / 5) + 32;
      } else if (originalUnit === 'F' && preferredUnit === 'C') {
        convertedValue = (value - 32) * 5 / 9;
      }
      return convertedValue.toFixed(1);

    case 'Blood Glucose':
      if (originalUnit === 'mg/dL' && preferredUnit === 'mmol/L') {
        convertedValue = value / 18;
      } else if (originalUnit === 'mmol/L' && preferredUnit === 'mg/dL') {
        convertedValue = value * 18;
      }
      return convertedValue.toFixed(0);

    case 'Blood Pressure':
    case 'Heart Rate':
    default:
      return value.toString();
  }
}
