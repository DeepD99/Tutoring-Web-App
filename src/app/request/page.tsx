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

export default function RequestTutoringPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        subject: '',
        gradeLevel: 9,
        preferredTimes: '',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const subjectDropdownRef = useRef<HTMLDivElement>(null);

    const filteredSubjects = useMemo(() => {
        if (!searchQuery) return SUBJECTS;
        return SUBJECTS.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (subjectDropdownRef.current && !subjectDropdownRef.current.contains(event.target as Node)) {
                setShowSubjectDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.subject) {
            setError('Please select a subject');
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
                    preferredTimes: formData.preferredTimes.split(',').map(t => t.trim()).filter(Boolean),
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
        <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto', fontFamily: 'system-ui' }}>
            <Link href="/dashboard" style={{ color: '#0ea5e9', textDecoration: 'none', marginBottom: '1rem', display: 'block' }}>
                ← Back to Dashboard
            </Link>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Request Tutoring</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ position: 'relative' }} ref={subjectDropdownRef}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subject</label>
                    <div
                        onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
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
                            borderRadius: '8px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            zIndex: 10,
                            maxHeight: '300px',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ padding: '0.5rem', borderBottom: '1px solid #f1f5f9' }}>
                                <input
                                    type="text"
                                    placeholder="Search subjects..."
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        borderRadius: '4px',
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
                                                padding: '0.75rem',
                                                cursor: 'pointer',
                                                fontSize: '0.875rem',
                                                backgroundColor: formData.subject === subject ? '#f0f9ff' : 'transparent',
                                                color: formData.subject === subject ? '#0ea5e9' : '#1e293b',
                                                borderBottom: '1px solid #f8fafc'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = formData.subject === subject ? '#f0f9ff' : 'transparent'}
                                        >
                                            {subject}
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: '1rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
                                        No subjects found
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Grade Level</label>
                    <select
                        value={formData.gradeLevel}
                        onChange={(e) => setFormData({ ...formData, gradeLevel: Number(e.target.value) })}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: 'white',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    >
                        {GRADES.map(grade => (
                            <option key={grade.value} value={grade.value}>
                                {grade.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Preferred Times (comma separated)</label>
                    <input
                        required
                        type="text"
                        placeholder="Mon 4pm, Wed 5pm"
                        value={formData.preferredTimes}
                        onChange={(e) => setFormData({ ...formData, preferredTimes: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '1rem',
                        background: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Submitting...' : 'Submit Request'}
                </button>

                {error && (
                    <p style={{ color: '#ef4444', backgroundColor: '#fef2f2', padding: '0.75rem', borderRadius: '6px', textAlign: 'center' }}>
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}
