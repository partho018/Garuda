import { NextResponse } from 'next/server';
import { queryRows, executeCommand } from '../../../../lib/db';

// Get all jobs
export async function GET() {
    try {
        const jobs = await queryRows(
            'SELECT * FROM job_openings ORDER BY createdAt DESC'
        );
        return NextResponse.json({ success: true, data: jobs });
    } catch (error) {
        console.error('Get jobs API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// Create or update a job
export async function POST(request) {
    try {
        const data = await request.json();
        const { id, title, desc, salary, vacancy, type, location } = data;

        if (!title || !desc) {
            return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
        }

        const now = new Date().toISOString();

        if (id) {
            // Update
            await executeCommand(
                `UPDATE job_openings SET 
                    title = ?, desc = ?, salary = ?, vacancy = ?, type = ?, location = ?, updatedAt = ?
                 WHERE id = ?`,
                [title, desc, salary || '', vacancy || '1', type || 'Full Time', location || 'Remote', now, id]
            );
            return NextResponse.json({ success: true, id });
        } else {
            // Create
            const newId = crypto.randomUUID();
            await executeCommand(
                `INSERT INTO job_openings (id, title, desc, salary, vacancy, type, location, createdAt, updatedAt)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [newId, title, desc, salary || '', vacancy || '1', type || 'Full Time', location || 'Remote', now, now]
            );
            return NextResponse.json({ success: true, id: newId });
        }
    } catch (error) {
        console.error('Save job API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// Delete job
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
        }

        await executeCommand('DELETE FROM job_openings WHERE id = ?', [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete job API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
