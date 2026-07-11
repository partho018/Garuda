// src/instrumentation.js
// This file runs ONCE when the Next.js server starts.
// It auto-initializes the Cloudflare D1 database tables and seeds default data.

export async function register() {
    // Only run on the Node.js runtime (not edge), and only in server context
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        try {
            const { initializeDatabase } = await import('./lib/db-init.js');
            await initializeDatabase();
        } catch (err) {
            console.error('[DB Init] Failed to initialize database on startup:', err.message);
            // Non-fatal: app continues even if DB init fails
        }
    }
}
