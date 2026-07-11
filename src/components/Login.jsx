import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Check if already logged in
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('dashboard_auth');
        if (isLoggedIn) {
            router.push('/dashboard');
        }
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // 1. Check Firestore database users
            const usersRef = collection(db, 'dashboard_users');
            const q = query(usersRef, where('email', '==', email), where('password', '==', password));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0].data();
                sessionStorage.setItem('dashboard_auth', 'true');
                sessionStorage.setItem('dashboard_role', userDoc.role || 'Editor');
                sessionStorage.setItem('dashboard_user_email', email);
                router.push('/dashboard');
                setIsLoading(false);
                return;
            }

            // 2. Fallback to localStorage / default admin credentials
            const storedEmail = localStorage.getItem('dashboard_email') || 'admin@gmail.com';
            const storedPassword = localStorage.getItem('dashboard_password') || 'admin123';

            if (email === storedEmail && password === storedPassword) {
                sessionStorage.setItem('dashboard_auth', 'true');
                sessionStorage.setItem('dashboard_role', 'Super Admin');
                sessionStorage.setItem('dashboard_user_email', email);
                router.push('/dashboard');
            } else {
                setError('Incorrect email or password. Please try again.');
            }
        } catch (err) {
            console.error("Firestore auth query error, falling back to local credentials:", err);
            const storedEmail = localStorage.getItem('dashboard_email') || 'admin@gmail.com';
            const storedPassword = localStorage.getItem('dashboard_password') || 'admin123';

            if (email === storedEmail && password === storedPassword) {
                sessionStorage.setItem('dashboard_auth', 'true');
                sessionStorage.setItem('dashboard_role', 'Super Admin');
                sessionStorage.setItem('dashboard_user_email', email);
                router.push('/dashboard');
            } else {
                setError('Incorrect email or password. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            {/* Animated background orbs */}
            <div className="login-bg">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
                <div className="grid-overlay"></div>
            </div>

            <div className="login-container">
                <div className="login-card">
                    {/* Logo / Brand */}
                    <div className="login-brand">
                        <div className="brand-icon">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M16 2L29 8.5V23.5L16 30L3 23.5V8.5L16 2Z" fill="url(#brandGrad)" />
                                <defs>
                                    <linearGradient id="brandGrad" x1="3" y1="2" x2="29" y2="30" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#6366f1" />
                                        <stop offset="1" stopColor="#a855f7" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <h1 className="brand-name">Garuda</h1>
                    </div>

                    <div className="login-header">
                        <h2>Welcome Back</h2>
                        <p>Sign in to access your dashboard</p>
                    </div>

                    {error && (
                        <div className="login-error">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="login-email">Gmail Address</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                <input
                                    id="login-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your Gmail..."
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="login-password">Password</label>
                            <div className="input-wrapper">
                                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <input
                                    id="login-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password..."
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            id="login-submit-btn"
                            type="submit"
                            className={`login-btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                        <polyline points="10 17 15 12 10 7" />
                                        <line x1="15" y1="12" x2="3" y2="12" />
                                    </svg>
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <Link href="/" className="back-home-link">
                            ← Back to Website
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
