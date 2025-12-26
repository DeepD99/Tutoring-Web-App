import { readSessionCookie } from '@/lib/auth/session';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default async function DashboardPage() {
    const session = await readSessionCookie();

    if (!session) return null; // Middleware should handle this

    const isParentOrStudent = ['parent', 'student'].includes(session.role);
    const isAdmin = session.role === 'admin';

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Dashboard</h1>
                <LogoutButton />
            </header>

            <section style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Session Info</h2>
                <p><strong>Role:</strong> {session.role}</p>
                <p><strong>User ID:</strong> <code style={{ background: '#e2e8f0', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>{session.userId}</code></p>
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {isParentOrStudent && (
                    <div style={{ padding: '1.5rem', borderRadius: '8px', border: '1px solid #bae6fd', background: '#f0f9ff' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#0369a1' }}>Learning</h3>
                        <Link href="/request" style={{ display: 'block', padding: '0.75rem', background: '#0ea5e9', color: 'white', borderRadius: '6px', textAlign: 'center', textDecoration: 'none', marginBottom: '0.5rem' }}>
                            Request Tutor
                        </Link>
                    </div>
                )}

                <div style={{ padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#ffffff' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Management</h3>
                    <Link href="/sessions" style={{ display: 'block', padding: '0.75rem', background: '#64748b', color: 'white', borderRadius: '6px', textAlign: 'center', textDecoration: 'none' }}>
                        View Sessions
                    </Link>
                </div>

                {session.role === 'tutor' && (
                    <div style={{ padding: '1.5rem', borderRadius: '8px', border: '1px solid #bae6fd', background: '#f0f9ff' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#0369a1' }}>Tutor Actions</h2>
                        <Link href="/tutor/profile" style={{ display: 'block', padding: '0.75rem', background: '#0ea5e9', color: 'white', borderRadius: '6px', textAlign: 'center', textDecoration: 'none' }}>
                            Manage Profile
                        </Link>
                    </div>
                )}

                {isAdmin && (
                    <div style={{ padding: '1.5rem', borderRadius: '8px', border: '1px solid #fecaca', background: '#fef2f2' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#991b1b' }}>Administration</h3>
                        <Link href="/requests" style={{ display: 'block', padding: '0.75rem', background: '#ef4444', color: 'white', borderRadius: '6px', textAlign: 'center', textDecoration: 'none' }}>
                            Handle Requests
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}
