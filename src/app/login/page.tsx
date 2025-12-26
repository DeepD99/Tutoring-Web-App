'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = async (role: string) => {
        const res = await fetch('/api/auth/mock-login', {
            method: 'POST',
            body: JSON.stringify({ role }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            router.push('/dashboard');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8fafc', padding: '1.5rem', color: '#1e293b', fontFamily: 'system-ui' }}>
            <div style={{ width: '100%', maxWidth: '400px', padding: '2rem', backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', border: '1px solid #f1f5f9' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center', color: '#0f172a' }}>Welcome</h1>
                <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '2rem' }}>Choose your role to log in</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button
                        onClick={() => handleLogin('tutor')}
                        style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: '#4f46e5', color: '#ffffff', borderRadius: '0.75rem', border: 'none', fontWeight: '500', cursor: 'pointer' }}
                    >
                        Login as Tutor
                    </button>
                    <button
                        onClick={() => handleLogin('parent')}
                        style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: '#ffffff', color: '#334155', border: '1px solid #e2e8f0', borderRadius: '0.75rem', fontWeight: '500', cursor: 'pointer' }}
                    >
                        Login as Parent
                    </button>
                    <button
                        onClick={() => handleLogin('student')}
                        style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: '#ffffff', color: '#334155', border: '1px solid #e2e8f0', borderRadius: '0.75rem', fontWeight: '500', cursor: 'pointer' }}
                    >
                        Login as Student
                    </button>
                    <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '0.5rem 0' }} />
                    <button
                        onClick={() => handleLogin('admin')}
                        style={{ width: '100%', padding: '0.75rem 1rem', backgroundColor: '#ef4444', color: '#ffffff', borderRadius: '0.75rem', border: 'none', fontWeight: '500', cursor: 'pointer' }}
                    >
                        Login as Admin
                    </button>
                </div>
            </div>
        </div>
    );
}
