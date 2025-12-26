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

interface Tutor {
    user_id: string;
    bio: string;
}

export default function AdminRequestsPage() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [loading, setLoading] = useState(true);
    const [matching, setMatching] = useState<Record<string, string>>({});

    const fetchData = async () => {
        try {
            const [sRes, tRes] = await Promise.all([
                fetch('/api/sessions'),
                fetch('/api/tutors')
            ]);
            const sData = await sRes.json();
            const tData = await tRes.json();
            setSessions((sData.sessions || []).filter((s: Session) =>
                ['PENDING_MATCH', 'NEEDS_REASSIGNMENT'].includes(s.status)
            ));
            setTutors(tData.tutors || []);
        } catch (e) { } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleMatch = async (sessionId: string) => {
        const tutorId = matching[sessionId];
        if (!tutorId) return;

        await fetch(`/api/sessions/${sessionId}/action`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'MATCH', tutorId }),
        });
        fetchData();
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Admin: Handle Requests</h1>
                <Link href="/dashboard" style={{ color: '#0ea5e9', textDecoration: 'none' }}>Dashboard</Link>
            </header>

            {sessions.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#64748b' }}>No pending requests.</p>
            ) : (
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ backgroundColor: '#f8fafc' }}>
                            <tr>
                                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Subject</th>
                                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                                <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.map((s) => (
                                <tr key={s.id}>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                                        {s.subject} (Gr. {s.gradeLevel})
                                    </td>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: '#fef3c7', color: '#92400e' }}>
                                            {s.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem' }}>
                                        <select
                                            value={matching[s.id] || ''}
                                            onChange={(e) => setMatching({ ...matching, [s.id]: e.target.value })}
                                            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                                        >
                                            <option value="">Select Tutor</option>
                                            {tutors.map(t => (
                                                <option key={t.user_id} value={t.user_id}>{t.user_id}</option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={() => handleMatch(s.id)}
                                            disabled={!matching[s.id]}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: '#4f46e5',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: matching[s.id] ? 'pointer' : 'not-allowed',
                                                opacity: matching[s.id] ? 1 : 0.5
                                            }}
                                        >
                                            Match
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
