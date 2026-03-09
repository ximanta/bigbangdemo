import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { PlayCircle, Award, BookOpen, Clock } from 'lucide-react';

function LearningPaths() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState(null);

  const mockLearningPaths = [
    {
      id: 'lp-001',
      title: 'Fundamentals of AI & Machine Learning',
      description: 'Understand core AI concepts, algorithms, and applications. Ideal for beginners.',
      duration: '8 Weeks',
      difficulty: 'Beginner',
      skillsCovered: ['AI Concepts', 'ML Basics', 'Python for AI', 'Data Preprocessing'],
      resources: [
        { type: 'Course', name: 'Introduction to AI (Coursera)', link: '#' },
        { type: 'Book', name: 'AI Superpowers: China, Silicon Valley, and the New World Order', link: '#' },
      ],
      progress: 60,
    },
    {
      id: 'lp-002',
      title: 'Strategic AI Implementation for Business Leaders',
      description: 'Learn how to identify AI opportunities, manage projects, and drive adoption within an organization.',
      duration: '6 Weeks',
      difficulty: 'Intermediate',
      skillsCovered: ['AI Strategy', 'Project Management', 'Change Management', 'ROI Analysis'],
      resources: [
        { type: 'Article', name: 'Harvard Business Review: AI in Business', link: '#' },
        { type: 'Course', name: 'Leading with AI (edX)', link: '#' },
      ],
      progress: 30,
    },
    {
      id: 'lp-003',
      title: 'Ethical AI & Data Governance',
      description: 'Explore the ethical implications of AI, responsible AI development, and data governance best practices.',
      duration: '4 Weeks',
      difficulty: 'Intermediate',
      skillsCovered: ['AI Ethics', 'Bias Detection', 'Data Privacy', 'Regulatory Compliance'],
      resources: [
        { type: 'Report', name: 'OpenAI Ethics Guidelines', link: '#' },
        { type: 'Course', name: 'Responsible AI Development (Google AI)', link: '#' },
      ],
      progress: 0,
    },
    {
      id: 'lp-004',
      title: 'Advanced Data Science for AI',
      description: 'Deep dive into advanced statistical methods, big data tools, and complex modeling techniques for AI.',
      duration: '12 Weeks',
      difficulty: 'Advanced',
      skillsCovered: ['Advanced Statistics', 'Big Data', 'Deep Learning', 'Cloud AI Platforms'],
      resources: [
        { type: 'Course', name: 'Deep Learning Specialization (Coursera)', link: '#' },
        { type: 'Book', name: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow', link: '#' },
      ],
      progress: 80,
    },
  ];

  const openPathDetails = (path) => {
    setSelectedPath(path);
    setIsModalOpen(true);
  };

  const handleStartPath = (pathTitle) => {
    alert(`Starting learning path: "${pathTitle}"`);
    setIsModalOpen(false);
    // In a real app, this would update user progress or enroll them in a path
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Personalized Learning Paths</h1>
      </div>

      <div className="dashboard-grid">
        {mockLearningPaths.map((path) => (
          <Card key={path.id} title={path.title}>
            <p style={{ fontSize: '0.95em', color: 'var(--text-light-color)', marginBottom: '15px' }}>
              {path.description}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ fontSize: '0.9em', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={16} /> {path.duration}
              </span>
              <span style={{ fontSize: '0.9em', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Award size={16} /> {path.difficulty}
              </span>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontWeight: '500', marginBottom: '8px', fontSize: '0.9em' }}>Skills Covered:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {path.skillsCovered.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: 'var(--background-color)',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      fontSize: '0.8em',
                      color: 'var(--text-light-color)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <Button onClick={() => openPathDetails(path)} variant="primary" style={{ width: '100%' }}>
              <PlayCircle size={18} /> View Path Details
            </Button>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedPath?.title || 'Learning Path Details'}>
        {selectedPath && (
          <div style={{ padding: '10px' }}>
            <p style={{ marginBottom: '15px', fontSize: '1em' }}>{selectedPath.description}</p>
            <p style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} /> <strong>Duration:</strong> {selectedPath.duration}
            </p>
            <p style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} /> <strong>Difficulty:</strong> {selectedPath.difficulty}
            </p>
            <h4 style={{ marginBottom: '10px', fontSize: '1.2em' }}>Skills to Master:</h4>
            <ul style={{ listStyle: 'disc', marginLeft: '20px', marginBottom: '20px' }}>
              {selectedPath.skillsCovered.map((skill, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{skill}</li>
              ))}
            </ul>
            <h4 style={{ marginBottom: '10px', fontSize: '1.2em' }}>Recommended Resources:</h4>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
              {selectedPath.resources.map((resource, index) => (
                <li key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BookOpen size={18} style={{ color: 'var(--primary-color)' }} />
                  <span>{resource.type}: <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.name}</a></span>
                </li>
              ))}
            </ul>
            <Button onClick={() => handleStartPath(selectedPath.title)} style={{ width: '100%' }}>
              Start This Path
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default LearningPaths;
