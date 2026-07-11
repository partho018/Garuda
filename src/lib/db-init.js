// src/lib/db-init.js
// Automatically creates all required D1 tables and seeds default data.
// Called once on server startup via src/instrumentation.js

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_DATABASE_ID = process.env.CLOUDFLARE_DATABASE_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

async function runSQL(sql) {
    if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_DATABASE_ID || !CLOUDFLARE_API_TOKEN) {
        throw new Error('Missing Cloudflare D1 environment variables.');
    }

    const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${CLOUDFLARE_DATABASE_ID}/query`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql, params: [] }),
        cache: 'no-store',
    });

    const data = await response.json();
    if (!data.success) {
        throw new Error(data.errors?.[0]?.message || 'D1 query failed');
    }
    return data.result;
}

export async function initializeDatabase() {
    console.log('[DB Init] Starting database initialization...');

    const statements = [
        // 1. dashboard_users
        `CREATE TABLE IF NOT EXISTS dashboard_users (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'Editor',
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
        )`,

        // 2. contact_submissions
        `CREATE TABLE IF NOT EXISTS contact_submissions (
            id TEXT PRIMARY KEY,
            fullName TEXT NOT NULL,
            email TEXT NOT NULL,
            whatsapp TEXT NOT NULL,
            budget TEXT NOT NULL,
            details TEXT NOT NULL,
            active INTEGER NOT NULL DEFAULT 1,
            status TEXT NOT NULL DEFAULT 'New',
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
        )`,

        // 3. blog_categories
        `CREATE TABLE IF NOT EXISTS blog_categories (
            id TEXT PRIMARY KEY,
            name TEXT UNIQUE NOT NULL
        )`,

        // 4. blog_posts
        `CREATE TABLE IF NOT EXISTS blog_posts (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            category TEXT NOT NULL,
            categories TEXT NOT NULL,
            shortDesc TEXT NOT NULL,
            content TEXT NOT NULL,
            author TEXT NOT NULL,
            date TEXT NOT NULL,
            tags TEXT,
            status TEXT NOT NULL DEFAULT 'draft',
            thumbnail TEXT,
            seoTitle TEXT,
            seoDesc TEXT,
            viewCount INTEGER NOT NULL DEFAULT 0,
            scheduledAt TEXT,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
        )`,

        // 5. job_openings
        `CREATE TABLE IF NOT EXISTS job_openings (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            desc TEXT NOT NULL,
            salary TEXT NOT NULL,
            vacancy TEXT NOT NULL DEFAULT '1',
            type TEXT NOT NULL DEFAULT 'Full Time',
            location TEXT NOT NULL DEFAULT 'Remote',
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
        )`,

        // 6. media_library
        `CREATE TABLE IF NOT EXISTS media_library (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            url TEXT NOT NULL,
            createdAt TEXT NOT NULL
        )`,

        // 7. site_settings
        `CREATE TABLE IF NOT EXISTS site_settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        )`,

        // Seed: Default Admin User
        `INSERT OR IGNORE INTO dashboard_users (id, email, password, role, createdAt, updatedAt)
         VALUES ('admin-uuid-0001', 'admin@gmail.com', 'admin123', 'Super Admin', '2026-07-11T12:00:00.000Z', '2026-07-11T12:00:00.000Z')`,

        // Seed: Site Settings
        `INSERT OR IGNORE INTO site_settings (key, value)
         VALUES ('general', '{"contactEmail":"hello@garuda.com","seoTitle":"Garuda - Design Agency","seoDescription":"High-end design agency focusing on conversions."}')`,

        // Seed: Blog Categories
        `INSERT OR IGNORE INTO blog_categories (id, name) VALUES ('cat-1', 'AI')`,
        `INSERT OR IGNORE INTO blog_categories (id, name) VALUES ('cat-2', 'Branding')`,
        `INSERT OR IGNORE INTO blog_categories (id, name) VALUES ('cat-3', 'Design')`,
        `INSERT OR IGNORE INTO blog_categories (id, name) VALUES ('cat-4', 'Web Design')`,
        `INSERT OR IGNORE INTO blog_categories (id, name) VALUES ('cat-5', 'Social Media')`,
        `INSERT OR IGNORE INTO blog_categories (id, name) VALUES ('cat-6', 'Strategy')`,
        `INSERT OR IGNORE INTO blog_categories (id, name) VALUES ('cat-7', 'Development')`,
    ];

    let success = 0;
    let failed = 0;

    for (const sql of statements) {
        try {
            await runSQL(sql);
            success++;
        } catch (err) {
            console.warn(`[DB Init] Statement skipped: ${err.message}`);
            failed++;
        }
    }

    console.log(`[DB Init] Done. ${success} succeeded, ${failed} skipped/failed.`);
}
