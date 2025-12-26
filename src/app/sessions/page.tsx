'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Session {
    id: string;
    subject: string;
    status: string;
    tutor_id: string | null;
    gradeLevel: number;
}

export default function SessionsPage() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchSessions = async () => {
        try {
            const res = await fetch('/api/sessions');
            const data = await res.json();
            setSessions(data.sessions || []);
        } catch (e) {
            console.error('Failed to fetch sessions');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSessions();
        fetch('/api/auth/session')
            .then(r => r.json())
            .then(d => setRole(d.role || ''))
            .catch(() => { });
    }, []);

    const handleAction = async (id: string, action: string) => {
        const res = await fetch(`/api/sessions/${id}/action`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action }),
        });
        if (res.ok) {
            fetchSessions();
        } else {
            const err = await res.json();
            alert(`Error: ${err.error}`);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Your Sessions</h1>
                <Link href="/dashboard" style={{ color: '#0ea5e9', textDecoration: 'none' }}>Dashboard</Link>
            </header>

            {sessions.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#64748b' }}>No sessions found.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {sessions.map((s) => (
                        <div key={s.id} style={{
                            padding: '1.25rem',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h3 style={{ fontWeight: '600' }}>{s.subject} (Grade {s.gradeLevel})</h3>
                                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                    Status: <span style={{
                                        color: s.status === 'CONFIRMED' ? '#166534' :
                                            s.status === 'DECLINED' ? '#ef4444' : '#1e293b',
                                        fontWeight: '600'
                                    }}>{s.status}</span>
                                </p>
                                {s.tutor_id && <p style={{ fontSize: '0.875rem' }}>Tutor: <code style={{ background: '#f1f5f9', padding: '1px 4px', borderRadius: '3px' }}>{s.tutor_id}</code></p>}
                            </div>

                            {(role === 'parent' || role === 'student') && s.status === 'PENDING_PARENT_APPROVAL' && (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => handleAction(s.id, 'APPROVE')} style={{ padding: '0.5rem 0.75rem', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem' }}>Approve</button>
                                    <button onClick={() => handleAction(s.id, 'DECLINE')} style={{ padding: '0.5rem 0.75rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem' }}>Decline</button>
                                    <button onClick={() => handleAction(s.id, 'REQUEST_NEW_TUTOR')} style={{ padding: '0.5rem 0.75rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem' }}>New Tutor</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
