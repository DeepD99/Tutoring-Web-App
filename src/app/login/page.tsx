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
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 font-sans p-6 text-slate-900">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
                <h1 className="text-3xl font-bold mb-8 text-center text-slate-800">Welcome</h1>
                <p className="text-slate-500 text-center mb-8">Choose your role to log in</p>

                <div className="space-y-4">
                    <button
                        onClick={() => handleLogin('tutor')}
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-indigo-100"
                    >
                        Login as Tutor
                    </button>
                    <button
                        onClick={() => handleLogin('parent')}
                        className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-100 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Login as Parent
                    </button>
                    <button
                        onClick={() => handleLogin('student')}
                        className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-100 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Login as Student
                    </button>
                </div>
            </div>
        </div>
    );
}
