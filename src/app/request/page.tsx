'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SUBJECTS = [
    "Algebra I", "Algebra II", "Anatomy & Physiology", "AP Biology", "AP Calculus AB", "AP Calculus BC",
    "AP Chemistry", "AP Chinese Language & Culture", "AP Comparative Government & Politics", "AP Computer Science A",
    "AP Computer Science Principles", "AP English Language & Composition", "AP English Literature & Composition",
    "AP Environmental Science", "AP European History", "AP French Language & Culture", "AP German Language & Culture",
    "AP Human Geography", "AP Latin", "AP Macroeconomics", "AP Microeconomics", "AP Physics 1", "AP Physics 2",
    "AP Physics C: Electricity & Magnetism", "AP Physics C: Mechanics", "AP Psychology", "AP Spanish Language & Culture",
    "AP Spanish Literature", "AP Statistics", "AP U.S. Government & Politics", "AP U.S. History",
    "AP World History (Modern)", "Biology", "British Literature", "Chemistry", "Civics", "Computer Science A",
    "Computer Science Principles", "Conceptual Physics", "Cybersecurity", "Data Science", "Earth Science",
    "Economics", "English 9", "English 10", "English 11 (American Literature)", "English 12 (British or World Literature)",
    "Environmental Science", "Forensic Science", "French I", "French II", "French III", "French IV", "Geometry",
    "German I", "German II", "German III", "German IV", "Health", "Honors Biology", "Honors Chemistry",
    "Honors English 9", "Honors English 10", "Honors English 11", "Honors English 12", "Honors Physics",
    "Honors U.S. History", "Honors World History", "Intro to Programming", "Journalism", "Latin I", "Latin II",
    "Latin III", "Latin IV", "Linear Algebra", "Mandarin Chinese I", "Mandarin Chinese II", "Mandarin Chinese III",
    "Mandarin Chinese IV", "Multivariable Calculus", "Physical Education", "Physics", "Precalculus", "Psychology",
    "Robotics", "Sociology", "Spanish I", "Spanish II", "Spanish III", "Spanish IV", "Speech & Debate", "Statistics",
    "U.S. Government", "U.S. History", "Web Design", "Web Development", "World History"
];

const GRADES = [
    { value: 9, label: "9th Grade (Freshman)" },
    { value: 10, label: "10th Grade (Sophomore)" },
    { value: 11, label: "11th Grade (Junior)" },
    { value: 12, label: "12th Grade (Senior)" },
];

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const TIME_SLOTS = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"
];

