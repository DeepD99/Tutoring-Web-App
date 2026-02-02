'use client';

import { useEffect, useState } from 'react';
import './dashboard.css';

interface Student {
  name: string;
  sport: string;
  gradeLevel: number;
  gpa: number;
}

interface Grade {
  subject: string;
  grade: string;
  status: 'improving' | 'stable' | 'declining';
  previousGrade?: string;
}

interface Session {
  id: string;
  time: string;
  subject: string;
  tutor: string;
  isToday: boolean;
  badge: string;
}

interface Homework {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  isUrgent: boolean;
}

export default function StudentDashboard() {
  const [student, setStudent] = useState<Student>({
    name: 'Marcus',
    sport: 'Football',
    gradeLevel: 11,
    gpa: 3.2
  });

  const [grades, setGrades] = useState<Grade[]>([
    { subject: 'Mathematics', grade: 'B', status: 'improving', previousGrade: 'C+' },
    { subject: 'English', grade: 'B', status: 'improving', previousGrade: 'C+' },
    { subject: 'Science', grade: 'A-', status: 'stable' },
    { subject: 'History', grade: 'B+', status: 'stable' }
  ]);

  const [sessions, setSessions] = useState<Session[]>([
    { id: '1', time: 'TODAY 4:00 PM', subject: 'Mathematics', tutor: 'Mr. Johnson', isToday: true, badge: 'Today' },
    { id: '2', time: 'TOMORROW 3:30 PM', subject: 'English', tutor: 'Ms. Smith', isToday: false, badge: 'Tomorrow' },
    { id: '3', time: 'WED 4:00 PM', subject: 'Mathematics', tutor: 'Mr. Johnson', isToday: false, badge: 'Wed' },
    { id: '4', time: 'FRI 3:00 PM', subject: 'English', tutor: 'Ms. Smith', isToday: false, badge: 'Fri' }
  ]);

  const [homework, setHomework] = useState<Homework[]>([
    { id: '1', subject: 'MATH', title: 'Practice problems 1-15', dueDate: 'Due before session', isUrgent: true },
    { id: '2', subject: 'ENGLISH', title: 'Essay outline - College Application', dueDate: 'Due Thursday', isUrgent: false },
    { id: '3', subject: 'HISTORY', title: 'Chapter 5 reading notes', dueDate: 'Due Friday', isUrgent: false }
  ]);

  const [stats, setStats] = useState({
    gpa: 3.2,
    sessions: '8/8',
    homework: 85,
    gradesImproved: 2
  });

  const getGradeColor = (grade: string): string => {
    if (grade.startsWith('A')) return 'grade-good';
    if (grade.startsWith('B')) return 'grade-warn';
    return 'grade-alert';
  };

  const getTrendIcon = (status: string): string => {
    if (status === 'improving') return '↑';
    if (status === 'declining') return '↓';
    return '→';
  };

  const getTrendClass = (status: string): string => {
    if (status === 'improving') return 'trend-up';
    if (status === 'declining') return 'trend-down';
    return 'trend-stable';
  };

  const handleHomeworkComplete = (id: string) => {
    setHomework(homework.map(hw => 
      hw.id === id ? { ...hw, isUrgent: false } : hw
    ));
  };

  const getCurrentDate = (): string => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
        <h1 className="welcome-text">Welcome back, {student.name}!</h1>
        <div className="student-meta">
          <span className="sport-badge">⚡ {student.sport}</span>
          <span>Grade {student.gradeLevel}</span>
          <span>•</span>
          <span>{getCurrentDate()}</span>
        </div>
      </header>

      {/* Quick Stats */}
      <section className="quick-stats">
        <div className="stat-card">
          <div className="stat-label">Current GPA</div>
          <div className="stat-value">
            {stats.gpa}
            <span className="stat-trend trend-up">↑</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Sessions This Month</div>
          <div className="stat-value">{stats.sessions}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Homework Completion</div>
          <div className="stat-value">{stats.homework}%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Grades Improved</div>
          <div className="stat-value">
            {stats.gradesImproved}
            <span className="stat-trend trend-up">↑</span>
          </div>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Left Column: Grades & Sessions */}
        <div className="dashboard-left">
          {/* Current Grades */}
          <section className="section-card" style={{ marginBottom: '2rem' }}>
            <div className="section-header">
              <h2 className="section-title">Current Grades</h2>
              <a href="#" className="section-action">View All →</a>
            </div>
            <div className="grades-grid">
              {grades.map((grade, index) => (
                <div key={index} className="grade-card">
                  <div className="subject-name">{grade.subject}</div>
                  <div className="grade-display">
                    <div className={`grade-letter ${getGradeColor(grade.grade)}`}>
                      {grade.grade}
                    </div>
                    <div className={`grade-trend-indicator ${getTrendClass(grade.status)}`}>
                      {getTrendIcon(grade.status)}
                    </div>
                  </div>
                  <div className="grade-status">
                    <span className={`status-icon status-${grade.status}`}></span>
                    <span>
                      {grade.status === 'improving' && grade.previousGrade 
                        ? `Improved from ${grade.previousGrade}` 
                        : grade.status === 'stable' 
                        ? 'Stable' 
                        : 'On track'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Sessions */}
          <section className="section-card">
            <div className="section-header">
              <h2 className="section-title">Tutoring Sessions</h2>
              <a href="#" className="section-action">Request More →</a>
            </div>
            <div className="sessions-timeline">
              {sessions.map((session) => (
                <div 
                  key={session.id} 
                  className={`session-item ${session.isToday ? 'session-today' : ''}`}
                >
                  <div className="session-time">{session.time}</div>
                  <div className="session-details">
                    <div>
                      <div className="session-subject">{session.subject}</div>
                      <div className="session-tutor">with {session.tutor}</div>
                    </div>
                    <span className={`session-badge ${session.isToday ? 'badge-today' : 'badge-upcoming'}`}>
                      {session.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Homework */}
        <div className="dashboard-right">
          <section className="section-card">
            <div className="section-header">
              <h2 className="section-title">Homework Due</h2>
            </div>
            <div className="homework-list">
              {homework.map((hw) => (
                <div key={hw.id} className="homework-item">
                  <div className="homework-header">
                    <span className="homework-subject">{hw.subject}</span>
                    <span className={`homework-due ${hw.isUrgent ? 'urgent' : ''}`}>
                      {hw.dueDate}
                    </span>
                  </div>
                  <div className="homework-title">{hw.title}</div>
                  <div className="homework-actions">
                    <button 
                      className="hw-btn hw-btn-complete"
                      onClick={() => handleHomeworkComplete(hw.id)}
                    >
                      Mark Complete
                    </button>
                    <button className="hw-btn hw-btn-view">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Floating Help Button */}
      <button className="help-button">Need Help? 💬</button>
    </div>
  );
}
