import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    collection, addDoc, getDocs, updateDoc, deleteDoc,
    doc, query, orderBy, onSnapshot, setDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import './Dashboard.css';

function Dashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [showChangeModal, setShowChangeModal] = useState(false);
    const [changeType, setChangeType] = useState('');

    // Change form states
    const [currentPassword, setCurrentPassword] = useState('');
    const [newValue, setNewValue] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isUpdating, setIsUpdating] = useState(false);

    const [currentEmail, setCurrentEmail] = useState('admin@gmail.com');
    const [userRole, setUserRole] = useState('Super Admin');
    const [adminEmail, setAdminEmail] = useState('admin@gmail.com');
    const [currentAuthorName, setCurrentAuthorName] = useState('Admin');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentEmail(sessionStorage.getItem('dashboard_user_email') || localStorage.getItem('dashboard_email') || 'admin@gmail.com');
            setUserRole(sessionStorage.getItem('dashboard_role') || 'Super Admin');
            setAdminEmail(localStorage.getItem('dashboard_email') || 'admin@gmail.com');
            setCurrentAuthorName(localStorage.getItem('dashboard_author_name') || 'Admin');
        }
    }, []);

    // ========== BLOG STATES ==========
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showBlogModal, setShowBlogModal] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [blogForm, setBlogForm] = useState({
        title: '', slug: '', category: '', categories: [], shortDesc: '', content: '',
        author: '', date: '', tags: '', status: 'draft', thumbnail: '',
        seoTitle: '', seoDesc: '', viewCount: 0, scheduledAt: ''
    });
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const [blogSearch, setBlogSearch] = useState('');
    const [blogFilter, setBlogFilter] = useState('all');
    const fileInputRef = useRef(null);

    // Dynamic Categories & Sort States
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [editingCategoryName, setEditingCategoryName] = useState('');
    const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
    const [blogSort, setBlogSort] = useState('newest');
    const [selectedPostIds, setSelectedPostIds] = useState([]);
    const [previewPost, setPreviewPost] = useState(null);

    // ========== SUBMISSION STATES ==========
    const [submissions, setSubmissions] = useState([]);
    const [loadingSubmissions, setLoadingSubmissions] = useState(true);
    const [submissionSearch, setSubmissionSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // ========== NEW TABS STATES ==========
    // Jobs states
    const [jobs, setJobs] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);
    const [showJobModal, setShowJobModal] = useState(false);
    const [editingJob, setEditingJob] = useState(null);
    const [jobForm, setJobForm] = useState({ title: '', desc: '', salary: '', vacancy: '1', type: 'Full Time', location: 'Remote' });
    const [jobSearch, setSearchJob] = useState('');

    // Media states
    const [mediaItems, setMediaItems] = useState([]);
    const [loadingMedia, setLoadingMedia] = useState(true);
    const [showMediaModal, setShowMediaModal] = useState(false);
    const [mediaForm, setMediaForm] = useState({ name: '', url: '' });
    const [uploadingMedia, setUploadingMedia] = useState(false);
    const mediaFileInputRef = useRef(null);

    // Site Settings states
    const [siteSettings, setSiteSettings] = useState({
        contactEmail: 'hello@garuda.com',
        facebookUrl: '',
        twitterUrl: '',
        instagramUrl: '',
        linkedinUrl: '',
        seoTitle: 'Garuda - Design Agency',
        seoDescription: 'High-end design agency focusing on conversions.'
    });
    const [loadingSettings, setLoadingSettings] = useState(true);
    const [savingSettings, setSavingSettings] = useState(false);

    // Users states
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [showUserModal, setShowUserModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [userForm, setUserForm] = useState({ email: '', password: '', role: 'Editor' });

    const CATEGORIES = ['Web Design', 'SEO', 'Development', 'Branding', 'UI/UX', 'Mobile Apps', 'Marketing', 'Other'];

    // Auth check
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('dashboard_auth');
        if (!isLoggedIn) router.push('/dashboard/login');
    }, [router]);

    // ========== Firebase: Real-time categories listener ==========
    useEffect(() => {
        setLoadingCategories(true);
        const q = query(collection(db, 'blog_categories'), orderBy('name', 'asc'));
        const unsub = onSnapshot(q, (snapshot) => {
            const fetched = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            if (fetched.length === 0) {
                const defaults = ['Web Design', 'SEO', 'Development', 'Branding', 'UI/UX', 'Mobile Apps', 'Marketing', 'Other'];
                defaults.forEach(async (catName) => {
                    await addDoc(collection(db, 'blog_categories'), { name: catName });
                });
            } else {
                setCategories(fetched);
            }
            setLoadingCategories(false);
        }, (err) => {
            console.error('Firebase error (categories):', err);
            setLoadingCategories(false);
        });
        return () => unsub();
    }, []);

    // ========== Firebase: Real-time posts listener ==========
    useEffect(() => {
        setLoadingPosts(true);
        const q = query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            const fetched = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setPosts(fetched);
            setLoadingPosts(false);
        }, (err) => {
            console.error('Firebase error:', err);
            setLoadingPosts(false);
        });
        return () => unsub();
    }, []);

    // ========== Firebase: Real-time submissions listener ==========
    useEffect(() => {
        setLoadingSubmissions(true);
        const q = query(collection(db, 'contact_submissions'), orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            const fetched = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setSubmissions(fetched);
            setLoadingSubmissions(false);
        }, (err) => {
            console.error('Firebase error (submissions):', err);
            setLoadingSubmissions(false);
        });
        return () => unsub();
    }, []);

    // ========== Firebase: Real-time jobs listener ==========
    useEffect(() => {
        setLoadingJobs(true);
        const q = query(collection(db, 'job_openings'), orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            const fetched = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setJobs(fetched);
            setLoadingJobs(false);
        }, (err) => {
            console.error('Firebase error (jobs):', err);
            setLoadingJobs(false);
        });
        return () => unsub();
    }, []);

    // ========== Firebase: Real-time media listener ==========
    useEffect(() => {
        setLoadingMedia(true);
        const q = query(collection(db, 'media_library'), orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            const fetched = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setMediaItems(fetched);
            setLoadingMedia(false);
        }, (err) => {
            console.error('Firebase error (media):', err);
            setLoadingMedia(false);
        });
        return () => unsub();
    }, []);

    // ========== Firebase: Site Settings Fetch ==========
    useEffect(() => {
        setLoadingSettings(true);
        const unsub = onSnapshot(doc(db, 'site_settings', 'general'), (docSnap) => {
            if (docSnap.exists()) {
                setSiteSettings(docSnap.data());
            }
            setLoadingSettings(false);
        }, (err) => {
            console.error('Firebase error (settings):', err);
            setLoadingSettings(false);
        });
        return () => unsub();
    }, []);

    // ========== Firebase: Real-time users listener ==========
    useEffect(() => {
        setLoadingUsers(true);
        const q = query(collection(db, 'dashboard_users'), orderBy('createdAt', 'desc'));
        const unsub = onSnapshot(q, (snapshot) => {
            const fetched = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setUsers(fetched);
            setLoadingUsers(false);
        }, (err) => {
            console.error('Firebase error (users):', err);
            setLoadingUsers(false);
        });
        return () => unsub();
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('dashboard_auth');
        router.push('/dashboard/login');
    };

    const openChangeModal = (type) => {
        setChangeType(type);
        setCurrentPassword(''); setNewValue(''); setConfirmPassword('');
        setMessage({ type: '', text: '' });
        setShowChangeModal(true);
    };

    const closeModal = () => { setShowChangeModal(false); setChangeType(''); setMessage({ type: '', text: '' }); };

    const handleUpdate = (e) => {
        e.preventDefault(); setIsUpdating(true); setMessage({ type: '', text: '' });
        const storedPassword = localStorage.getItem('dashboard_password') || 'admin123';
        setTimeout(() => {
            if (currentPassword !== storedPassword) {
                setMessage({ type: 'error', text: 'Current password is incorrect!' });
                setIsUpdating(false); return;
            }
            if (changeType === 'password') {
                if (newValue.length < 6) { setMessage({ type: 'error', text: 'New password must be at least 6 characters!' }); setIsUpdating(false); return; }
                if (newValue !== confirmPassword) { setMessage({ type: 'error', text: 'Passwords do not match!' }); setIsUpdating(false); return; }
                localStorage.setItem('dashboard_password', newValue);
                setMessage({ type: 'success', text: 'Password updated successfully!' });
            } else if (changeType === 'email') {
                if (!newValue.includes('@') || !newValue.includes('.')) { setMessage({ type: 'error', text: 'Please enter a valid Gmail address!' }); setIsUpdating(false); return; }
                localStorage.setItem('dashboard_email', newValue);
                setCurrentEmail(newValue);
                setAdminEmail(newValue);
                setMessage({ type: 'success', text: 'Gmail updated successfully!' });
            } else if (changeType === 'authorName') {
                if (newValue.trim().length === 0) { setMessage({ type: 'error', text: 'Author name cannot be empty!' }); setIsUpdating(false); return; }
                localStorage.setItem('dashboard_author_name', newValue);
                setCurrentAuthorName(newValue);
                setMessage({ type: 'success', text: 'Author name updated successfully!' });
            }
            setIsUpdating(false);
            setTimeout(() => closeModal(), 1500);
        }, 800);
    };

    // ========== BLOG HELPERS ==========
    const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const openBlogModal = (post = null) => {
        if (post) {
            setEditingPost(post);
            setBlogForm({
                title: post.title || '',
                slug: post.slug || '',
                category: post.category || '',
                categories: post.categories || (post.category ? [post.category] : []),
                shortDesc: post.shortDesc || '',
                content: post.content || '',
                author: post.author || currentAuthorName,
                date: post.date || new Date().toISOString().split('T')[0],
                tags: post.tags || '',
                status: post.status || 'draft',
                thumbnail: post.thumbnail || '',
                seoTitle: post.seoTitle || '',
                seoDesc: post.seoDesc || '',
                viewCount: post.viewCount || 0,
                scheduledAt: post.scheduledAt || ''
            });
            setThumbnailPreview(post.thumbnail || '');
        } else {
            setEditingPost(null);
            setBlogForm({
                title: '',
                slug: '',
                category: '',
                categories: [],
                shortDesc: '',
                content: '',
                author: currentAuthorName,
                date: new Date().toISOString().split('T')[0],
                tags: '',
                status: 'draft',
                thumbnail: '',
                seoTitle: '',
                seoDesc: '',
                viewCount: 0,
                scheduledAt: ''
            });
            setThumbnailPreview('');
        }
        setShowBlogModal(true);
    };

    const closeBlogModal = () => { setShowBlogModal(false); setEditingPost(null); setThumbnailPreview(''); };

    const handleBlogFormChange = (e) => {
        const { name, value } = e.target;
        setBlogForm(prev => {
            const updated = { ...prev, [name]: value };
            if (name === 'title' && !editingPost) updated.slug = generateSlug(value);
            return updated;
        });
    };

    const handleThumbnailUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnailPreview(reader.result);
            setBlogForm(prev => ({ ...prev, thumbnail: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    // ── Firebase CRUD ──
    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        if (!blogForm.title || !blogForm.content) return;
        setSaving(true);
        try {
            const { id: _id, ...formData } = blogForm;
            const legacyCategory = (formData.categories && formData.categories[0]) || '';
            const finalData = {
                ...formData,
                category: legacyCategory,
                categories: formData.categories || [],
                status: formData.status || 'draft',
                date: formData.date || new Date().toISOString().split('T')[0],
                viewCount: formData.viewCount || 0,
                seoTitle: formData.title || '',
                seoDesc: formData.shortDesc || '',
                updatedAt: new Date().toISOString()
            };

            if (editingPost) {
                await updateDoc(doc(db, 'blog_posts', editingPost.id), finalData);
            } else {
                await addDoc(collection(db, 'blog_posts'), {
                    ...finalData,
                    createdAt: new Date().toISOString()
                });
            }
            closeBlogModal();
        } catch (err) {
            console.error('Save error:', err);
            alert('Error saving post: ' + err.message);
        }
        setSaving(false);
    };

    // ========== CATEGORY CRUD ==========
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        try {
            await addDoc(collection(db, 'blog_categories'), { name: newCategoryName.trim() });
            setNewCategoryName('');
        } catch (err) {
            console.error('Create category error:', err);
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        if (!editingCategory || !editingCategoryName.trim()) return;
        try {
            await updateDoc(doc(db, 'blog_categories', editingCategory.id), { name: editingCategoryName.trim() });
            setEditingCategory(null);
            setEditingCategoryName('');
        } catch (err) {
            console.error('Update category error:', err);
        }
    };

    const handleDeleteCategory = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete category "${name}"?`)) return;
        try {
            await deleteDoc(doc(db, 'blog_categories', id));
        } catch (err) {
            console.error('Delete category error:', err);
        }
    };

    // ========== DUPLICATE & PREVIEW ==========
    const handleDuplicatePost = async (post) => {
        try {
            const { id, ...copyData } = post;
            await addDoc(collection(db, 'blog_posts'), {
                ...copyData,
                title: `Copy of ${copyData.title}`,
                status: 'draft',
                viewCount: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        } catch (err) {
            console.error('Duplicate post error:', err);
        }
    };

    // ========== BULK ACTIONS ==========
    const handleBulkDelete = async () => {
        if (selectedPostIds.length === 0) return;
        if (!window.confirm(`Are you sure you want to delete ${selectedPostIds.length} selected post(s)?`)) return;
        try {
            await Promise.all(selectedPostIds.map(id => deleteDoc(doc(db, 'blog_posts', id))));
            setSelectedPostIds([]);
        } catch (err) {
            console.error('Bulk delete error:', err);
        }
    };

    const handleBulkStatusUpdate = async (status) => {
        if (selectedPostIds.length === 0) return;
        try {
            await Promise.all(selectedPostIds.map(id => updateDoc(doc(db, 'blog_posts', id), {
                status: status,
                updatedAt: new Date().toISOString()
            })));
            setSelectedPostIds([]);
        } catch (err) {
            console.error('Bulk status update error:', err);
        }
    };

    const handleBulkMoveCategory = async (catName) => {
        if (selectedPostIds.length === 0 || !catName) return;
        try {
            await Promise.all(selectedPostIds.map(id => {
                const post = posts.find(p => p.id === id);
                if (!post) return Promise.resolve();
                const currentCats = post.categories || (post.category ? [post.category] : []);
                const updatedCats = currentCats.includes(catName) ? currentCats : [...currentCats, catName];
                return updateDoc(doc(db, 'blog_posts', id), {
                    categories: updatedCats,
                    category: catName,
                    updatedAt: new Date().toISOString()
                });
            }));
            setSelectedPostIds([]);
        } catch (err) {
            console.error('Bulk move category error:', err);
        }
    };

    const handleDeletePost = async (id) => {
        try {
            await deleteDoc(doc(db, 'blog_posts', id));
        } catch (err) {
            console.error('Delete error:', err);
        }
        setDeleteConfirm(null);
    };

    const toggleStatus = async (post) => {
        try {
            await updateDoc(doc(db, 'blog_posts', post.id), {
                status: post.status === 'published' ? 'draft' : 'published',
                updatedAt: new Date().toISOString()
            });
        } catch (err) {
            console.error('Toggle error:', err);
        }
    };

    const filteredPosts = posts.filter(p => {
        const matchSearch = p.title.toLowerCase().includes(blogSearch.toLowerCase()) || 
                            p.category?.toLowerCase().includes(blogSearch.toLowerCase()) ||
                            (p.categories && p.categories.some(cat => cat.toLowerCase().includes(blogSearch.toLowerCase())));
        const matchFilter = blogFilter === 'all' || p.status === blogFilter;
        
        const postCats = p.categories || (p.category ? [p.category] : []);
        const matchCategory = activeCategoryFilter === 'all' || postCats.includes(activeCategoryFilter);
        
        return matchSearch && matchFilter && matchCategory;
    });

    const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (blogSort === 'newest') {
            return new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0);
        }
        if (blogSort === 'oldest') {
            return new Date(a.createdAt || a.date || 0) - new Date(b.createdAt || b.date || 0);
        }
        if (blogSort === 'views') {
            return (b.viewCount || 0) - (a.viewCount || 0);
        }
        if (blogSort === 'az') {
            return (a.title || '').localeCompare(b.title || '');
        }
        return 0;
    });

    const publishedCount = posts.filter(p => p.status === 'published').length;
    const draftCount = posts.filter(p => p.status === 'draft').length;
    const scheduledCount = posts.filter(p => p.status === 'scheduled').length;

    // ========== SUBMISSION HELPERS ==========
    const filteredSubmissions = submissions.filter(s =>
        s.fullName?.toLowerCase().includes(submissionSearch.toLowerCase()) ||
        s.email?.toLowerCase().includes(submissionSearch.toLowerCase()) ||
        s.details?.toLowerCase().includes(submissionSearch.toLowerCase())
    );

    const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
    const paginatedSubmissions = filteredSubmissions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleDeleteSubmission = async (id) => {
        if (!window.confirm('Are you sure you want to delete this submission?')) return;
        try {
            await deleteDoc(doc(db, 'contact_submissions', id));
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const handleUpdateSubmissionStatus = async (id, status) => {
        try {
            await updateDoc(doc(db, 'contact_submissions', id), {
                status: status,
                updatedAt: new Date().toISOString()
            });
        } catch (err) {
            console.error('Status update error:', err);
        }
    };

    // ========== JOB ACTIONS ==========
    const openJobModal = (job = null) => {
        if (job) {
            setEditingJob(job);
            setJobForm({ ...job });
        } else {
            setEditingJob(null);
            setJobForm({ title: '', desc: '', salary: '', vacancy: '1', type: 'Full Time', location: 'Remote' });
        }
        setShowJobModal(true);
    };

    const closeJobModal = () => {
        setShowJobModal(false);
        setEditingJob(null);
    };

    const handleJobSubmit = async (e) => {
        e.preventDefault();
        if (!jobForm.title || !jobForm.desc) return;
        setSaving(true);
        try {
            const { id: _id, ...formData } = jobForm;
            if (editingJob) {
                await updateDoc(doc(db, 'job_openings', editingJob.id), {
                    ...formData,
                    updatedAt: new Date().toISOString()
                });
            } else {
                await addDoc(collection(db, 'job_openings'), {
                    ...formData,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            }
            closeJobModal();
        } catch (err) {
            console.error('Job save error:', err);
            alert('Error saving job: ' + err.message);
        }
        setSaving(false);
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job opening?')) return;
        try {
            await deleteDoc(doc(db, 'job_openings', id));
        } catch (err) {
            console.error('Job delete error:', err);
        }
    };

    // ========== MEDIA ACTIONS ==========
    const handleMediaUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingMedia(true);
        const reader = new FileReader();
        reader.onloadend = async () => {
            try {
                await addDoc(collection(db, 'media_library'), {
                    name: file.name,
                    url: reader.result,
                    createdAt: new Date().toISOString()
                });
                alert('Media uploaded successfully!');
            } catch (err) {
                console.error('Media upload error:', err);
                alert('Failed to upload media: ' + err.message);
            }
            setUploadingMedia(false);
        };
        reader.readAsDataURL(file);
    };

    const handleDeleteMedia = async (id) => {
        if (!window.confirm('Are you sure you want to delete this media item?')) return;
        try {
            await deleteDoc(doc(db, 'media_library', id));
        } catch (err) {
            console.error('Media delete error:', err);
        }
    };

    // ========== SETTINGS ACTIONS ==========
    const handleSettingsSubmit = async (e) => {
        e.preventDefault();
        setSavingSettings(true);
        try {
            await setDoc(doc(db, 'site_settings', 'general'), siteSettings);
            alert('Website general settings updated successfully!');
        } catch (err) {
            console.error('Settings save error:', err);
            alert('Error updating settings: ' + err.message);
        }
        setSavingSettings(false);
    };

    // ========== USER ACTIONS ==========
    const openUserModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setUserForm({ ...user });
        } else {
            setEditingUser(null);
            setUserForm({ email: '', password: '', role: 'Editor' });
        }
        setShowUserModal(true);
    };

    const closeUserModal = () => {
        setShowUserModal(false);
        setEditingUser(null);
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        if (!userForm.email || !userForm.password) return;
        setSaving(true);
        try {
            const { id: _id, ...formData } = userForm;
            if (editingUser) {
                await updateDoc(doc(db, 'dashboard_users', editingUser.id), {
                    ...formData,
                    updatedAt: new Date().toISOString()
                });
            } else {
                await addDoc(collection(db, 'dashboard_users'), {
                    ...formData,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            }
            closeUserModal();
        } catch (err) {
            console.error('User save error:', err);
            alert('Error saving user: ' + err.message);
        }
        setSaving(false);
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await deleteDoc(doc(db, 'dashboard_users', id));
        } catch (err) {
            console.error('User delete error:', err);
        }
    };

    return (
        <div className="dashboard-page">
            {/* Sidebar */}
            <aside className="db-sidebar">
                <div className="db-sidebar-header">
                    <div className="db-brand">
                        <div className="db-brand-icon">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                                <path d="M16 2L29 8.5V23.5L16 30L3 23.5V8.5L16 2Z" fill="url(#dbBrandGrad)" />
                                <defs>
                                    <linearGradient id="dbBrandGrad" x1="3" y1="2" x2="29" y2="30" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#6366f1" />
                                        <stop offset="1" stopColor="#a855f7" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <span>Garuda Admin</span>
                    </div>
                </div>

                <nav className="db-nav">
                    <button id="nav-overview" className={`db-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                        </svg>
                        Overview
                    </button>
                    <button id="nav-blog" className={`db-nav-item ${activeTab === 'blog' ? 'active' : ''}`} onClick={() => setActiveTab('blog')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                        Blog Posts
                        {posts.length > 0 && <span className="db-nav-badge">{posts.length}</span>}
                    </button>
                    <button id="nav-submissions" className={`db-nav-item ${activeTab === 'submissions' ? 'active' : ''}`} onClick={() => { setActiveTab('submissions'); setCurrentPage(1); }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        Inquiries
                        {submissions.length > 0 && <span className="db-nav-badge blue">{submissions.length}</span>}
                    </button>
                    <button id="nav-career" className={`db-nav-item ${activeTab === 'career' ? 'active' : ''}`} onClick={() => setActiveTab('career')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                        </svg>
                        Careers
                        {jobs.length > 0 && <span className="db-nav-badge green">{jobs.length}</span>}
                    </button>
                    <button id="nav-media" className={`db-nav-item ${activeTab === 'media' ? 'active' : ''}`} onClick={() => setActiveTab('media')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        Media Library
                        {mediaItems.length > 0 && <span className="db-nav-badge purple">{mediaItems.length}</span>}
                    </button>
                    <button id="nav-users" className={`db-nav-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        Users & Roles
                    </button>
                    <button id="nav-settings" className={`db-nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        Settings
                    </button>
                </nav>

                <div className="db-sidebar-footer">
                    <div className="db-user-info">
                        <div className="db-avatar">{currentEmail.charAt(0).toUpperCase()}</div>
                        <div className="db-user-details">
                            <span className="db-user-email">{currentEmail.length > 20 ? currentEmail.substring(0, 18) + '...' : currentEmail}</span>
                            <span className="db-user-role">{userRole}</span>
                        </div>
                    </div>
                    <button id="logout-btn" className="db-logout-btn" onClick={handleLogout} title="Logout">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="db-main">
                {/* Header */}
                <div className="db-header">
                    <div className="db-header-title">
                        <h1>{activeTab === 'overview' ? 'Dashboard Overview' : activeTab === 'blog' ? 'Blog Management' : activeTab === 'submissions' ? 'Contact Submissions' : activeTab === 'career' ? 'Careers Management' : activeTab === 'media' ? 'Media Library' : activeTab === 'users' ? 'User Roles Management' : 'Account Settings'}</h1>
                        <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="db-header-actions">
                        {activeTab === 'blog' && !showBlogModal && (
                            <button className="db-add-post-btn" onClick={() => openBlogModal()}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                New Post
                            </button>
                        )}
                        {activeTab === 'career' && (
                            <button className="db-add-post-btn" onClick={() => openJobModal()}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                New Job
                            </button>
                        )}
                        {activeTab === 'media' && (
                            <label className="db-add-post-btn" style={{ cursor: 'pointer' }}>
                                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleMediaUpload} />
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                {uploadingMedia ? 'Uploading...' : 'Upload Image'}
                            </label>
                        )}
                        {activeTab === 'users' && (
                            <button className="db-add-post-btn" onClick={() => openUserModal()}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                New User
                            </button>
                        )}
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="db-content">
                        {/* Stats Grid */}
                        <div className="db-stats-grid">
                            <div className="db-stat-card">
                                <div className="db-stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg></div>
                                <div>
                                    <h4 className="db-stat-label">Total Blog Posts</h4>
                                    <p className="db-stat-value">{posts.length}</p>
                                    <span className="db-stat-change positive">{publishedCount} Published</span>
                                </div>
                            </div>
                            <div className="db-stat-card">
                                <div className="db-stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></div>
                                <div>
                                    <h4 className="db-stat-label">Total Inquiries</h4>
                                    <p className="db-stat-value">{submissions.length}</p>
                                    <span className="db-stat-change positive">Active Leads</span>
                                </div>
                            </div>
                            <div className="db-stat-card">
                                <div className="db-stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg></div>
                                <div>
                                    <h4 className="db-stat-label">Open Careers</h4>
                                    <p className="db-stat-value">{jobs.length}</p>
                                    <span className="db-stat-change positive">Job Openings</span>
                                </div>
                            </div>
                            <div className="db-stat-card">
                                <div className="db-stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg></div>
                                <div>
                                    <h4 className="db-stat-label">Media Assets</h4>
                                    <p className="db-stat-value">{mediaItems.length}</p>
                                    <span className="db-stat-change positive">Uploaded Library</span>
                                </div>
                            </div>
                        </div>

                        <div className="db-quick-actions">
                            <h2>Quick Actions</h2>
                            <div className="db-action-grid">
                                <button className="db-action-card" onClick={() => { setActiveTab('blog'); openBlogModal(); }}>
                                    <div className="db-action-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg></div>
                                    <h3>New Blog Post</h3>
                                    <p>Write and publish a new article</p>
                                </button>
                                <button className="db-action-card" onClick={() => setActiveTab('blog')}>
                                    <div className="db-action-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg></div>
                                    <h3>Manage Blog</h3>
                                    <p>{posts.length} posts · {publishedCount} published</p>
                                </button>
                                <button className="db-action-card" onClick={() => setActiveTab('submissions')}>
                                    <div className="db-action-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></div>
                                    <h3>Project Inquiries</h3>
                                    <p>{submissions.length} total messages</p>
                                </button>
                                <button className="db-action-card" onClick={() => setActiveTab('career')}>
                                    <div className="db-action-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg></div>
                                    <h3>Job Openings</h3>
                                    <p>Manage career listings ({jobs.length})</p>
                                </button>
                                <button className="db-action-card" onClick={() => setActiveTab('media')}>
                                    <div className="db-action-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg></div>
                                    <h3>Media Library</h3>
                                    <p>Upload and copy asset links</p>
                                </button>
                                <button className="db-action-card" onClick={() => setActiveTab('users')}>
                                    <div className="db-action-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div>
                                    <h3>Users & Roles</h3>
                                    <p>Manage dashboard access users</p>
                                </button>
                                <button className="db-action-card" onClick={() => { setActiveTab('settings'); openChangeModal('email'); }}>
                                    <div className="db-action-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></div>
                                    <h3>Change Gmail</h3>
                                    <p>Update your login email address</p>
                                </button>
                                <button className="db-action-card danger" onClick={handleLogout}>
                                    <div className="db-action-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg></div>
                                    <h3>Logout</h3>
                                    <p>End your session</p>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Blog Tab */}
                {activeTab === 'blog' && (
                    <div className="db-content">
                        {showBlogModal ? (
                            <div className="db-blog-form-container">
                                <div className="db-form-header">
                                    <h2>
                                        <span style={{marginRight: '8px', display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle'}}>
                                            {editingPost 
                                                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                                : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                            }
                                        </span>
                                        {editingPost ? 'Edit Post' : 'New Blog Post'}
                                    </h2>
                                    <button className="db-back-btn" onClick={closeBlogModal}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                                        </svg>
                                        Back to Posts
                                    </button>
                                </div>
                                <form className="db-blog-form" onSubmit={handleBlogSubmit}>
                                    <div className="db-blog-form-grid">
                                        {/* LEFT */}
                                        <div className="db-blog-form-left">
                                            <div className="db-form-group">
                                                <label>Post Title <span className="req">*</span></label>
                                                <input name="title" value={blogForm.title} onChange={handleBlogFormChange} placeholder="Enter post title..." required />
                                            </div>
                                            <div className="db-form-group">
                                                <label>Slug / URL</label>
                                                <input name="slug" value={blogForm.slug} onChange={handleBlogFormChange} placeholder="auto-generated-slug" />
                                            </div>
                                            
                                            <div className="db-form-group">
                                                <label>Categories (Select multiple)</label>
                                                <select 
                                                    value="" 
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (!val) return;
                                                        const current = blogForm.categories || [];
                                                        if (!current.includes(val)) {
                                                            setBlogForm(p => ({ ...p, categories: [...current, val] }));
                                                        }
                                                    }}
                                                >
                                                    <option value="">Select category...</option>
                                                    {categories.map(c => (
                                                        <option key={c.id} value={c.name}>{c.name}</option>
                                                    ))}
                                                </select>
                                                
                                                {blogForm.categories && blogForm.categories.length > 0 && (
                                                    <div className="db-tags-list" style={{ marginTop: '10px' }}>
                                                        {blogForm.categories.map((cat, idx) => (
                                                            <span key={idx} className="db-tag-badge">
                                                                {cat}
                                                                <button 
                                                                    type="button" 
                                                                    className="db-remove-tag-btn" 
                                                                    onClick={() => {
                                                                        const updated = blogForm.categories.filter((_, i) => i !== idx);
                                                                        setBlogForm(p => ({ ...p, categories: updated }));
                                                                    }}
                                                                >
                                                                    &times;
                                                                </button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="db-form-row">
                                                <div className="db-form-group">
                                                    <label>Author</label>
                                                    <select name="author" value={blogForm.author} onChange={handleBlogFormChange}>
                                                        {currentAuthorName && <option value={currentAuthorName}>{currentAuthorName}</option>}
                                                        {adminEmail && adminEmail.split('@')[0] !== currentAuthorName && (
                                                            <option value={adminEmail.split('@')[0]}>{adminEmail.split('@')[0]}</option>
                                                        )}
                                                        {users.map(u => {
                                                            const name = u.email.split('@')[0];
                                                            if (name === currentAuthorName || name === adminEmail.split('@')[0]) return null;
                                                            return <option key={u.id} value={name}>{name}</option>;
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="db-form-group">
                                                    <label>Status</label>
                                                    <select name="status" value={blogForm.status} onChange={handleBlogFormChange}>
                                                        <option value="draft">Draft</option>
                                                        <option value="published">Published</option>
                                                        <option value="scheduled">Scheduled</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {blogForm.status === 'scheduled' && (
                                                <div className="db-form-group">
                                                    <label>Scheduled Publish Time <span className="req">*</span></label>
                                                    <input 
                                                        type="datetime-local" 
                                                        name="scheduledAt" 
                                                        value={blogForm.scheduledAt || ''} 
                                                        onChange={handleBlogFormChange} 
                                                        required 
                                                    />
                                                </div>
                                            )}

                                            <div className="db-form-group">
                                                <label>Tags (Press Enter or comma to add)</label>
                                                <div className="db-tags-input-container">
                                                    <div className="db-tags-list">
                                                        {(blogForm.tags ? blogForm.tags.split(',').map(t => t.trim()).filter(Boolean) : []).map((tag, idx) => (
                                                            <span key={idx} className="db-tag-badge">
                                                                {tag}
                                                                <button type="button" className="db-remove-tag-btn" onClick={() => {
                                                                    const currentTags = blogForm.tags.split(',').map(t => t.trim()).filter(Boolean);
                                                                    const updatedTags = currentTags.filter((_, i) => i !== idx);
                                                                    setBlogForm(p => ({ ...p, tags: updatedTags.join(', ') }));
                                                                }}>
                                                                    &times;
                                                                </button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <input 
                                                        type="text" 
                                                        placeholder="Add a tag..." 
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' || e.key === ',') {
                                                                e.preventDefault();
                                                                const val = e.currentTarget.value.trim().replace(/,/g, '');
                                                                if (val) {
                                                                    const currentTags = blogForm.tags ? blogForm.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
                                                                    if (!currentTags.includes(val)) {
                                                                        const updatedTags = [...currentTags, val];
                                                                        setBlogForm(p => ({ ...p, tags: updatedTags.join(', ') }));
                                                                    }
                                                                }
                                                                e.currentTarget.value = '';
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="db-form-group">
                                                <label>Short Description</label>
                                                <textarea name="shortDesc" value={blogForm.shortDesc} onChange={handleBlogFormChange} placeholder="Brief summary shown in post cards..." rows={2} />
                                            </div>
                                        </div>
                                        {/* RIGHT */}
                                        <div className="db-blog-form-right">
                                            <div className="db-form-group">
                                                <label>Thumbnail Image</label>
                                                <div className="db-thumb-upload" onClick={() => fileInputRef.current?.click()}>
                                                    {thumbnailPreview
                                                        ? <img src={thumbnailPreview} alt="preview" className="db-thumb-preview-img" />
                                                        : <div className="db-thumb-placeholder">
                                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                                            <span>Click to upload image</span>
                                                            <small>PNG, JPG, WEBP</small>
                                                        </div>
                                                    }
                                                </div>
                                                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleThumbnailUpload} />
                                                {thumbnailPreview && (
                                                    <button type="button" className="db-remove-thumb" onClick={() => { setThumbnailPreview(''); setBlogForm(p => ({ ...p, thumbnail: '' })); }}>
                                                        Remove Image
                                                    </button>
                                                )}
                                            </div>
                                            <div className="db-form-group" style={{ flex: 1 }}>
                                                <label>Content <span className="req">*</span></label>
                                                <textarea name="content" value={blogForm.content} onChange={handleBlogFormChange} placeholder="Write your blog content here..." rows={10} required style={{ flex: 1, minHeight: '180px' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="db-modal-actions db-blog-form-actions">
                                        <button type="button" className="db-cancel-btn" onClick={closeBlogModal}>Cancel</button>
                                        <button type="submit" className="db-save-btn" disabled={saving}>
                                            {saving ? (
                                                <><span className="spinner"></span> Saving...</>
                                            ) : (
                                                <>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                                                    {editingPost ? 'Update Post' : 'Create Post'}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="db-blog-layout-wrapper">
                                {/* CATEGORIES SIDEBAR */}
                                <div className="db-blog-sidebar">
                                    <div className="db-sidebar-section-header">
                                        <h3>Categories</h3>
                                    </div>
                                    
                                    {/* Add Category Form */}
                                    <form className="db-add-category-form" onSubmit={handleCreateCategory}>
                                        <input 
                                            type="text" 
                                            placeholder="New category..." 
                                            value={newCategoryName} 
                                            onChange={e => setNewCategoryName(e.target.value)} 
                                        />
                                        <button type="submit">+</button>
                                    </form>
                                    
                                    <div className="db-categories-list">
                                        <button 
                                            className={`db-category-item-btn ${activeCategoryFilter === 'all' ? 'active' : ''}`}
                                            onClick={() => setActiveCategoryFilter('all')}
                                        >
                                            <span className="db-category-name">All Blogs</span>
                                            <span className="db-category-count">{posts.length}</span>
                                        </button>
                                        
                                        {categories.map(cat => {
                                            const count = posts.filter(p => {
                                                const pCats = p.categories || (p.category ? [p.category] : []);
                                                return pCats.includes(cat.name);
                                            }).length;
                                            
                                            const isEditing = editingCategory?.id === cat.id;
                                            
                                            return (
                                                <div key={cat.id} className={`db-category-item-wrap ${activeCategoryFilter === cat.name ? 'active' : ''}`}>
                                                    {isEditing ? (
                                                        <form className="db-edit-category-form" onSubmit={handleUpdateCategory}>
                                                            <input 
                                                                type="text" 
                                                                value={editingCategoryName} 
                                                                onChange={e => setEditingCategoryName(e.target.value)}
                                                                autoFocus
                                                            />
                                                            <button type="submit" className="db-cat-save"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg></button>
                                                            <button type="button" className="db-cat-cancel" onClick={() => setEditingCategory(null)}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>
                                                        </form>
                                                    ) : (
                                                        <>
                                                            <button 
                                                                className="db-category-item-btn"
                                                                onClick={() => setActiveCategoryFilter(cat.name)}
                                                            >
                                                                <span className="db-category-name">{cat.name}</span>
                                                                <span className="db-category-count">{count}</span>
                                                            </button>
                                                            <div className="db-category-actions">
                                                                <button className="db-cat-act-btn edit" onClick={() => {
                                                                    setEditingCategory(cat);
                                                                    setEditingCategoryName(cat.name);
                                                                }} title="Edit Category"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></button>
                                                                <button className="db-cat-act-btn delete" onClick={() => handleDeleteCategory(cat.id, cat.name)} title="Delete Category"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* MAIN BLOG LIST SECTION */}
                                <div className="db-blog-main">
                                    {/* Blog Stats */}
                                    <div className="db-blog-stats">
                                        <div className="db-blog-stat">
                                            <span className="db-blog-stat-num">{posts.length}</span>
                                            <span className="db-blog-stat-lbl">Total Posts</span>
                                        </div>
                                        <div className="db-blog-stat published">
                                            <span className="db-blog-stat-num">{publishedCount}</span>
                                            <span className="db-blog-stat-lbl">Published</span>
                                        </div>
                                        <div className="db-blog-stat draft">
                                            <span className="db-blog-stat-num">{draftCount}</span>
                                            <span className="db-blog-stat-lbl">Drafts</span>
                                        </div>
                                        <div className="db-blog-stat scheduled">
                                            <span className="db-blog-stat-num">{scheduledCount}</span>
                                            <span className="db-blog-stat-lbl">Scheduled</span>
                                        </div>
                                    </div>

                                    {/* Bulk Actions Bar */}
                                    {selectedPostIds.length > 0 && (
                                        <div className="db-bulk-actions-bar">
                                            <span className="db-bulk-selected-count">{selectedPostIds.length} post(s) selected</span>
                                            <div className="db-bulk-buttons">
                                                <button className="db-bulk-btn publish" onClick={() => handleBulkStatusUpdate('published')}>Publish</button>
                                                <button className="db-bulk-btn unpublish" onClick={() => handleBulkStatusUpdate('draft')}>Unpublish</button>
                                                <button className="db-bulk-btn delete" onClick={handleBulkDelete}>Delete</button>
                                                
                                                <div className="db-bulk-move-wrap">
                                                    <select onChange={(e) => {
                                                        if (e.target.value) {
                                                            handleBulkMoveCategory(e.target.value);
                                                            e.target.value = '';
                                                        }
                                                    }}>
                                                        <option value="">Move Category...</option>
                                                        {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                                    </select>
                                                </div>
                                                
                                                <button className="db-bulk-btn cancel" onClick={() => setSelectedPostIds([])}>Clear Selection</button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Toolbar */}
                                    <div className="db-blog-toolbar">
                                        <div className="db-blog-search-wrap">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                            </svg>
                                            <input className="db-blog-search" type="text" placeholder="Search posts..." value={blogSearch} onChange={e => setBlogSearch(e.target.value)} />
                                        </div>
                                        
                                        <div className="db-blog-toolbar-actions">
                                            <div className="db-blog-filters">
                                                {['all', 'published', 'draft', 'scheduled'].map(f => (
                                                    <button key={f} className={`db-filter-btn ${blogFilter === f ? 'active' : ''}`} onClick={() => setBlogFilter(f)}>
                                                        {f.charAt(0).toUpperCase() + f.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                            
                                            <div className="db-blog-sort">
                                                <select value={blogSort} onChange={e => setBlogSort(e.target.value)}>
                                                    <option value="newest">Newest First</option>
                                                    <option value="oldest">Oldest First</option>
                                                    <option value="views">Most Viewed</option>
                                                    <option value="az">A-Z Title</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Posts List */}
                                    {sortedPosts.length === 0 ? (
                                        <div className="db-blog-empty">
                                            <div className="db-blog-empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg></div>
                                            <h3>{posts.length === 0 ? 'No blog posts yet' : 'No posts found'}</h3>
                                            <p>{posts.length === 0 ? 'Click "New Post" to create your first blog article.' : 'Try a different search, category or status filter.'}</p>
                                            {posts.length === 0 && (
                                                <button className="db-add-post-btn" onClick={() => openBlogModal()}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                                    </svg>
                                                    Create First Post
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="db-posts-table-container">
                                            <table className="db-posts-table">
                                                <thead>
                                                    <tr>
                                                        <th width="40">
                                                            <input 
                                                                type="checkbox" 
                                                                checked={sortedPosts.length > 0 && selectedPostIds.length === sortedPosts.length}
                                                                onChange={(e) => {
                                                                    if (e.target.checked) {
                                                                        setSelectedPostIds(sortedPosts.map(p => p.id));
                                                                    } else {
                                                                        setSelectedPostIds([]);
                                                                    }
                                                                }}
                                                            />
                                                        </th>
                                                        <th>Blog Post</th>
                                                        <th>Categories</th>
                                                        <th>Author</th>
                                                        <th>Publish Date</th>
                                                        <th>Status</th>
                                                        <th>Views</th>
                                                        <th style={{ textAlign: 'right' }}>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sortedPosts.map(post => {
                                                        const isSelected = selectedPostIds.includes(post.id);
                                                        const postCats = post.categories || (post.category ? [post.category] : []);
                                                        
                                                        return (
                                                            <tr key={post.id} className={isSelected ? 'selected' : ''}>
                                                                <td>
                                                                    <input 
                                                                        type="checkbox" 
                                                                        checked={isSelected}
                                                                        onChange={(e) => {
                                                                            if (e.target.checked) {
                                                                                setSelectedPostIds(prev => [...prev, post.id]);
                                                                            } else {
                                                                                setSelectedPostIds(prev => prev.filter(id => id !== post.id));
                                                                            }
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <div className="db-table-post-cell">
                                                                        <div className="db-table-post-thumb">
                                                                            {post.thumbnail ? <img src={post.thumbnail} alt="" /> : <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg></span>}
                                                                        </div>
                                                                        <div className="db-table-post-details">
                                                                            <span className="db-table-post-title">{post.title}</span>
                                                                            {post.shortDesc && <span className="db-table-post-desc">{post.shortDesc}</span>}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className="db-table-cats">
                                                                        {postCats.length > 0 ? postCats.map((cat, i) => (
                                                                            <span key={i} className="db-table-cat-badge">{cat}</span>
                                                                        )) : <span className="db-none">—</span>}
                                                                    </div>
                                                                </td>
                                                                <td><span className="db-table-author"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px', display: 'inline-block', verticalAlign: 'middle'}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>{post.author || 'Admin'}</span></td>
                                                                <td><span className="db-table-date"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px', display: 'inline-block', verticalAlign: 'middle'}}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>{post.date}</span></td>
                                                                <td>
                                                                    <span className={`db-post-status-badge ${post.status}`}>
                                                                        {post.status === 'published' ? <span style={{display: 'inline-flex', alignItems: 'center', gap: '4px'}}><span style={{width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block'}}></span>Published</span> : post.status === 'scheduled' ? <span style={{display: 'inline-flex', alignItems: 'center', gap: '4px'}}><span style={{width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block'}}></span>Scheduled</span> : <span style={{display: 'inline-flex', alignItems: 'center', gap: '4px'}}><span style={{width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#64748b', display: 'inline-block'}}></span>Draft</span>}
                                                                    </span>
                                                                    {post.status === 'scheduled' && post.scheduledAt && (
                                                                        <div className="db-table-scheduled-time">{new Date(post.scheduledAt).toLocaleString()}</div>
                                                                    )}
                                                                </td>
                                                                <td><span className="db-table-views"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px', display: 'inline-block', verticalAlign: 'middle'}}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>{post.viewCount || 0}</span></td>
                                                                <td style={{ textAlign: 'right' }}>
                                                                    <div className="db-table-actions">
                                                                        <button type="button" className="db-table-btn preview" onClick={() => setPreviewPost(post)} title="Preview Post">
                                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px'}}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>Preview
                                                                        </button>
                                                                        <button type="button" className="db-table-btn duplicate" onClick={() => handleDuplicatePost(post)} title="Duplicate Post">
                                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px'}}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>Duplicate
                                                                        </button>
                                                                        <button type="button" className="db-table-btn edit" onClick={() => openBlogModal(post)} title="Edit Post">
                                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px'}}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>Edit
                                                                        </button>
                                                                        <button type="button" className="db-table-btn delete" onClick={() => setDeleteConfirm(post.id)} title="Delete Post">
                                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px'}}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>Delete
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* PREVIEW POST OVERLAY */}
                        {previewPost && (
                            <div className="db-modal-overlay" style={{ zIndex: 10000 }}>
                                <div className="db-modal-card preview-modal" style={{ maxWidth: '900px', width: '90%' }}>
                                    <div className="db-modal-header" style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                                        <h2><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>Preview: {previewPost.title}</h2>
                                        <button className="db-modal-close" onClick={() => setPreviewPost(null)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                                    </div>
                                    <div className="db-modal-body" style={{ maxHeight: '70vh', overflowY: 'auto', padding: '24px 0' }}>
                                        {previewPost.thumbnail && (
                                            <div style={{ width: '100%', height: '350px', borderRadius: '12px', overflow: 'hidden', marginBottom: '24px' }}>
                                                <img src={previewPost.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px', fontSize: '0.85rem', color: '#64748b' }}>
                                            <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px', verticalAlign: 'middle'}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg><strong>Author:</strong> {previewPost.author || 'Admin'}</span>
                                            <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px', verticalAlign: 'middle'}}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg><strong>Date:</strong> {previewPost.date}</span>
                                            <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px', verticalAlign: 'middle'}}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg><strong>Views:</strong> {previewPost.viewCount || 0}</span>
                                            <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px', verticalAlign: 'middle'}}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg><strong>Status:</strong> {previewPost.status}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                                            {(previewPost.categories || (previewPost.category ? [previewPost.category] : [])).map((cat, i) => (
                                                <span key={i} style={{ background: '#e0e7ff', color: '#4f46e5', padding: '4px 12px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                                                    {cat}
                                                </span>
                                            ))}
                                        </div>
                                        {previewPost.shortDesc && (
                                            <div style={{ padding: '16px', background: '#f8fafc', borderLeft: '4px solid #6366f1', borderRadius: '8px', marginBottom: '24px', fontStyle: 'italic', color: '#475569' }}>
                                                {previewPost.shortDesc}
                                            </div>
                                        )}
                                        <div 
                                            className="db-preview-content" 
                                            style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#334155' }}
                                            dangerouslySetInnerHTML={{ __html: previewPost.content }}
                                        />
                                    </div>
                                    <div className="db-modal-actions" style={{ marginTop: '0', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                                        <button type="button" className="db-cancel-btn" onClick={() => setPreviewPost(null)}>Close Preview</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Submissions Tab */}
                {activeTab === 'submissions' && (
                    <div className="db-content">
                        {/* Submissions Toolbar */}
                        <div className="db-blog-toolbar">
                            <div className="db-blog-search-wrap">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <input className="db-blog-search" type="text" placeholder="Search inquiries..." value={submissionSearch} onChange={e => { setSubmissionSearch(e.target.value); setCurrentPage(1); }} />
                            </div>
                            <div className="db-submissions-count">
                                Showing {paginatedSubmissions.length} of {filteredSubmissions.length}
                            </div>
                        </div>

                        {/* Submissions List */}
                        {filteredSubmissions.length === 0 ? (
                            <div className="db-blog-empty">
                                <div className="db-blog-empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></div>
                                <h3>{submissions.length === 0 ? 'No inquiries yet' : 'No matches found'}</h3>
                                <p>When people contact you from the website, their details will appear here.</p>
                            </div>
                        ) : (
                            <>
                                <div className="db-submissions-list">
                                    {paginatedSubmissions.map(sub => (
                                        <div key={sub.id} className="db-submission-card">
                                            <div className="db-sub-header">
                                                <div className="db-sub-user">
                                                    <div className="db-sub-avatar">{sub.fullName?.charAt(0).toUpperCase()}</div>
                                                    <div>
                                                        <h3>{sub.fullName}</h3>
                                                        <span className="db-sub-date">
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '4px', display: 'inline-block', verticalAlign: 'middle'}}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>{sub.createdAt?.toDate ? sub.createdAt.toDate().toLocaleString() : 'Just now'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <select 
                                                        className="db-sub-status-select" 
                                                        value={sub.status || 'New'} 
                                                        onChange={(e) => handleUpdateSubmissionStatus(sub.id, e.target.value)}
                                                        style={{
                                                            background: 'rgba(0,0,0,0.3)',
                                                            border: '1px solid rgba(255,255,255,0.1)',
                                                            borderRadius: '6px',
                                                            color: '#fff',
                                                            padding: '4px 8px',
                                                            fontSize: '0.8rem',
                                                            outline: 'none',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        <option value="New">New</option>
                                                        <option value="Contacted">Contacted</option>
                                                        <option value="In Negotiation">In Negotiation</option>
                                                        <option value="Won">Won</option>
                                                        <option value="Lost">Lost</option>
                                                    </select>
                                                    <div className="db-sub-budget">{sub.budget || 'No Budget'}</div>
                                                </div>
                                            </div>
                                            <div className="db-sub-info">
                                                <div className="db-sub-info-item">
                                                    <strong>Email:</strong> {sub.email}
                                                </div>
                                                <div className="db-sub-info-item">
                                                    <strong>Whatsapp:</strong> {sub.whatsapp}
                                                </div>
                                            </div>
                                            <div className="db-sub-details">
                                                <p>{sub.details}</p>
                                            </div>
                                            <div className="db-sub-actions">
                                                <a href={`mailto:${sub.email}`} className="db-sub-action-btn reply">Reply via Email</a>
                                                <button className="db-sub-action-btn delete" onClick={() => handleDeleteSubmission(sub.id)}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="db-pagination">
                                        <button
                                            className="db-page-btn"
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(prev => prev - 1)}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="15 18 9 12 15 6" />
                                            </svg>
                                            Previous
                                        </button>
                                        <div className="db-page-numbers">
                                            Page {currentPage} of {totalPages}
                                        </div>
                                        <button
                                            className="db-page-btn"
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(prev => prev + 1)}
                                        >
                                            Next
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}

                {/* Careers Tab */}
                {activeTab === 'career' && (
                    <div className="db-content">
                        {/* Jobs Toolbar */}
                        <div className="db-blog-toolbar">
                            <div className="db-blog-search-wrap">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <input className="db-blog-search" type="text" placeholder="Search jobs..." value={jobSearch} onChange={e => setSearchJob(e.target.value)} />
                            </div>
                        </div>

                        {/* Jobs List */}
                        {loadingJobs ? (
                            <div className="db-blog-empty">
                                <span className="spinner"></span>
                                <p>Loading job openings...</p>
                            </div>
                        ) : jobs.length === 0 ? (
                            <div className="db-blog-empty">
                                <div className="db-blog-empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg></div>
                                <h3>No job openings found</h3>
                                <p>Click "New Job" to create a career opening listing.</p>
                            </div>
                        ) : (
                            <div className="db-posts-list">
                                {jobs.filter(j => j.title.toLowerCase().includes(jobSearch.toLowerCase())).map(job => (
                                    <div key={job.id} className="db-post-row">
                                        <div className="db-post-thumb-placeholder" style={{ fontSize: '1.5rem', width: '50px', height: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                        </div>
                                        <div className="db-post-info" style={{ marginLeft: '16px' }}>
                                            <div className="db-post-meta-top">
                                                <span className="db-post-cat">{job.type}</span>
                                                <span className="db-post-status published">{job.location}</span>
                                            </div>
                                            <h3 className="db-post-title">{job.title}</h3>
                                            <p className="db-post-desc">{job.desc}</p>
                                            <div className="db-post-meta-bot">
                                                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '4px', display: 'inline-block', verticalAlign: 'middle'}}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>{job.salary}</span>
                                                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '4px', display: 'inline-block', verticalAlign: 'middle'}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>{job.vacancy} Vacancy</span>
                                            </div>
                                        </div>
                                        <div className="db-post-actions">
                                            <button className="db-post-action-btn edit" onClick={() => openJobModal(job)} title="Edit">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                            </button>
                                            <button className="db-post-action-btn delete" onClick={() => handleDeleteJob(job.id)} title="Delete">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                    <path d="M10 11v6" /><path d="M14 11v6" />
                                                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Media Library Tab */}
                {activeTab === 'media' && (
                    <div className="db-content">
                        {loadingMedia ? (
                            <div className="db-blog-empty">
                                <span className="spinner"></span>
                                <p>Loading media assets...</p>
                            </div>
                        ) : mediaItems.length === 0 ? (
                            <div className="db-blog-empty">
                                <div className="db-blog-empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg></div>
                                <h3>No media files uploaded yet</h3>
                                <p>Upload images using the "Upload Image" button in the header.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
                                {mediaItems.map(item => (
                                    <div key={item.id} className="db-settings-card" style={{ padding: '12px', gap: '10px', position: 'relative' }}>
                                        <div style={{ height: '120px', width: '100%', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                            <img src={item.url} alt={item.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <span style={{ fontSize: '0.8rem', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                                            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button 
                                                className="db-change-btn" 
                                                style={{ padding: '6px 12px', fontSize: '0.75rem', flex: 1, justifyContent: 'center' }}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(item.url);
                                                    alert('Image link copied to clipboard!');
                                                }}
                                            >
                                                Copy Link
                                            </button>
                                            <button 
                                                className="db-logout-btn" 
                                                style={{ padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                onClick={() => handleDeleteMedia(item.id)}
                                                title="Delete"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Users & Roles Tab */}
                {activeTab === 'users' && (
                    <div className="db-content">
                        {loadingUsers ? (
                            <div className="db-blog-empty">
                                <span className="spinner"></span>
                                <p>Loading users...</p>
                            </div>
                        ) : (
                            <div className="db-posts-list">
                                {/* Default Local Storage User (Super Admin) */}
                                <div className="db-post-row">
                                    <div className="db-avatar" style={{ width: '40px', height: '40px' }}>SA</div>
                                    <div className="db-post-info" style={{ marginLeft: '16px' }}>
                                        <div className="db-post-meta-top">
                                            <span className="db-badge active">Active</span>
                                        </div>
                                        <h3 className="db-post-title">{adminEmail}</h3>
                                        <p className="db-post-desc">System Default Account</p>
                                        <div className="db-post-meta-bot">
                                            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" style={{marginRight: '4px', display: 'inline-block', verticalAlign: 'middle'}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>Super Admin</span>
                                        </div>
                                    </div>
                                    <div className="db-post-actions">
                                        <button className="db-post-action-btn edit" onClick={() => openChangeModal('email')} title="Change Email/Password">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Custom database users */}
                                {users.map(u => (
                                    <div key={u.id} className="db-post-row">
                                        <div className="db-avatar" style={{ width: '40px', height: '40px', background: u.role === 'Super Admin' ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(255,255,255,0.1)' }}>
                                            {u.email.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="db-post-info" style={{ marginLeft: '16px' }}>
                                            <div className="db-post-meta-top">
                                                <span className="db-badge active">Active User</span>
                                            </div>
                                            <h3 className="db-post-title">{u.email}</h3>
                                            <p className="db-post-desc">Database user profile</p>
                                            <div className="db-post-meta-bot">
                                                <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" style={{marginRight: '4px', display: 'inline-block', verticalAlign: 'middle'}}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>{u.role}</span>
                                            </div>
                                        </div>
                                        <div className="db-post-actions">
                                            <button className="db-post-action-btn edit" onClick={() => openUserModal(u)} title="Edit User">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                            </button>
                                            <button className="db-post-action-btn delete" onClick={() => handleDeleteUser(u.id)} title="Delete User">
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                    <path d="M10 11v6" /><path d="M14 11v6" />
                                                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="db-content">
                        <div className="db-settings-grid">
                            <div className="db-settings-card">
                                <div className="db-settings-card-header">
                                    <div className="db-settings-icon">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </div>
                                    <div><h3>Change Gmail</h3><p>Update your login email address</p></div>
                                </div>
                                <div className="db-current-value"><label>Current Gmail</label><span>{currentEmail}</span></div>
                                <button id="change-email-btn" className="db-change-btn" onClick={() => openChangeModal('email')}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                    Update Gmail
                                </button>
                            </div>

                            <div className="db-settings-card">
                                <div className="db-settings-card-header">
                                    <div className="db-settings-icon">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </div>
                                    <div><h3>Change Author Name</h3><p>Set default author name for blogs</p></div>
                                </div>
                                <div className="db-current-value"><label>Current Author Name</label><span>{currentAuthorName}</span></div>
                                <button id="change-author-name-btn" className="db-change-btn" onClick={() => openChangeModal('authorName')}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                    Update Name
                                </button>
                            </div>

                            <div className="db-settings-card">
                                <div className="db-settings-card-header">
                                    <div className="db-settings-icon">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </div>
                                    <div><h3>Change Password</h3><p>Keep your account secure</p></div>
                                </div>
                                <div className="db-current-value"><label>Current Password</label><span>••••••••</span></div>
                                <button id="change-password-btn" className="db-change-btn" onClick={() => openChangeModal('password')}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                    Update Password
                                </button>
                            </div>

                            <div className="db-settings-card full-width">
                                <div className="db-settings-card-header">
                                    <div className="db-settings-icon">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                    <div><h3>Website configurations</h3><p>Manage contact info, social links, and SEO defaults</p></div>
                                </div>
                                <form onSubmit={handleSettingsSubmit} className="db-modal-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
                                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Contact Email (Receives project inquiries)</label>
                                        <input type="email" value={siteSettings.contactEmail || ''} onChange={e => setSiteSettings(prev => ({...prev, contactEmail: e.target.value}))} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Facebook Page URL</label>
                                        <input type="url" value={siteSettings.facebookUrl || ''} onChange={e => setSiteSettings(prev => ({...prev, facebookUrl: e.target.value}))} placeholder="https://facebook.com/..." />
                                    </div>
                                    <div className="form-group">
                                        <label>Twitter Page URL</label>
                                        <input type="url" value={siteSettings.twitterUrl || ''} onChange={e => setSiteSettings(prev => ({...prev, twitterUrl: e.target.value}))} placeholder="https://twitter.com/..." />
                                    </div>
                                    <div className="form-group">
                                        <label>Instagram Page URL</label>
                                        <input type="url" value={siteSettings.instagramUrl || ''} onChange={e => setSiteSettings(prev => ({...prev, instagramUrl: e.target.value}))} placeholder="https://instagram.com/..." />
                                    </div>
                                    <div className="form-group">
                                        <label>LinkedIn Page URL</label>
                                        <input type="url" value={siteSettings.linkedinUrl || ''} onChange={e => setSiteSettings(prev => ({...prev, linkedinUrl: e.target.value}))} placeholder="https://linkedin.com/..." />
                                    </div>
                                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>SEO Website Title</label>
                                        <input value={siteSettings.seoTitle || ''} onChange={e => setSiteSettings(prev => ({...prev, seoTitle: e.target.value}))} />
                                    </div>
                                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>SEO Website Description</label>
                                        <textarea value={siteSettings.seoDescription || ''} onChange={e => setSiteSettings(prev => ({...prev, seoDescription: e.target.value}))} rows={2} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: '#fff', outline: 'none' }} />
                                    </div>
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <button type="submit" className="db-change-btn" disabled={savingSettings}>
                                            {savingSettings ? 'Saving...' : 'Save Configuration'}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="db-settings-card full-width">
                                <div className="db-settings-card-header">
                                    <div className="db-settings-icon">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                        </svg>
                                    </div>
                                    <div><h3>Account Information</h3><p>Your account details</p></div>
                                </div>
                                <div className="db-info-list">
                                    <div className="db-info-item"><span className="db-info-label">Name</span><span className="db-info-value">{currentAuthorName}</span></div>
                                    <div className="db-info-item"><span className="db-info-label">Email</span><span className="db-info-value">{currentEmail}</span></div>
                                    <div className="db-info-item"><span className="db-info-label">Role</span><span className="db-info-value db-badge">Administrator</span></div>
                                    <div className="db-info-item"><span className="db-info-label">Status</span><span className="db-info-value db-badge active">Active</span></div>
                                </div>
                                <button className="db-logout-full-btn" onClick={handleLogout}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* ======== Change Credentials Modal ======== */}
            {showChangeModal && (
                <div className="db-modal-overlay" onClick={closeModal}>
                    <div className="db-modal" onClick={e => e.stopPropagation()}>
                        <div className="db-modal-header">
                            <h3>
                                        <span style={{marginRight: '8px', display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle'}}>
                                            {changeType === 'email' 
                                                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                                : changeType === 'authorName'
                                                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                                : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                            }
                                        </span>
                                        {changeType === 'email' ? 'Change Gmail' : changeType === 'authorName' ? 'Change Author Name' : 'Change Password'}
                                    </h3>
                            <button className="db-modal-close" onClick={closeModal}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        {message.text && (
                            <div className={`db-modal-message ${message.type}`}>
                                message.type === 'success' 
                                            ? <span style={{display: 'inline-flex', alignItems: 'center', gap: '6px'}}><span style={{color: '#10b981', fontSize: '1.2rem'}}>✔</span> {message.text}</span> 
                                            : <span style={{display: 'inline-flex', alignItems: 'center', gap: '6px'}}><span style={{color: '#ef4444', fontSize: '1.2rem'}}>✖</span> {message.text}</span>
                            </div>
                        )}
                        <form className="db-modal-form" onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label>Current Password</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                    <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Enter current password..." required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>{changeType === 'email' ? 'New Gmail' : changeType === 'authorName' ? 'New Author Name' : 'New Password'}</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        {changeType === 'email'
                                            ? <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>
                                            : changeType === 'authorName'
                                                ? <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>
                                                : <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>
                                        }
                                    </svg>
                                    <input type={changeType === 'email' ? 'email' : changeType === 'authorName' ? 'text' : 'password'} value={newValue} onChange={e => setNewValue(e.target.value)} placeholder={changeType === 'email' ? 'Enter new Gmail...' : changeType === 'authorName' ? 'Enter new author name...' : 'Enter new password...'} required />
                                </div>
                            </div>
                            {changeType === 'password' && (
                                <div className="form-group">
                                    <label>Confirm New Password</label>
                                    <div className="input-wrapper">
                                        <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password..." required />
                                    </div>
                                </div>
                            )}
                            <div className="db-modal-actions">
                                <button type="button" className="db-cancel-btn" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="db-save-btn" disabled={isUpdating}>
                                    {isUpdating ? <><span className="spinner"></span> Updating...</> : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg> Save Changes</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}



            {/* ======== Delete Confirm ======== */}
            {deleteConfirm && (
                <div className="db-modal-overlay" onClick={() => setDeleteConfirm(null)}>
                    <div className="db-modal db-delete-modal" onClick={e => e.stopPropagation()}>
                        <div className="db-delete-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></div>
                        <h3>Delete Post?</h3>
                        <p>This action cannot be undone. The post will be permanently removed.</p>
                        <div className="db-modal-actions">
                            <button className="db-cancel-btn" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                            <button className="db-save-btn danger-btn" onClick={() => handleDeletePost(deleteConfirm)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></svg>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ======== Job Modal ======== */}
            {showJobModal && (
                <div className="db-modal-overlay" onClick={closeJobModal}>
                    <div className="db-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                        <div className="db-modal-header">
                            <h3>
                                        <span style={{marginRight: '8px', display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle'}}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                        </span>
                                        {editingJob ? 'Edit Job Opening' : 'New Job Opening'}
                                    </h3>
                            <button className="db-modal-close" onClick={closeJobModal}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <form className="db-modal-form" onSubmit={handleJobSubmit}>
                            <div className="form-group">
                                <label>Job Title <span className="req">*</span></label>
                                <input value={jobForm.title} onChange={e => setJobForm(p => ({...p, title: e.target.value}))} placeholder="e.g. Lead UI/UX Designer" required style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: '#fff', outline: 'none' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px' }}>
                                <div className="form-group">
                                    <label>Job Type</label>
                                    <select value={jobForm.type} onChange={e => setJobForm(p => ({...p, type: e.target.value}))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: '#fff', outline: 'none' }}>
                                        <option value="Full Time" style={{ background: '#1c1d24' }}>Full Time</option>
                                        <option value="Part Time" style={{ background: '#1c1d24' }}>Part Time</option>
                                        <option value="Contract" style={{ background: '#1c1d24' }}>Contract</option>
                                        <option value="Internship" style={{ background: '#1c1d24' }}>Internship</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Location Type</label>
                                    <select value={jobForm.location} onChange={e => setJobForm(p => ({...p, location: e.target.value}))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: '#fff', outline: 'none' }}>
                                        <option value="Remote" style={{ background: '#1c1d24' }}>Remote</option>
                                        <option value="On-site" style={{ background: '#1c1d24' }}>On-site</option>
                                        <option value="Hybrid" style={{ background: '#1c1d24' }}>Hybrid</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px' }}>
                                <div className="form-group">
                                    <label>Salary Range</label>
                                    <input value={jobForm.salary} onChange={e => setJobForm(p => ({...p, salary: e.target.value}))} placeholder="e.g. $4,000 - $6,000" style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: '#fff', outline: 'none' }} />
                                </div>
                                <div className="form-group">
                                    <label>Vacancy Count</label>
                                    <input type="number" min="1" value={jobForm.vacancy} onChange={e => setJobForm(p => ({...p, vacancy: e.target.value}))} required style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: '#fff', outline: 'none' }} />
                                </div>
                            </div>
                            <div className="form-group" style={{ marginTop: '12px' }}>
                                <label>Job Description <span className="req">*</span></label>
                                <textarea value={jobForm.desc} onChange={e => setJobForm(p => ({...p, desc: e.target.value}))} placeholder="Explain details, requirements, responsibilities..." rows={5} required style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: '#fff', outline: 'none' }} />
                            </div>
                            <div className="db-modal-actions" style={{ marginTop: '20px' }}>
                                <button type="button" className="db-cancel-btn" onClick={closeJobModal}>Cancel</button>
                                <button type="submit" className="db-save-btn" disabled={saving}>
                                    {saving ? 'Saving...' : (editingJob ? 'Update Job' : 'Create Job')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ======== User Modal ======== */}
            {showUserModal && (
                <div className="db-modal-overlay" onClick={closeUserModal}>
                    <div className="db-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px' }}>
                        <div className="db-modal-header">
                            <h3>
                                        <span style={{marginRight: '8px', display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle'}}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                        </span>
                                        {editingUser ? 'Edit User Access' : 'New User Access'}
                                    </h3>
                            <button className="db-modal-close" onClick={closeUserModal}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <form className="db-modal-form" onSubmit={handleUserSubmit}>
                            <div className="form-group">
                                <label>Email Address <span className="req">*</span></label>
                                <input type="email" value={userForm.email} onChange={e => setUserForm(p => ({...p, email: e.target.value}))} placeholder="email@gmail.com" required disabled={!!editingUser} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: '#fff', outline: 'none' }} />
                            </div>
                            <div className="form-group" style={{ marginTop: '12px' }}>
                                <label>Password <span className="req">*</span></label>
                                <input type="password" value={userForm.password} onChange={e => setUserForm(p => ({...p, password: e.target.value}))} placeholder="At least 6 characters" required style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: '#fff', outline: 'none' }} />
                            </div>
                            <div className="form-group" style={{ marginTop: '12px' }}>
                                <label>User Role</label>
                                <select value={userForm.role} onChange={e => setUserForm(p => ({...p, role: e.target.value}))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px', color: '#fff', outline: 'none' }}>
                                    <option value="Super Admin" style={{ background: '#1c1d24' }}>Super Admin</option>
                                    <option value="Editor" style={{ background: '#1c1d24' }}>Editor</option>
                                    <option value="Moderator" style={{ background: '#1c1d24' }}>Moderator</option>
                                </select>
                            </div>
                            <div className="db-modal-actions" style={{ marginTop: '20px' }}>
                                <button type="button" className="db-cancel-btn" onClick={closeUserModal}>Cancel</button>
                                <button type="submit" className="db-save-btn" disabled={saving}>
                                    {saving ? 'Saving...' : (editingUser ? 'Update User' : 'Create User')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
