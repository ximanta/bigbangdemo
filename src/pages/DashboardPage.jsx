import React,
{
  useState,
  useEffect
}
from 'react';
import { useTickets } from '../context/TicketContext';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  Ticket,
  Clock,
  UserCheck,
  LayoutDashboard
}
from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const { tickets,
    loading } = useTickets();
  const { currentUser } = useAuth();
  const [dashboardStats,
    setDashboardStats]
  = useState({
    openTickets: 0,
    assignedToMe: 0,
    resolvedToday: 0,
    totalTickets: 0
  });

  useEffect(() => {
    if (tickets.length > 0 && currentUser) {
      const openTickets = tickets.filter(
        (t) => t.status === 'Open'
      ).length;
      const assignedToMe = tickets.filter(
        (t) => t.assigneeId === currentUser.id && t.status !== 'Closed'
      ).length;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const resolvedToday = tickets.filter(
        (t) =>
          t.status === 'Resolved' &&
          new Date(t.updatedAt).setHours(0, 0, 0, 0) === today.getTime()
      ).length;

      setDashboardStats({
        openTickets,
        assignedToMe,
        resolvedToday,
        totalTickets: tickets.length
      });
    }
  }, [tickets, currentUser]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container flex-row">
      <aside className="sidebar">
        <div className="sidebar-nav">
          <ul>
            <li>
              <Link
                to="/dashboard"
                className="active"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/tickets">
                <Ticket size={18} />
                All Tickets
              </Link>
            </li>
            <li>
              <Link to="/users">
                <UserCheck size={18} />
                Users
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <main className="main-content">
        <h1>Agent Dashboard</h1>

        <div className="dashboard-grid">
          <div className="widget-card">
            <h4>Open Tickets</h4>
            <div className="count">{dashboardStats.openTickets}</div>
            <p className="description">Currently awaiting assignment or resolution.</p>
          </div>
          <div className="widget-card">
            <h4>Assigned to Me</h4>
            <div className="count">{dashboardStats.assignedToMe}</div>
            <p className="description">Tickets you are actively working on.</p>
          </div>
          <div className="widget-card">
            <h4>Resolved Today</h4>
            <div className="count">{dashboardStats.resolvedToday}</div>
            <p className="description">Tickets successfully closed today.</p>
          </div>
          <div className="widget-card">
            <h4>Total Tickets</h4>
            <div className="count">{dashboardStats.totalTickets}</div>
            <p className="description">All tickets in the system.</p>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Recent Activity</h3>
          </div>
          {/* In a real app, you would fetch recent activities, e.g., last 5 ticket updates/comments */}
          <p>Displaying recent activities is not implemented in this demo.</p>
          <p>Please navigate to individual tickets for their full activity log.</p>
        </div>
      </main>
    </div>
  );
};
