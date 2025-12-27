'use client';

import { useState } from 'react';

export default function ClearSessionsButton() {
    const [loading, setLoading] = useState(false);

    const handleClear = async () => {
        if (!confirm('Are you sure you want to CLEAR ALL sessions? This cannot be undone.')) return;

        setLoading(true);
        try {
            const res = await fetch('/api/debug/clear-sessions', { method: 'POST' });
            if (res.ok) {
                alert('All sessions cleared successfully.');
                window.location.reload();
            } else {
                alert('Failed to clear sessions.');
            }
        } catch (e) {
            alert('Error clearing sessions.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleClear}
            disabled={loading}
            style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
            }}
        >
            {loading ? 'Clearing...' : '🗑️ Clear All Sessions (Debug)'}
        </button>
    );
}
