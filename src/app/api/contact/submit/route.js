import { NextResponse } from 'next/server';
import { executeCommand } from '../../../../lib/db';

export async function POST(request) {
    try {
        const { fullName, email, whatsapp, budget, details } = await request.json();

        if (!fullName || !email || !whatsapp || !details) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const id = crypto.randomUUID();
        const now = new Date().toISOString();

        await executeCommand(
            `INSERT INTO contact_submissions (id, fullName, email, whatsapp, budget, details, active, status, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, 1, 'new', ?, ?)`,
            [id, fullName, email, whatsapp, budget || '', details, now, now]
        );

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('Contact submit API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
