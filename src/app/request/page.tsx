'use client';

import { useState } from 'react';
import './request.css';

const SUBJECTS = [
  { category: 'Math', items: ['Algebra I', 'Algebra II', 'Geometry', 'Precalculus', 'AP Calculus AB', 'AP Calculus BC', 'AP Statistics'] },
  { category: 'English', items: ['English 9', 'English 10', 'English 11', 'AP English Language', 'AP English Literature'] },
  { category: 'Science', items: ['Biology', 'Chemistry', 'Physics', 'AP Biology', 'AP Chemistry', 'AP Physics'] },
  { category: 'Social Studies', items: ['US History', 'World History', 'AP US History', 'AP World History', 'AP Government'] },
];

const TIME_SLOTS = [
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

interface FormState {
  subject: string;
  selectedDays: string[];
  selectedTime: string;
  sessionType: 'online' | 'in-person';
  notes: string;
}

export default function RequestPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    subject: '',
    selectedDays: [],
    selectedTime: '',
    sessionType: 'online',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleDay = (day: string) => {
    setForm(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter(d => d !== day)
        : [...prev.selectedDays, day],
    }));
  };

  const canAdvance = (): boolean => {
    if (step === 1) return form.subject !== '';
    if (step === 2) return form.selectedDays.length > 0 && form.selectedTime !== '';
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="request-container">
        <div className="request-success">
          <div className="success-icon">✓</div>
          <h1 className="success-title">Request Submitted!</h1>
          <p className="success-text">
            We&apos;ll match you with the best available tutor for <strong>{form.subject}</strong>.
            You&apos;ll receive a confirmation once a tutor accepts.
          </p>
          <div className="success-summary">
            <div className="summary-row">
              <span className="summary-label">Subject</span>
              <span className="summary-value">{form.subject}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Days</span>
              <span className="summary-value">{form.selectedDays.join(', ')}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Time</span>
              <span className="summary-value">{form.selectedTime}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Format</span>
              <span className="summary-value">{form.sessionType === 'online' ? 'Online' : 'In-Person'}</span>
            </div>
          </div>
          <a href="/dashboard" className="success-btn">Back to Dashboard</a>
        </div>
      </div>
    );
  }

  return (
    <div className="request-container">
      <header className="request-header">
        <a href="/dashboard" className="back-link">← Dashboard</a>
        <h1 className="request-title">Book a Tutor</h1>
        <p className="request-subtitle">Find the help you need, when you need it</p>
      </header>

      {/* Progress Bar */}
      <div className="progress-bar">
        {[1, 2, 3].map(s => (
          <div key={s} className="progress-step-wrapper">
            <div
              className={`progress-step ${step >= s ? 'progress-active' : ''} ${step > s ? 'progress-done' : ''}`}
              onClick={() => s < step && setStep(s)}
            >
              {step > s ? '✓' : s}
            </div>
            <span className="progress-label">
              {s === 1 ? 'Subject' : s === 2 ? 'Schedule' : 'Details'}
            </span>
          </div>
        ))}
        <div className="progress-line">
          <div className="progress-fill" style={{ width: `${((step - 1) / 2) * 100}%` }} />
        </div>
      </div>

      {/* Step 1: Subject */}
      {step === 1 && (
        <div className="step-content">
          <h2 className="step-heading">What subject do you need help with?</h2>
          <div className="subject-categories">
            {SUBJECTS.map(cat => (
              <div key={cat.category} className="subject-group">
                <h3 className="subject-group-title">{cat.category}</h3>
                <div className="subject-chips">
                  {cat.items.map(item => (
                    <button
                      key={item}
                      className={`subject-chip ${form.subject === item ? 'chip-selected' : ''}`}
                      onClick={() => setForm(prev => ({ ...prev, subject: item }))}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Schedule */}
      {step === 2 && (
        <div className="step-content">
          <h2 className="step-heading">When works best for you?</h2>

          <div className="schedule-section">
            <h3 className="schedule-label">Preferred Days</h3>
            <div className="day-picker">
              {DAYS.map(day => (
                <button
                  key={day}
                  className={`day-btn ${form.selectedDays.includes(day) ? 'day-selected' : ''}`}
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="schedule-section">
            <h3 className="schedule-label">Preferred Time</h3>
            <div className="time-grid">
              {TIME_SLOTS.map(time => (
                <button
                  key={time}
                  className={`time-btn ${form.selectedTime === time ? 'time-selected' : ''}`}
                  onClick={() => setForm(prev => ({ ...prev, selectedTime: time }))}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 3 && (
        <div className="step-content">
          <h2 className="step-heading">Almost there! A few more details.</h2>

          <div className="detail-section">
            <h3 className="schedule-label">Session Format</h3>
            <div className="format-toggle">
              <button
                className={`format-btn ${form.sessionType === 'online' ? 'format-active' : ''}`}
                onClick={() => setForm(prev => ({ ...prev, sessionType: 'online' }))}
              >
                <span className="format-icon">💻</span>
                <span className="format-text">Online</span>
                <span className="format-desc">Video call via Zoom</span>
              </button>
              <button
                className={`format-btn ${form.sessionType === 'in-person' ? 'format-active' : ''}`}
                onClick={() => setForm(prev => ({ ...prev, sessionType: 'in-person' }))}
              >
                <span className="format-icon">📍</span>
                <span className="format-text">In-Person</span>
                <span className="format-desc">Meet at a location</span>
              </button>
            </div>
          </div>

          <div className="detail-section">
            <h3 className="schedule-label">Additional Notes <span className="optional-tag">Optional</span></h3>
            <textarea
              className="notes-input"
              placeholder="What topics are you struggling with? Any specific help needed?"
              rows={4}
              value={form.notes}
              onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
            />
          </div>

          {/* Review Summary */}
          <div className="review-card">
            <h3 className="review-title">Review Your Request</h3>
            <div className="review-grid">
              <div className="review-item">
                <span className="review-label">Subject</span>
                <span className="review-value">{form.subject}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Days</span>
                <span className="review-value">{form.selectedDays.join(', ')}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Time</span>
                <span className="review-value">{form.selectedTime}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Format</span>
                <span className="review-value">{form.sessionType === 'online' ? 'Online' : 'In-Person'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="step-nav">
        {step > 1 && (
          <button className="nav-btn nav-back" onClick={() => setStep(step - 1)}>
            ← Back
          </button>
        )}
        <div className="nav-spacer" />
        {step < 3 ? (
          <button
            className="nav-btn nav-next"
            disabled={!canAdvance()}
            onClick={() => setStep(step + 1)}
          >
            Continue →
          </button>
        ) : (
          <button className="nav-btn nav-submit" onClick={handleSubmit}>
            Submit Request
          </button>
        )}
      </div>
    </div>
  );
}
