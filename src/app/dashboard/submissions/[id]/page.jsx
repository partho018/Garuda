"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const statusColors = {
    'New':            { bg: '#eff6ff', border: '#bfdbfe', color: '#2563eb', dot: '#3b82f6' },
    'Contacted':      { bg: '#f0fdf4', border: '#bbf7d0', color: '#16a34a', dot: '#22c55e' },
    'In Negotiation': { bg: '#fffbeb', border: '#fde68a', color: '#d97706', dot: '#f59e0b' },
    'Won':            { bg: '#f0fdf4', border: '#86efac', color: '#15803d', dot: '#10b981' },
    'Lost':           { bg: '#fef2f2', border: '#fecaca', color: '#dc2626', dot: '#ef4444' },
};

export default function SubmissionDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [sub, setSub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState('New');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!id) return;
        fetch(`/api/dashboard/submissions?id=${id}`)
            .then(r => r.json())
            .then(json => {
                if (json.success) {
                    setSub(json.data);
                    setStatus(json.data.status || 'New');
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    const handleStatusChange = async (newStatus) => {
        setStatus(newStatus);
        setSaving(true);
        try {
            await fetch('/api/dashboard/submissions', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus }),
            });
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Delete this submission permanently?')) return;
        await fetch(`/api/dashboard/submissions?id=${id}`, { method: 'DELETE' });
        router.push('/dashboard?tab=submissions');
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(sub.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const sc = statusColors[status] || statusColors['New'];

    if (loading) return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
                <p style={{ color: '#64748b', fontFamily: 'Inter, sans-serif' }}>Loading submission...</p>
            </div>
        </div>
    );

    if (!sub) return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', gap: '16px', fontFamily: 'Inter, sans-serif' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <h2 style={{ color: '#0f172a', margin: 0 }}>Submission not found</h2>
            <Link href="/dashboard?tab=submissions" style={{ color: '#6366f1', fontWeight: 600 }}>← Back to Contact Form</Link>
        </div>
    );

    return (
        <>
            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
                * { box-sizing: border-box; }
                body { margin: 0; background: #f1f5f9; font-family: 'Inter', sans-serif; }
                .sd-page { min-height: 100vh; background: #f1f5f9; padding: 32px; animation: fadeIn 0.35s ease both; }
                .sd-back { display: inline-flex; align-items: center; gap: 8px; color: #6366f1; font-size: 0.9rem; font-weight: 600; text-decoration: none; margin-bottom: 24px; transition: gap 0.2s; }
                .sd-back:hover { gap: 12px; }
                .sd-card { background: #fff; border-radius: 24px; border: 1px solid #e2e8f0; box-shadow: 0 4px 24px rgba(0,0,0,0.06); overflow: hidden; max-width: 800px; margin: 0 auto; }
                .sd-hero { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 36px 40px; display: flex; align-items: center; gap: 20px; }
                .sd-avatar { width: 72px; height: 72px; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.4); border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 800; color: #fff; flex-shrink: 0; }
                .sd-hero-info { flex: 1; }
                .sd-hero-name { font-size: 1.6rem; font-weight: 800; color: #fff; margin: 0 0 6px; }
                .sd-hero-time { font-size: 0.83rem; color: rgba(255,255,255,0.7); display: flex; align-items: center; gap: 6px; }
                .sd-hero-badges { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
                .sd-status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 100px; font-size: 0.82rem; font-weight: 700; }
                .sd-budget-badge { background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: #fff; padding: 6px 16px; border-radius: 100px; font-size: 0.82rem; font-weight: 700; }
                .sd-body { padding: 36px 40px; display: flex; flex-direction: column; gap: 28px; }
                .sd-section-title { font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 14px; }
                .sd-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .sd-info-item { background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px; padding: 14px 16px; }
                .sd-info-label { font-size: 0.75rem; font-weight: 600; color: #94a3b8; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em; }
                .sd-info-value { font-size: 0.95rem; font-weight: 600; color: #0f172a; display: flex; align-items: center; gap: 8px; word-break: break-all; }
                .sd-copy-btn { background: none; border: none; cursor: pointer; padding: 2px; color: #94a3b8; display: inline-flex; transition: color 0.2s; }
                .sd-copy-btn:hover { color: #6366f1; }
                .sd-wa-link { color: #10b981; display: inline-flex; transition: color 0.2s; }
                .sd-wa-link:hover { color: #059669; }
                .sd-message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; font-size: 0.93rem; line-height: 1.75; color: #334155; white-space: pre-wrap; max-height: 340px; overflow-y: auto; }
                .sd-status-section { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
                .sd-status-select { padding: 10px 16px; border: 1px solid #e2e8f0; border-radius: 10px; background: #fff; color: #0f172a; font-size: 0.9rem; font-weight: 600; font-family: inherit; outline: none; cursor: pointer; transition: border-color 0.2s; min-width: 180px; }
                .sd-status-select:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
                .sd-saving { font-size: 0.82rem; color: #94a3b8; font-weight: 500; }
                .sd-actions { display: flex; gap: 12px; flex-wrap: wrap; padding: 24px 40px; border-top: 1px solid #f1f5f9; background: #fafbfc; }
                .sd-btn-reply { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #6366f1; color: #fff; border: none; border-radius: 12px; font-size: 0.9rem; font-weight: 700; cursor: pointer; text-decoration: none; transition: all 0.2s; font-family: inherit; }
                .sd-btn-reply:hover { background: #4f46e5; box-shadow: 0 6px 20px rgba(99,102,241,0.3); transform: translateY(-1px); }
                .sd-btn-back { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #fff; color: #475569; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 0.9rem; font-weight: 700; cursor: pointer; text-decoration: none; transition: all 0.2s; font-family: inherit; }
                .sd-btn-back:hover { border-color: #6366f1; color: #6366f1; }
                .sd-btn-delete { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; border-radius: 12px; font-size: 0.9rem; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: inherit; margin-left: auto; }
                .sd-btn-delete:hover { background: #fee2e2; border-color: #ef4444; box-shadow: 0 4px 14px rgba(239,68,68,0.2); }
                @media (max-width: 640px) {
                    .sd-page { padding: 16px; }
                    .sd-hero { padding: 24px 20px; flex-direction: column; align-items: flex-start; }
                    .sd-body { padding: 24px 20px; }
                    .sd-info-grid { grid-template-columns: 1fr; }
                    .sd-actions { padding: 20px; flex-direction: column; }
                    .sd-btn-delete { margin-left: 0; }
                }
            `}</style>

            <div className="sd-page">
                <Link href="/dashboard?tab=submissions" className="sd-back">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                    Back to Contact Form
                </Link>

                <div className="sd-card">
                    {/* Hero */}
                    <div className="sd-hero">
                        <div className="sd-avatar">{sub.fullName?.charAt(0).toUpperCase()}</div>
                        <div className="sd-hero-info">
                            <h1 className="sd-hero-name">{sub.fullName}</h1>
                            <p className="sd-hero-time">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                {sub.createdAt ? new Date(sub.createdAt).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Date unknown'}
                            </p>
                        </div>
                        <div className="sd-hero-badges">
                            <span className="sd-status-badge" style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color }}>
                                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: sc.dot }} />
                                {status}
                            </span>
                            {sub.budget && <span className="sd-budget-badge">{sub.budget}</span>}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="sd-body">
                        {/* Contact Details */}
                        <div>
                            <p className="sd-section-title">Contact Information</p>
                            <div className="sd-info-grid">
                                <div className="sd-info-item">
                                    <div className="sd-info-label">Email Address</div>
                                    <div className="sd-info-value">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                        <span>{sub.email}</span>
                                        <button className="sd-copy-btn" onClick={copyEmail} title="Copy email">
                                            {copied
                                                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                                : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                            }
                                        </button>
                                    </div>
                                </div>
                                <div className="sd-info-item">
                                    <div className="sd-info-label">WhatsApp Number</div>
                                    <div className="sd-info-value">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3-8.57A2 2 0 0 1 3.67 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.61a16 16 0 0 0 6 6l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                        <span>{sub.whatsapp}</span>
                                        {sub.whatsapp && (
                                            <a href={`https://wa.me/${sub.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="sd-wa-link" title="Open WhatsApp">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.733-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.03-5.115-2.905-6.99C16.659 1.875 14.18.843 11.54.845 6.104.849 1.681 5.27 1.677 10.715c-.001 1.745.474 3.447 1.376 4.973l-.999 3.648 3.73-.978-.137-.091z"/></svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="sd-info-item">
                                    <div className="sd-info-label">Project Budget</div>
                                    <div className="sd-info-value" style={{ color: '#6366f1' }}>{sub.budget || 'Not specified'}</div>
                                </div>
                                <div className="sd-info-item">
                                    <div className="sd-info-label">Submission ID</div>
                                    <div className="sd-info-value" style={{ fontSize: '0.82rem', color: '#94a3b8', fontFamily: 'monospace' }}>{sub.id}</div>
                                </div>
                            </div>
                        </div>

                        {/* Project Details */}
                        <div>
                            <p className="sd-section-title">Project Details & Requirements</p>
                            <div className="sd-message-box">
                                {sub.details || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>No details provided.</span>}
                            </div>
                        </div>

                        {/* Status Management */}
                        <div>
                            <p className="sd-section-title">Update Status</p>
                            <div className="sd-status-section">
                                <select className="sd-status-select" value={status} onChange={e => handleStatusChange(e.target.value)}>
                                    <option value="New">🔵 New</option>
                                    <option value="Contacted">🟢 Contacted</option>
                                    <option value="In Negotiation">🟡 In Negotiation</option>
                                    <option value="Won">✅ Won</option>
                                    <option value="Lost">🔴 Lost</option>
                                </select>
                                {saving && <span className="sd-saving">Saving...</span>}
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="sd-actions">
                        <Link href="/dashboard?tab=submissions" className="sd-btn-back">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                            Back
                        </Link>
                        <a href={`mailto:${sub.email}`} className="sd-btn-reply">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            Reply via Email
                        </a>
                        <button className="sd-btn-delete" onClick={handleDelete}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                            Delete Submission
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
