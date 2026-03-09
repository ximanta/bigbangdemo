export const getDaysUntilExpiry = (expiryDateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to start of day

  const expiryDate = new Date(expiryDateString);
  expiryDate.setHours(0, 0, 0, 0); // Normalize expiry date to start of day

  const diffTime = expiryDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const formatDate = (dateString) => {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