export default function RequestTutoringPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        subject: '',
        gradeLevel: 9,
        preferredTimes: [] as string[],
    });

    // States for the Scheduler UI
    const [schedulerMonth, setSchedulerMonth] = useState(new Date().getMonth());
    const [schedulerYear, setSchedulerYear] = useState(new Date().getFullYear());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [schedulerScene, setSchedulerScene] = useState<'day' | 'time'>('day');

    const [searchQuery, setSearchQuery] = useState('');
    const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const subjectDropdownRef = useRef<HTMLDivElement>(null);

    const filteredSubjects = useMemo(() => {
        if (!searchQuery) return SUBJECTS;
        return SUBJECTS.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery]);

    // Calendar logic
    const daysInMonth = useMemo(() => {
        return new Date(schedulerYear, schedulerMonth + 1, 0).getDate();
    }, [schedulerMonth, schedulerYear]);

    const monthName = MONTHS[schedulerMonth];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (subjectDropdownRef.current && !subjectDropdownRef.current.contains(event.target as Node)) {
                setShowSubjectDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const addTimeSlot = (time: string) => {
        if (selectedDay === null) return;
        const dateString = `${monthName} ${selectedDay}, ${schedulerYear} @ ${time}`;
        if (!formData.preferredTimes.includes(dateString)) {
            setFormData({
                ...formData,
                preferredTimes: [...formData.preferredTimes, dateString]
            });
        }
        // Reset scheduler scene for next choice
        setSelectedDay(null);
        setSchedulerScene('day');
    };

    const removeTimeSlot = (slot: string) => {
        setFormData({
            ...formData,
            preferredTimes: formData.preferredTimes.filter(t => t !== slot)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.subject) {
            setError('Please select a subject');
            return;
        }
        if (formData.preferredTimes.length === 0) {
            setError('Please add at least one preferred time');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    gradeLevel: Number(formData.gradeLevel),
                }),
            });

            if (res.ok) {
                router.push('/sessions');
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to create request');
            }
        } catch (err) {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui' }}>
            <Link href="/dashboard" style={{ color: '#0ea5e9', textDecoration: 'none', marginBottom: '1rem', display: 'block' }}>
                ← Back to Dashboard
            </Link>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Request Tutoring</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Subject Selection */}
                <div style={{ position: 'relative' }} ref={subjectDropdownRef}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subject</label>
                    <div
                        onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                    >
                        <span style={{ color: formData.subject ? '#1e293b' : '#94a3b8' }}>
                            {formData.subject || 'Select a subject'}
                        </span>
                        <span style={{ fontSize: '0.75rem' }}>▼</span>
                    </div>

                    {showSubjectDropdown && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            marginTop: '0.5rem',
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            zIndex: 10,
                            maxHeight: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}>
                            <div style={{ padding: '0.75rem', borderBottom: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
                                <input
                                    type="text"
                                    placeholder="Search subjects..."
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.625rem',
                                        borderRadius: '6px',
                                        border: '1px solid #e2e8f0',
                                        outline: 'none',
                                        fontSize: '0.875rem'
                                    }}
                                />
                            </div>
                            <div style={{ overflowY: 'auto', flex: 1 }}>
                                {filteredSubjects.length > 0 ? (
                                    filteredSubjects.map(subject => (
                                        <div
                                            key={subject}
                                            onClick={() => {
                                                setFormData({ ...formData, subject });
                                                setShowSubjectDropdown(false);
                                                setSearchQuery('');
                                            }}
                                            style={{
                                                padding: '0.875rem 1rem',
                                                cursor: 'pointer',
                                                fontSize: '0.875rem',
                                                backgroundColor: formData.subject === subject ? '#f0f9ff' : 'transparent',
                                                color: formData.subject === subject ? '#0ea5e9' : '#1e293b',
                                                transition: 'background-color 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = formData.subject === subject ? '#f0f9ff' : 'transparent'}
                                        >
                                            {subject}
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
                                        No subjects found
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Grade Selection */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Grade Level</label>
                    <select
                        value={formData.gradeLevel}
                        onChange={(e) => setFormData({ ...formData, gradeLevel: Number(e.target.value) })}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: 'white',
                            fontSize: '1rem',
                            outline: 'none',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                    >
                        {GRADES.map(grade => (
                            <option key={grade.value} value={grade.value}>
                                {grade.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Preferred Times Setup */}
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '600', color: '#334155' }}>Step 1: Pick Preferred Times</label>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                            <select
                                value={schedulerMonth}
                                onChange={(e) => {
                                    setSchedulerMonth(Number(e.target.value));
                                    setSelectedDay(null);
                                    setSchedulerScene('day');
                                }}
                                style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            >
                                {MONTHS.map((m, i) => (
                                    <option key={m} value={i}>{m}</option>
                                ))}
                            </select>
                            <select
                                value={schedulerYear}
                                onChange={(e) => setSchedulerYear(Number(e.target.value))}
                                style={{ width: '100px', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            >
                                {[2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>

                        <div style={{ position: 'relative', minHeight: '180px' }}>
                            {schedulerScene === 'day' ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                                        <div
                                            key={day}
                                            onClick={() => {
                                                setSelectedDay(day);
                                                setSchedulerScene('time');
                                            }}
                                            style={{
                                                padding: '8px',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                borderRadius: '4px',
                                                backgroundColor: selectedDay === day ? '#4f46e5' : 'white',
                                                color: selectedDay === day ? 'white' : '#1e293b',
                                                border: '1px solid #e2e8f0',
                                                fontSize: '0.875rem'
                                            }}
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ animation: 'fadeIn 0.2s' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Pick time for {monthName} {selectedDay}:</span>
                                        <button
                                            type="button"
                                            onClick={() => setSchedulerScene('day')}
                                            style={{ background: 'none', border: 'none', color: '#4f46e5', cursor: 'pointer', fontSize: '0.875rem' }}
                                        >
                                            ← Back to Days
                                        </button>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                        {TIME_SLOTS.map(time => (
                                            <div
                                                key={time}
                                                onClick={() => addTimeSlot(time)}
                                                style={{
                                                    padding: '8px',
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                    borderRadius: '6px',
                                                    border: '1px solid #4f46e5',
                                                    color: '#4f46e5',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {time}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 'bold', display: 'block', marginBottom: '0.75rem' }}>Added Intervals:</span>
                        {formData.preferredTimes.length === 0 ? (
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' }}>No times added yet. Choose a day and time above.</p>
                        ) : (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {formData.preferredTimes.map(slot => (
                                    <div key={slot} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        backgroundColor: '#eef2ff',
                                        color: '#4f46e5',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        border: '1px solid #c7d2fe'
                                    }}>
                                        {slot}
                                        <button
                                            type="button"
                                            onClick={() => removeTimeSlot(slot)}
                                            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', fontWeight: 'bold' }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '1.25rem',
                        background: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.4)'
                    }}
                >
                    {loading ? 'Submitting...' : 'Submit Tutoring Request'}
                </button>

                {error && (
                    <p style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '1rem', borderRadius: '8px', border: '1px solid #fee2e2', textAlign: 'center', fontSize: '0.875rem' }}>
                        {error}
                    </p>
                )}
            </form>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
