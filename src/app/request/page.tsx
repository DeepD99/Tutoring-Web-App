'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RequestTutoringPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        subject: '',
        gradeLevel: 1,
        preferredTimes: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subject</label>
                    <input
                        required
                        type="text"
                        placeholder="e.g. Mathematics"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Grade Level</label>
                    <input
                        required
                        type="number"
                        min="1"
                        max="12"
                        value={formData.gradeLevel}
                        onChange={(e) => setFormData({ ...formData, gradeLevel: Number(e.target.value) })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                    />
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
