// src/instrumentation.js
// Runs ONCE when the Next.js server starts — auto-initializes D1 database.

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        try {
            const { initializeDatabase } = await import('./lib/db-init.js');
            await initializeDatabase();
        } catch (err) {
            console.error('[DB Init] Failed on startup:', err.message);
        }
    }
}
