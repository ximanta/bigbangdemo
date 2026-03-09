import React from 'react';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import ChartPlaceholder from '../components/ChartPlaceholder';
import Button from '../components/Button';
import { TrendingUp, Award, Clock, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const mockData = {
    overallReadiness: 75,
    technicalSkills: 80,
    strategicUnderstanding: 70,
    dataLiteracy: 65,
    ethicalConsiderations: 85,
    completedCourses: 12,
    hoursSpent: 45,
    nextSteps: [
      "Complete 'AI Ethics Fundamentals' course",
      "Review data privacy regulations",
      "Explore machine learning algorithms for business applications",
    ],
  };

  const handleStartAssessment = () => {
    navigate('/assessment');
  };

  const handleExploreLearning = () => {
    navigate('/learning-paths');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">AI Readiness Dashboard</h1>
        <Button onClick={handleStartAssessment}>
          <Brain size={18} /> Start New Assessment
        </Button>
      </div>

      <div className="dashboard-grid">
        <Card title="Overall Readiness Score">
          <p style={{ fontSize: '2.5em', fontWeight: '700', color: 'var(--primary-color)', textAlign: 'center', marginBottom: '15px' }}>
            {mockData.overallReadiness}%
          </p>
          <ProgressBar progress={mockData.overallReadiness} label="Progress towards 100%" />
          <p style={{ fontSize: '0.9em', color: 'var(--text-light-color)', textAlign: 'center' }}>
            Based on your latest assessment.
          </p>
        </Card>

        <Card title="Key Metrics">
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <Award size={36} style={{ color: 'var(--primary-color)', marginBottom: '5px' }} />
              <p style={{ fontWeight: '600', fontSize: '1.2em' }}>{mockData.completedCourses}</p>
              <span style={{ fontSize: '0.8em', color: 'var(--text-light-color)' }}>Courses Completed</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Clock size={36} style={{ color: 'var(--secondary-color)', marginBottom: '5px' }} />
              <p style={{ fontWeight: '600', fontSize: '1.2em' }}>{mockData.hoursSpent}</p>
              <span style={{ fontSize: '0.8em', color: 'var(--text-light-color)' }}>Hours Spent Learning</span>
            </div>
          </div>
          <Button onClick={handleExploreLearning} variant="secondary" style={{ width: '100%' }}>
            <Lightbulb size={18} /> Explore Learning Paths
          </Button>
        </Card>

        <Card title="Skill Area Progress">
          <ProgressBar progress={mockData.technicalSkills} label="Technical Skills" />
          <ProgressBar progress={mockData.strategicUnderstanding} label="Strategic Understanding" />
          <ProgressBar progress={mockData.dataLiteracy} label="Data Literacy" />
          <ProgressBar progress={mockData.ethicalConsiderations} label="Ethical AI Considerations" />
        </Card>

        <Card title="Recommended Next Steps">
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {mockData.nextSteps.map((step, index) => (
              <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <TrendingUp size={18} style={{ color: 'var(--primary-color)', flexShrink: 0, marginTop: '2px' }} />
                <span>{step}</span>
              </li>
            ))}
          </ul>
          <Button onClick={() => navigate('/learning-paths')} variant="secondary" style={{ width: '100%', marginTop: '20px' }}>
            View All Recommendations
          </Button>
        </Card>

        <Card title="Readiness Over Time" className="grid-span-2">
          <ChartPlaceholder type="line" title="Assessment Scores Trend" />
        </Card>

        <Card title="Skill Gap Analysis">
          <ChartPlaceholder type="pie" title="Current Skill Distribution" />
        </Card>

        <Card title="Learning Engagement">
          <ChartPlaceholder type="bar" title="Weekly Learning Activity" />
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
