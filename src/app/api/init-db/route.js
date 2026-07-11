import { NextResponse } from 'next/server';
import { initializeDatabase } from '../../../lib/db-init.js';

// GET /api/init-db  — manually trigger DB initialization (safe to call multiple times)
export async function GET() {
    try {
        await initializeDatabase();
        return NextResponse.json({ success: true, message: 'Database initialized successfully.' });
    } catch (error) {
        console.error('Init DB API error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
