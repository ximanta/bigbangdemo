export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const getRoleName = (roleId) => {
  switch (roleId) {
    case 1:
      return 'Customer';
    case 2:
      return 'Agent';
    case 3:
      return 'Administrator';
    default:
      return 'Unknown';
  }
};

export const getStatusBadgeClass = (status) => {
  switch (status.toLowerCase()) {
    case 'open':
      return 'status-open';
    case 'in progress':
      return 'status-in-progress';
    case 'resolved':
      return 'status-resolved';
    case 'closed':
      return 'status-closed';
    default:
      return '';
  }
};

export const getPriorityBadgeClass = (priority) => {
  switch (priority.toLowerCase()) {
    case 'low':
      return 'status-low';
    case 'medium':
      return 'status-medium';
    case 'high':
      return 'status-high';
    default:
      return '';
  }
};
