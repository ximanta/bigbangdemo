export const users = [
  { id: 'usr1', username: 'john.doe', email: 'john.doe@example.com', role: 'customer', name: 'John Doe' },
  { id: 'usr2', username: 'jane.smith', email: 'jane.smith@example.com', role: 'agent', name: 'Jane Smith' },
  { id: 'usr3', username: 'agent.one', email: 'agent.one@example.com', role: 'agent', name: 'Agent One' },
  { id: 'usr4', username: 'customer.user', email: 'customer.user@example.com', role: 'customer', name: 'Customer User' }
];

export const categories = [
  'Technical Support',
  'Billing Inquiry',
  'Feature Request',
  'Bug Report',
  'General Inquiry'
];

export const priorities = [
  'Low',
  'Medium',
  'High',
  'Urgent'
];

export const statuses = [
  'Open',
  'In Progress',
  'Resolved',
  'Closed'
];

const initialTickets = [
  {
    id: 'TKT001',
    subject: 'Cannot log in to my account',
    description: 'I am unable to log in to my account. I have tried resetting my password multiple times, but it keeps saying invalid credentials.',
    status: 'Open',
    priority: 'High',
    category: 'Technical Support',
    requesterId: 'usr1',
    assigneeId: 'usr2',
    createdAt: '2023-10-26T10:00:00Z',
    updatedAt: '2023-10-26T10:00:00Z',
    comments: [
      { id: 'comm1', authorId: 'usr1', type: 'external', content: 'Still facing the issue after password reset.', createdAt: '2023-10-26T10:05:00Z' },
      { id: 'comm2', authorId: 'usr2', type: 'internal', content: 'Checked logs, user attempting with incorrect case.', createdAt: '2023-10-26T10:15:00Z' }
    ],
    attachments: []
  },
  {
    id: 'TKT002',
    subject: 'Question about my last bill',
    description: 'My last bill seems higher than expected. Can you please review the charges?',
    status: 'In Progress',
    priority: 'Medium',
    category: 'Billing Inquiry',
    requesterId: 'usr4',
    assigneeId: 'usr3',
    createdAt: '2023-10-25T14:30:00Z',
    updatedAt: '2023-10-26T09:00:00Z',
    comments: [
      { id: 'comm3', authorId: 'usr4', type: 'external', content: 'Please check the details for October.', createdAt: '2023-10-25T14:35:00Z' },
      { id: 'comm4', authorId: 'usr3', type: 'internal', content: 'Assigned to billing team for review.', createdAt: '2023-10-26T09:00:00Z' }
    ],
    attachments: []
  },
  {
    id: 'TKT003',
    subject: 'Request for new reporting feature',
    description: 'It would be great if we could have a feature to export reports in CSV format directly from the dashboard.',
    status: 'Open',
    priority: 'Low',
    category: 'Feature Request',
    requesterId: 'usr1',
    assigneeId: null,
    createdAt: '2023-10-24T09:15:00Z',
    updatedAt: '2023-10-24T09:15:00Z',
    comments: [
      { id: 'comm5', authorId: 'usr1', type: 'external', content: 'This would save a lot of manual work.', createdAt: '2023-10-24T09:20:00Z' }
    ],
    attachments: []
  },
  {
    id: 'TKT004',
    subject: 'Dashboard not loading correctly',
    description: 'When I try to access the dashboard, it sometimes shows a blank page or an error message. Refreshing usually fixes it.',
    status: 'Resolved',
    priority: 'High',
    category: 'Bug Report',
    requesterId: 'usr4',
    assigneeId: 'usr2',
    createdAt: '2023-10-23T11:00:00Z',
    updatedAt: '2023-10-23T16:00:00Z',
    comments: [
      { id: 'comm6', authorId: 'usr4', type: 'external', content: 'Happens randomly in Chrome.', createdAt: '2023-10-23T11:05:00Z' },
      { id: 'comm7', authorId: 'usr2', type: 'internal', content: 'Identified a caching issue. Cleared cache, monitoring.', createdAt: '2023-10-23T15:00:00Z' },
      { id: 'comm8', authorId: 'usr2', type: 'external', content: 'Issue resolved by clearing browser cache. Please let us know if it reoccurs.', createdAt: '2023-10-23T16:00:00Z' }
    ],
    attachments: []
  },
  {
    id: 'TKT005',
    subject: 'General inquiry about service uptime',
    description: 'I would like to know more about your service uptime guarantees and how you handle outages.',
    status: 'Closed',
    priority: 'Low',
    category: 'General Inquiry',
    requesterId: 'usr1',
    assigneeId: 'usr3',
    createdAt: '2023-10-22T08:00:00Z',
    updatedAt: '2023-10-22T09:30:00Z',
    comments: [
      { id: 'comm9', authorId: 'usr1', type: 'external', content: 'Looking for an SLA document.', createdAt: '2023-10-22T08:05:00Z' },
      { id: 'comm10', authorId: 'usr3', type: 'external', content: 'Provided link to our SLA documentation.', createdAt: '2023-10-22T09:00:00Z' }
    ],
    attachments: [
      { fileName: 'SLA_Document.pdf', url: '/files/SLA_Document.pdf' }
    ]
  }
];

export let tickets = [...initialTickets];

export const addTicket = (newTicket) => {
  tickets.push(newTicket);
};

export const updateTicket = (updatedTicket) => {
  tickets = tickets.map(ticket =>
    ticket.id === updatedTicket.id ? { ...ticket, ...updatedTicket } : ticket
  );
};

export const getTicketById = (id) => {
  return tickets.find(ticket => ticket.id === id);
};

export const getUserByUsername = (username) => {
  return users.find(user => user.username === username);
};

export const getUserById = (id) => {
  return users.find(user => user.id === id);
};
