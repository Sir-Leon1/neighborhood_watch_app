import React, { useState } from 'react';
import { AlertTriangle, Send } from 'lucide-react';

const IncidentReportPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Here you would typically send the data to your backend API
    // For this example, we'll simulate an API call with a timeout
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitMessage('Incident reported successfully!');
      setTitle('');
      setDescription('');
      setLocation('');
    } catch (error) {
      setSubmitMessage('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="incident-report-page">
      <h1>Report an Incident</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Brief title of the incident"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Detailed description of what happened"
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="Where did this incident occur?"
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
          {!isSubmitting && <Send size={16} className="icon" />}
        </button>
      </form>
      {submitMessage && (
        <div className={`submit-message ${submitMessage.includes('successfully') ? 'success' : 'error'}`}>
          {submitMessage.includes('successfully') ? <AlertTriangle size={20} /> : null}
          {submitMessage}
        </div>
      )}
      <style jsx>{`
        .incident-report-page {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        h1 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        label {
          font-weight: bold;
          color: #555;
        }
        input, textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }
        textarea {
          resize: vertical;
        }
        button {
          padding: 10px 20px;
          background-color: #3B82F6;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        button:hover:not(:disabled) {
          background-color: #2563EB;
        }
        button:disabled {
          background-color: #9CA3AF;
          cursor: not-allowed;
        }
        .icon {
          margin-left: 5px;
        }
        .submit-message {
          margin-top: 20px;
          padding: 10px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .submit-message.success {
          background-color: #D1FAE5;
          color: #065F46;
        }
        .submit-message.error {
          background-color: #FEE2E2;
          color: #991B1B;
        }
        @media (max-width: 600px) {
          .incident-report-page {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default IncidentReportPage;