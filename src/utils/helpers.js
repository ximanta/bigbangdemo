export const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const generateId = (prefix = 'ID') => {
  return prefix + Math.random().toString(36).substr(2, 9).toUpperCase();
};
