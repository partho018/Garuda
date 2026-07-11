import { NextResponse } from 'next/server';
import { queryRows, executeCommand } from '../../../../lib/db';

// Get all contact submissions (or single by ?id=)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (id) {
            const rows = await queryRows(
                'SELECT * FROM contact_submissions WHERE id = ? LIMIT 1', [id]
            );
            if (!rows || rows.length === 0) {
                return NextResponse.json({ error: 'Not found' }, { status: 404 });
            }
            const sub = { ...rows[0], active: !!rows[0].active };
            return NextResponse.json({ success: true, data: sub });
        }

        const submissions = await queryRows(
            'SELECT * FROM contact_submissions ORDER BY createdAt DESC'
        );
        const formatted = submissions.map(s => ({ ...s, active: !!s.active }));
        return NextResponse.json({ success: true, data: formatted });
    } catch (error) {
        console.error('Get submissions API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// Update submission status or details
export async function PUT(request) {
    try {
        const { id, status, active } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 });
        }

        const now = new Date().toISOString();

        if (status !== undefined && active !== undefined) {
            await executeCommand(
                'UPDATE contact_submissions SET status = ?, active = ?, updatedAt = ? WHERE id = ?',
                [status, active ? 1 : 0, now, id]
            );
        } else if (status !== undefined) {
            await executeCommand(
                'UPDATE contact_submissions SET status = ?, updatedAt = ? WHERE id = ?',
                [status, now, id]
            );
        } else if (active !== undefined) {
            await executeCommand(
                'UPDATE contact_submissions SET active = ?, updatedAt = ? WHERE id = ?',
                [active ? 1 : 0, now, id]
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Update submission API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// Delete submission
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 });
        }

        await executeCommand('DELETE FROM contact_submissions WHERE id = ?', [id]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete submission API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
