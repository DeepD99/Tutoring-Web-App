import { readSessionCookie } from '@/lib/auth/session';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';

export default async function DashboardPage() {
    const session = await readSessionCookie();

    if (!session) return null; // Middleware should handle this

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

            {session.role === 'tutor' && (
                <section style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#0369a1' }}>Tutor Actions</h2>
                    <Link href="/tutor/profile" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: '#0ea5e9', color: 'white', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none' }}>
                        Manage Tutor Profile
                    </Link>
                </section>
            )}
        </div>
    );
}
