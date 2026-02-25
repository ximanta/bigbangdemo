import { generateUniqueId } from './../utils/helpers';

const now = new Date();

export const mockUsers = [
  {
    id: 'user1',
    name: 'Alice Smith',
    email: 'alice@example.com',
    password: 'password',
    role: 1 // Customer
  },
  {
    id: 'user2',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'password',
    role: 2 // Agent
  },
  {
    id: 'user3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    password: 'password',
    role: 3 // Administrator
  },
  {
    id: 'user4',
    name: 'Diana Prince',
    email: 'diana@example.com',
    password: 'password',
    role: 2 // Agent
  },
  {
    id: 'user5',
    name: 'Eve Adams',
    email: 'eve@example.com',
    password: 'password',
    role: 1 // Customer
  }
];

export const mockTickets = [
  {
    id: 'TKT-001',
    subject: 'Cannot login to portal',
    description: 'I am unable to log into the customer portal. My password seems to be incorrect, but I have not changed it recently. I have tried resetting it multiple times, but I keep getting an error message. Please help me regain access to my account.',
    customerId: 'user1',
    customerName: 'Alice Smith',
    status: 'Open',
    priority: 'High',
    assigneeId: 'user2',
    assigneeName: 'Bob Johnson',
    createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Technical Issue',
    attachments: []
  },
  {
    id: 'TKT-002',
    subject: 'Request for new feature: Dark Mode',
    description: 'I would like to request a dark mode feature for the entire application. It would greatly improve user experience, especially during evening hours, and reduce eye strain. Many modern applications offer this, and it would be a valuable addition.',
    customerId: 'user5',
    customerName: 'Eve Adams',
    status: 'In Progress',
    priority: 'Medium',
    assigneeId: 'user4',
    assigneeName: 'Diana Prince',
    createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Feature Request',
    attachments: []
  },
  {
    id: 'TKT-003',
    subject: 'Billing inquiry: Incorrect charge',
    description: 'I noticed an incorrect charge on my last invoice. It seems I was billed for a service I did not use or subscribe to. Could you please investigate this and adjust my bill accordingly? I have attached a screenshot of the charge in question.',
    customerId: 'user1',
    customerName: 'Alice Smith',
    status: 'Resolved',
    priority: 'High',
    assigneeId: 'user2',
    assigneeName: 'Bob Johnson',
    createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Billing',
    attachments: ['invoice-screenshot.png']
  },
  {
    id: 'TKT-004',
    subject: 'Question about API documentation',
    description: 'I am trying to integrate with your API and have a question regarding the authentication process. The documentation states to use an API key, but I cannot find where to generate one in my account settings. Can you provide guidance?',
    customerId: 'user5',
    customerName: 'Eve Adams',
    status: 'Closed',
    priority: 'Low',
    assigneeId: 'user4',
    assigneeName: 'Diana Prince',
    createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Technical Issue',
    attachments: []
  },
  {
    id: 'TKT-005',
    subject: 'Website performance is slow',
    description: 'The website has been loading very slowly for the past few days. Pages take a long time to render, and sometimes requests time out. This is affecting my ability to use the service efficiently. My internet connection is stable.',
    customerId: 'user1',
    customerName: 'Alice Smith',
    status: 'Open',
    priority: 'Medium',
    assigneeId: null,
    assigneeName: null,
    createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Performance',
    attachments: []
  },
  {
    id: 'TKT-006',
    subject: 'Update contact information',
    description: 'I need to update my contact email address. The current one is old and I no longer use it. Please change it to new.email@example.com. I can provide verification if needed.',
    customerId: 'user5',
    customerName: 'Eve Adams',
    status: 'Open',
    priority: 'Low',
    assigneeId: 'user2',
    assigneeName: 'Bob Johnson',
    createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    category: 'Account Management',
    attachments: []
  }
];

export const mockComments = [
  {
    id: generateUniqueId(),
    ticketId: 'TKT-001',
    authorId: 'user2',
    authorName: 'Bob Johnson',
    type: 'public',
    content: 'Hi Alice, I\'ve received your ticket. I\'m looking into the login issue now. Can you confirm if you\'re seeing any specific error codes?',
    timestamp: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000 + 1000).toISOString()
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-001',
    authorId: 'user1',
    authorName: 'Alice Smith',
    type: 'public',
    content: 'Thanks, Bob. I\'m not seeing any error codes, just a generic \'invalid credentials\' message. It\'s very frustrating.',
    timestamp: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000 + 2000).toISOString()
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-001',
    authorId: 'user2',
    authorName: 'Bob Johnson',
    type: 'internal',
    content: 'Checked logs. User \'alice@example.com\' password reset attempts failed due to CAPTCHA issue. Escalating to engineering.',
    timestamp: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000 + 3000).toISOString()
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-002',
    authorId: 'user4',
    authorName: 'Diana Prince',
    type: 'public',
    content: 'Thanks for the feature request, Eve! Dark mode is definitely something we\'ve considered. I\'ll mark this as \'In Progress\' and pass it to the product team for review.',
    timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-003',
    authorId: 'user2',
    authorName: 'Bob Johnson',
    type: 'public',
    content: 'Hi Alice, I\'ve reviewed your billing inquiry and confirmed the incorrect charge. I\'ve processed a full refund for the disputed amount, which should reflect in your account within 3-5 business days. Your ticket is now resolved.',
    timestamp: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-004',
    authorId: 'user4',
    authorName: 'Diana Prince',
    type: 'public',
    content: 'Hi Eve, you can generate API keys by navigating to \'Settings' -> \'API Integrations\' within your account. If you still have trouble, please let me know!',
    timestamp: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-005',
    authorId: 'user1',
    authorName: 'Alice Smith',
    type: 'public',
    content: 'The website is still very slow. Is there any update on this issue? It\'s making it difficult to use the service.',
    timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const mockActivityLog = [
  {
    id: generateUniqueId(),
    ticketId: 'TKT-001',
    timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Ticket created by Alice Smith.'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-001',
    timestamp: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Ticket assigned to Bob Johnson by Admin.'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-001',
    timestamp: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000 + 1000).toISOString(),
    description: 'Comment added by Bob Johnson (public).'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-001',
    timestamp: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000 + 2000).toISOString(),
    description: 'Comment added by Alice Smith (public).'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-001',
    timestamp: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000 + 3000).toISOString(),
    description: 'Internal note added by Bob Johnson.'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-002',
    timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Ticket created by Eve Adams.'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-002',
    timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Ticket status changed from Open to In Progress by Diana Prince.'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-002',
    timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Comment added by Diana Prince (public).'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-003',
    timestamp: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Ticket created by Alice Smith.'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-003',
    timestamp: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Ticket status changed from Open to Resolved by Bob Johnson.'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-003',
    timestamp: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Comment added by Bob Johnson (public).'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-004',
    timestamp: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Ticket created by Eve Adams.'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-004',
    timestamp: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Ticket status changed from Open to Closed by Diana Prince.'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-004',
    timestamp: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Comment added by Diana Prince (public).'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-005',
    timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Ticket created by Alice Smith.'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-005',
    timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Comment added by Alice Smith (public).'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-006',
    timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Ticket created by Eve Adams.'
  },
  {
    id: generateUniqueId(),
    ticketId: 'TKT-006',
    timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Ticket assigned to Bob Johnson by Admin.'
  }
];