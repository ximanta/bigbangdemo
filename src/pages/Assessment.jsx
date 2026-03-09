import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
import RadioButton from '../components/RadioButton';
import Dropdown from '../components/Dropdown';
import ProgressBar from '../components/ProgressBar';
import Modal from '../components/Modal';
import { Send, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Assessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    technicalSkills: [],
    strategicUnderstanding: '',
    dataLiteracy: '',
    ethicalConsiderations: [],
    preferredLearningStyle: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalSteps = 4;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Assessment Submitted:', formData);
    setIsModalOpen(true);
    // In a real app, this would send data to a backend and then navigate
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate('/dashboard'); // Navigate to dashboard or learning paths after submission
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h3 className="card-title">1. Technical Skills Assessment</h3>
            <p style={{ marginBottom: '20px' }}>
              Select the AI/tech skills you are familiar with or have experience in.
            </p>
            <div className="form-group">
              <Checkbox
                id="ml-basics"
                name="technicalSkills"
                label="Machine Learning Basics"
                value="ml-basics"
                checked={formData.technicalSkills.includes('ml-basics')}
                onChange={handleInputChange}
              />
              <Checkbox
                id="data-analysis"
                name="technicalSkills"
                label="Data Analysis & Visualization"
                value="data-analysis"
                checked={formData.technicalSkills.includes('data-analysis')}
                onChange={handleInputChange}
              />
              <Checkbox
                id="nlp"
                name="technicalSkills"
                label="Natural Language Processing (NLP)"
                value="nlp"
                checked={formData.technicalSkills.includes('nlp')}
                onChange={handleInputChange}
              />
              <Checkbox
                id="computer-vision"
                name="technicalSkills"
                label="Computer Vision"
                value="computer-vision"
                checked={formData.technicalSkills.includes('computer-vision')}
                onChange={handleInputChange}
              />
              <Checkbox
                id="cloud-ai"
                name="technicalSkills"
                label="Cloud AI Services (AWS, Azure, GCP)"
                value="cloud-ai"
                checked={formData.technicalSkills.includes('cloud-ai')}
                onChange={handleInputChange}
              />
            </div>
            <Input
              label="Any other relevant technical skills?"
              id="other-technical"
              name="otherTechnicalSkills"
              value={formData.otherTechnicalSkills || ''}
              onChange={handleInputChange}
              placeholder="e.g., Python, TensorFlow, MLOps"
            />
          </>
        );
      case 2:
        return (
          <>
            <h3 className="card-title">2. Strategic Understanding</h3>
            <p style={{ marginBottom: '20px' }}>
              How well do you understand the strategic implications of AI for your organization?
            </p>
            <div className="form-group">
              <RadioButton
                id="strategic-high"
                name="strategicUnderstanding"
                label="High: Can articulate AI's impact on business strategy and competitive advantage."
                value="high"
                checked={formData.strategicUnderstanding === 'high'}
                onChange={handleInputChange}
              />
              <RadioButton
                id="strategic-medium"
                name="strategicUnderstanding"
                label="Medium: Aware of AI's potential but need to deepen understanding of specific applications."
                value="medium"
                checked={formData.strategicUnderstanding === 'medium'}
                onChange={handleInputChange}
              />
              <RadioButton
                id="strategic-low"
                name="strategicUnderstanding"
                label="Low: Limited understanding of how AI can strategically benefit the organization."
                value="low"
                checked={formData.strategicUnderstanding === 'low'}
                onChange={handleInputChange}
              />
            </div>
            <Input
              label="What are your organization's biggest AI challenges?"
              id="org-ai-challenges"
              name="orgAiChallenges"
              value={formData.orgAiChallenges || ''}
              onChange={handleInputChange}
              placeholder="e.g., data quality, talent shortage, ethical concerns"
            />
          </>
        );
      case 3:
        return (
          <>
            <h3 className="card-title">3. Data Literacy</h3>
            <p style={{ marginBottom: '20px' }}>
              Assess your comfort level with data concepts essential for AI.
            </p>
            <div className="form-group">
              <RadioButton
                id="data-expert"
                name="dataLiteracy"
                label="Expert: Proficient in data collection, cleaning, analysis, and interpretation."
                value="expert"
                checked={formData.dataLiteracy === 'expert'}
                onChange={handleInputChange}
              />
              <RadioButton
                id="data-intermediate"
                name="dataLiteracy"
                label="Intermediate: Comfortable with basic data analysis but need to improve advanced skills."
                value="intermediate"
                checked={formData.dataLiteracy === 'intermediate'}
                onChange={handleInputChange}
              />
              <RadioButton
                id="data-beginner"
                name="dataLiteracy"
                label="Beginner: Understand basic data concepts but require significant training."
                value="beginner"
                checked={formData.dataLiteracy === 'beginner'}
                onChange={handleInputChange}
              />
            </div>
            <Input
              label="Describe your role in data-related projects:"
              id="data-role"
              name="dataRole"
              value={formData.dataRole || ''}
              onChange={handleInputChange}
              placeholder="e.g., data analyst, project manager, consumer of reports"
            />
          </>
        );
      case 4:
        return (
          <>
            <h3 className="card-title">4. Ethical AI Considerations</h3>
            <p style={{ marginBottom: '20px' }}>
              How aware are you of the ethical implications and responsible AI practices?
            </p>
            <div className="form-group">
              <Checkbox
                id="bias-fairness"
                name="ethicalConsiderations"
                label="Aware of AI bias and fairness issues"
                value="bias-fairness"
                checked={formData.ethicalConsiderations.includes('bias-fairness')}
                onChange={handleInputChange}
              />
              <Checkbox
                id="data-privacy"
                name="ethicalConsiderations"
                label="Understand data privacy regulations (e.g., GDPR, CCPA)"
                value="data-privacy"
                checked={formData.ethicalConsiderations.includes('data-privacy')}
                onChange={handleInputChange}
              />
              <Checkbox
                id="transparency-accountability"
                name="ethicalConsiderations"
                label="Familiar with AI transparency and accountability principles"
                value="transparency-accountability"
                checked={formData.ethicalConsiderations.includes('transparency-accountability')}
                onChange={handleInputChange}
              />
              <Checkbox
                id="societal-impact"
                name="ethicalConsiderations"
                label="Consider the broader societal impact of AI"
                value="societal-impact"
                checked={formData.ethicalConsiderations.includes('societal-impact')}
                onChange={handleInputChange}
              />
            </div>
            <Dropdown
              label="Preferred Learning Style"
              id="learning-style"
              name="preferredLearningStyle"
              value={formData.preferredLearningStyle}
              onChange={handleInputChange}
              options={[
                { value: '', label: 'Select one...' },
                { value: 'visual', label: 'Visual (videos, infographics)' },
                { value: 'auditory', label: 'Auditory (podcasts, lectures)' },
                { value: 'reading-writing', label: 'Reading/Writing (articles, books)' },
                { value: 'kinesthetic', label: 'Kinesthetic (hands-on projects, labs)' },
              ]}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">AI Readiness Self-Assessment</h1>
      </div>

      <Card>
        <ProgressBar progress={(currentStep / totalSteps) * 100} label={`Step ${currentStep} of ${totalSteps}`} />
        <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
          {renderStepContent()}

          <div className="form-actions">
            {currentStep > 1 && (
              <Button onClick={handleBack} variant="secondary">
                Back
              </Button>
            )}
            {currentStep < totalSteps && (
              <Button onClick={handleNext} variant="primary">
                Next
              </Button>
            )}
            {currentStep === totalSteps && (
              <Button type="submit" variant="primary">
                <Send size={18} /> Submit Assessment
              </Button>
            )}
          </div>
        </form>
      </Card>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Assessment Complete!">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <CheckCircle size={60} style={{ color: 'var(--success-color)', marginBottom: '20px' }} />
          <p style={{ fontSize: '1.1em', marginBottom: '20px' }}>
            Thank you for completing the AI Readiness Self-Assessment. Your personalized learning paths and resource recommendations are being generated.
          </p>
          <Button onClick={handleModalClose}>Go to Dashboard</Button>
        </div>
      </Modal>
    </div>
  );
}

export default Assessment;
