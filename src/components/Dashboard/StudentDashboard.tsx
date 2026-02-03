'use client';

import { useState } from 'react';
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

interface SessionSlot {
  time: string;
  subject: string;
  tutor: string;
}

interface DayColumn {
  dayInitial: string;
  date: number;
  isToday: boolean;
  sessions: SessionSlot[];
}

interface Homework {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  isUrgent: boolean;
}

export default function StudentDashboard() {
  const [student] = useState<Student>({
    name: 'Marcus',
    sport: 'Football',
    gradeLevel: 11,
    gpa: 3.2
  });

  const [grades] = useState<Grade[]>([
    { subject: 'Mathematics', grade: 'B', status: 'improving', previousGrade: 'C+' },
    { subject: 'English', grade: 'B', status: 'improving', previousGrade: 'C+' },
    { subject: 'Science', grade: 'A-', status: 'stable' },
    { subject: 'History', grade: 'B+', status: 'stable' }
  ]);

  const [weekDays] = useState<DayColumn[]>(() => {
    const today = new Date();
    const dow = today.getDay();
    const mondayOffset = dow === 0 ? -6 : 1 - dow;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    const initials = ['M', 'T', 'W', 'T', 'F'];
    const sessionData: Record<number, SessionSlot[]> = {
      0: [{ time: '4:00 PM', subject: 'Mathematics', tutor: 'Mr. Johnson' }],
      1: [{ time: '3:30 PM', subject: 'English', tutor: 'Ms. Smith' }],
      2: [{ time: '4:00 PM', subject: 'Mathematics', tutor: 'Mr. Johnson' }],
      3: [],
      4: [{ time: '3:00 PM', subject: 'English', tutor: 'Ms. Smith' }],
    };

    return initials.map((initial, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return {
        dayInitial: initial,
        date: d.getDate(),
        isToday: d.toDateString() === today.toDateString(),
        sessions: sessionData[i] || [],
      };
    });
  });

  const [expandedDay, setExpandedDay] = useState<number | null>(() => {
    const dow = new Date().getDay();
    return dow >= 1 && dow <= 5 ? dow - 1 : 0;
  });

  const [homework, setHomework] = useState<Homework[]>([
    { id: '1', subject: 'MATH', title: 'Practice problems 1-15', dueDate: 'Due before session', isUrgent: true },
    { id: '2', subject: 'ENGLISH', title: 'Essay outline - College Application', dueDate: 'Due Thursday', isUrgent: false },
    { id: '3', subject: 'HISTORY', title: 'Chapter 5 reading notes', dueDate: 'Due Friday', isUrgent: false }
  ]);

  const [stats] = useState({
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

      {/* Weekly Sessions */}
      <section className="section-card week-sessions">
        <div className="section-header">
          <h2 className="section-title">Tutoring Sessions</h2>
          <a href="/request" className="section-action">Request More →</a>
        </div>
        <div className="week-columns">
          {weekDays.map((day, i) => (
            <div
              key={i}
              className={`week-day ${day.isToday ? 'week-day-today' : ''} ${expandedDay === i ? 'week-day-expanded' : ''} ${day.sessions.length === 0 ? 'week-day-empty' : ''}`}
              onClick={() => setExpandedDay(expandedDay === i ? null : i)}
            >
              <div className="week-day-header">
                <span className="week-day-initial">{day.dayInitial}</span>
                <span className="week-day-date">{day.date}</span>
                {day.sessions.length > 0 && <span className="week-day-dot" />}
              </div>
              {expandedDay === i && (
                <div className="week-day-detail">
                  {day.sessions.length > 0 ? (
                    day.sessions.map((s, j) => (
                      <div key={j} className="week-session-slot">
                        <div className="week-session-time">{s.time}</div>
                        <div className="week-session-subject">{s.subject}</div>
                        <div className="week-session-tutor">{s.tutor}</div>
                      </div>
                    ))
                  ) : (
                    <div className="week-session-empty">No sessions</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Left Column: Grades */}
        <div className="dashboard-left">
          <section className="section-card">
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
