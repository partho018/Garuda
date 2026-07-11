-- Garuda Cloudflare D1 Database Schema & Seed Data
-- Run this in your Cloudflare D1 Console or via Wrangler:
-- wrangler d1 execute <database-name> --local --file=schema.sql (for local)
-- wrangler d1 execute <database-name> --remote --file=schema.sql (for production)

-- 1. Dashboard Users
CREATE TABLE IF NOT EXISTS dashboard_users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'Editor',
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
);

-- 2. Contact Submissions (Inquiries)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id TEXT PRIMARY KEY,
    fullName TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    budget TEXT NOT NULL,
    details TEXT NOT NULL,
    active INTEGER NOT NULL DEFAULT 1, -- 1 = active, 0 = archived
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'resolved', etc.
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
);

-- 3. Blog Categories
CREATE TABLE IF NOT EXISTS blog_categories (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- 4. Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    categories TEXT NOT NULL, -- JSON string array of categories
    shortDesc TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL,
    tags TEXT,
    status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'published', 'scheduled'
    thumbnail TEXT, -- base64 data or image url
    seoTitle TEXT,
    seoDesc TEXT,
    viewCount INTEGER NOT NULL DEFAULT 0,
    scheduledAt TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
);

-- 5. Job Openings (Careers)
CREATE TABLE IF NOT EXISTS job_openings (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    desc TEXT NOT NULL,
    salary TEXT NOT NULL,
    vacancy TEXT NOT NULL DEFAULT '1',
    type TEXT NOT NULL DEFAULT 'Full Time',
    location TEXT NOT NULL DEFAULT 'Remote',
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
);

-- 6. Media Library
CREATE TABLE IF NOT EXISTS media_library (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    createdAt TEXT NOT NULL
);

-- 7. Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL -- JSON string of settings
);


-- ========================================================
-- SEED DATA
-- ========================================================

-- Insert Default Admin User (admin@gmail.com / admin123)
INSERT OR IGNORE INTO dashboard_users (id, email, password, role, createdAt, updatedAt)
VALUES (
    'admin-uuid-0001',
    'admin@gmail.com',
    'admin123',
    'Super Admin',
    '2026-07-11T12:00:00.000Z',
    '2026-07-11T12:00:00.000Z'
);

-- Insert Default Site Settings
INSERT OR IGNORE INTO site_settings (key, value)
VALUES (
    'general',
    '{"contactEmail":"hello@garuda.com","facebookUrl":"","twitterUrl":"","instagramUrl":"","linkedinUrl":"","seoTitle":"Garuda - Design Agency","seoDescription":"High-end design agency focusing on conversions."}'
);

-- Insert Default Categories
INSERT OR IGNORE INTO blog_categories (id, name) VALUES ('cat-1', 'AI');
INSERT OR IGNORE INTO blog_categories (id, name) VALUES ('cat-2', 'Branding');
INSERT OR IGNORE INTO blog_categories (id, name) VALUES ('cat-3', 'Design');
INSERT OR IGNORE INTO blog_categories (id, name) VALUES ('cat-4', 'Web Design');
INSERT OR IGNORE INTO blog_categories (id, name) VALUES ('cat-5', 'Social Media');
INSERT OR IGNORE INTO blog_categories (id, name) VALUES ('cat-6', 'Strategy');
INSERT OR IGNORE INTO blog_categories (id, name) VALUES ('cat-7', 'Development');

-- Insert Initial Blog Posts (matches sample posts)
INSERT OR IGNORE INTO blog_posts (id, title, slug, category, categories, shortDesc, content, author, date, tags, status, thumbnail, seoTitle, seoDesc, viewCount, createdAt, updatedAt)
VALUES (
    'post-1',
    'How AI Is Transforming Brand Identity in 2025',
    'how-ai-is-transforming-brand-identity-in-2025',
    'AI',
    '["AI"]',
    'Explore how artificial intelligence is reshaping the way brands craft their visual identity and messaging.',
    'Understanding the design lifecycle is paramount to launching successful digital products. During discovery and framing stages, design practitioners often utilize multiple artifacts to communicate functionality, aesthetics, and navigation logic. Among these, mockups and prototypes serve as standard pillars, yet they target completely different objectives and stages of product development.',
    'Abdullah Al Noman',
    '2026-06-09',
    'ai,branding',
    'published',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    'How AI Is Transforming Brand Identity in 2025',
    'Explore how artificial intelligence is reshaping the way brands craft their visual identity and messaging.',
    120,
    '2026-07-11T12:00:00.000Z',
    '2026-07-11T12:00:00.000Z'
);

INSERT OR IGNORE INTO blog_posts (id, title, slug, category, categories, shortDesc, content, author, date, tags, status, thumbnail, seoTitle, seoDesc, viewCount, createdAt, updatedAt)
VALUES (
    'post-2',
    'UX Principles Every Designer Should Master',
    'ux-principles-every-designer-should-master',
    'Design',
    '["Design"]',
    'A deep dive into the core principles that separate average designers from exceptional ones.',
    'UX Design represents the intersection between user needs and business objectives. A master UX designer understands user psychology, cognitive load, visual hierarchy, and interactive usability feedback loops. In this post we explore principles such as Hick''s Law, Fitts''s Law, and the Pareto Principle.',
    'Abdullah Al Noman',
    '2026-06-10',
    'ux,design',
    'published',
    'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800',
    'UX Principles Every Designer Should Master',
    'A deep dive into the core principles that separate average designers from exceptional ones.',
    95,
    '2026-07-11T12:00:00.000Z',
    '2026-07-11T12:00:00.000Z'
);

-- Insert Default Jobs
INSERT OR IGNORE INTO job_openings (id, title, desc, salary, vacancy, type, location, createdAt, updatedAt)
VALUES (
    'job-1',
    'Mobile App UI Designer',
    'We''re looking for a talented UI Designer (Mobile App) to join our R&D team to drive standout projects and shape aesthetic solutions at Garuda. If you love to design nice, attractive UI, visuals, mobile app interfaces - we''d love to hear from you.',
    'UPTO BDT 40K',
    '1',
    'Full Time',
    'Remote',
    '2026-07-11T12:00:00.000Z',
    '2026-07-11T12:00:00.000Z'
);

INSERT OR IGNORE INTO job_openings (id, title, desc, salary, vacancy, type, location, createdAt, updatedAt)
VALUES (
    'job-2',
    'Senior Web Designer',
    'We''re looking for a Senior Web Designer to join Garuda and create high-quality landing pages and modern websites. If you love designing clean, beautiful, and conversion-focused web experiences and enjoy turning ideas into responsive templates.',
    'UPTO BDT 60K',
    '1',
    'Full Time',
    'Remote',
    '2026-07-11T12:00:00.000Z',
    '2026-07-11T12:00:00.000Z'
);
