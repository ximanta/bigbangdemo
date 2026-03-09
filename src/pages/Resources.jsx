import React, { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import { Search, Link as LinkIcon, BookOpen, Video, FileText, Tool } from 'lucide-react';

function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const mockResources = [
    {
      id: 'res-001',
      title: 'The AI Revolution: The Road to Superintelligence',
      type: 'Article',
      category: 'Overview',
      link: '#',
      description: 'A foundational article explaining the potential trajectories of AI development and its impact on humanity.',
    },
    {
      id: 'res-002',
      title: 'Machine Learning Crash Course with TensorFlow APIs',
      type: 'Course',
      category: 'Technical Skills',
      link: '#',
      description: 'A fast-paced, practical introduction to machine learning using Google\'s TensorFlow library.',
    },
    {
      id: 'res-003',
      title: 'Ethical Guidelines for AI Development',
      type: 'Report',
      category: 'Ethics',
      link: '#',
      description: 'Comprehensive guidelines for developing AI responsibly, focusing on fairness, accountability, and transparency.',
    },
    {
      id: 'res-004',
      title: 'Data Science Toolkit: Essential Tools for Practitioners',
      type: 'Tool Guide',
      category: 'Tools',
      link: '#',
      description: 'An overview of the most important software and libraries used in modern data science and AI workflows.',
    },
    {
      id: 'res-005',
      title: 'Understanding Neural Networks: A Visual Introduction',
      type: 'Video',
      category: 'Technical Skills',
      link: '#',
      description: 'Animated explanation of how neural networks work, making complex concepts easy to grasp.',
    },
    {
      id: 'res-006',
      title: 'AI in Healthcare: Opportunities and Challenges',
      type: 'Article',
      category: 'Industry Applications',
      link: '#',
      description: 'Explores the transformative potential of AI in healthcare, from diagnostics to personalized medicine.',
    },
    {
      id: 'res-007',
      title: 'The Business of AI: Strategy and Implementation',
      type: 'Book',
      category: 'Strategic Understanding',
      link: '#',
      description: 'A guide for business leaders on how to integrate AI into their strategic planning and operations.',
    },
  ];

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || resource.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const getIconForType = (type) => {
    switch (type.toLowerCase()) {
      case 'article':
        return <FileText size={18} />;
      case 'course':
        return <BookOpen size={18} />;
      case 'report':
        return <FileText size={18} />;
      case 'tool guide':
        return <Tool size={18} />;
      case 'video':
        return <Video size={18} />;
      default:
        return <LinkIcon size={18} />;
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Curated AI Resources</h1>
      </div>

      <div className="flex-container" style={{ marginBottom: '30px' }}>
        <div className="search-bar-container flex-item">
          <Input
            id="resource-search"
            type="text"
            placeholder="Search resources by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={20} />
        </div>
        <div className="flex-item" style={{ maxWidth: '200px' }}>
          <Dropdown
            id="resource-filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'article', label: 'Article' },
              { value: 'course', label: 'Course' },
              { value: 'report', label: 'Report' },
              { value: 'tool guide', label: 'Tool Guide' },
              { value: 'video', label: 'Video' },
            ]}
          />
        </div>
      </div>

      <div className="dashboard-grid">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <Card key={resource.id} title={resource.title}>
              <p style={{ fontSize: '0.9em', color: 'var(--text-light-color)', marginBottom: '15px' }}>
                {resource.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.85em', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  {getIconForType(resource.type)} {resource.type}
                </span>
                <span style={{ fontSize: '0.85em', color: 'var(--text-light-color)' }}>
                  Category: {resource.category}
                </span>
              </div>
              <Button onClick={() => window.open(resource.link, '_blank')} variant="secondary" style={{ width: '100%' }}>
                <LinkIcon size={18} /> View Resource
              </Button>
            </Card>
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-light-color)' }}>
            No resources found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
}

export default Resources;
