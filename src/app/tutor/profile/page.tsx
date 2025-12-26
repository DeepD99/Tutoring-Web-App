'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TutorProfile {
    bio: string;
    hourly_rate: number;
    experience_years: number;
    timezone: string;
    toggle_active: boolean;
}

export default function TutorProfilePage() {
    const [profile, setProfile] = useState<TutorProfile>({
        bio: '',
        hourly_rate: 0,
        experience_years: 0,
        timezone: 'UTC',
        toggle_active: true,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/tutor/profile')
            .then((res) => res.json())
            .then((data) => {
                if (data.profile) {
                    setProfile(data.profile);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        try {
            const res = await fetch('/api/tutor/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile),
            });

            if (res.ok) {
                setMessage('Profile updated successfully!');
            } else {
                const error = await res.json();
                setMessage(`Error: ${error.message || 'Failed to save'}`);
            }
        } catch (err) {
            setMessage('Network error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui' }}>
            <Link href="/dashboard" style={{ color: '#0ea5e9', textDecoration: 'none', marginBottom: '1rem', display: 'block' }}>
                ← Back to Dashboard
            </Link>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Tutor Profile</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Bio</label>
                    <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0', minHeight: '100px' }}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Hourly Rate ($)</label>
                        <input
                            type="number"
                            value={profile.hourly_rate}
                            onChange={(e) => setProfile({ ...profile, hourly_rate: Number(e.target.value) })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Experience (Years)</label>
                        <input
                            type="number"
                            value={profile.experience_years}
                            onChange={(e) => setProfile({ ...profile, experience_years: Number(e.target.value) })}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                        />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Timezone</label>
                    <input
                        type="text"
                        value={profile.timezone}
                        onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                        type="checkbox"
                        checked={profile.toggle_active}
                        onChange={(e) => setProfile({ ...profile, toggle_active: e.target.checked })}
                        id="active"
                    />
                    <label htmlFor="active" style={{ fontWeight: '500' }}>Active for Tutoring</label>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    style={{
                        padding: '1rem',
                        background: '#0ea5e9',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: saving ? 'not-allowed' : 'pointer',
                        opacity: saving ? 0.7 : 1
                    }}
                >
                    {saving ? 'Saving...' : 'Save Profile'}
                </button>

                {message && (
                    <p style={{
                        padding: '1rem',
                        borderRadius: '6px',
                        backgroundColor: message.includes('Error') ? '#fef2f2' : '#f0fdf4',
                        color: message.includes('Error') ? '#991b1b' : '#166534',
                        border: `1px solid ${message.includes('Error') ? '#fecaca' : '#bbf7d0'}`
                    }}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}
