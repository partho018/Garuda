import { NextResponse } from 'next/server';
import { queryRows, executeCommand } from '../../../../lib/db';

// Get all users
export async function GET() {
    try {
        const users = await queryRows(
            'SELECT id, email, role, createdAt, updatedAt FROM dashboard_users ORDER BY createdAt DESC'
        );
        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        console.error('Get users API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// Create or update a user
export async function POST(request) {
    try {
        const { id, email, password, role } = await request.json();

        if (!email || !role) {
            return NextResponse.json({ error: 'Email and role are required' }, { status: 400 });
        }

        const now = new Date().toISOString();

        if (id) {
            // Update
            if (password) {
                // If password is changed
                await executeCommand(
                    'UPDATE dashboard_users SET email = ?, password = ?, role = ?, updatedAt = ? WHERE id = ?',
                    [email, password, role, now, id]
                );
            } else {
                // If password is not changed
                await executeCommand(
                    'UPDATE dashboard_users SET email = ?, role = ?, updatedAt = ? WHERE id = ?',
                    [email, role, now, id]
                );
            }
            return NextResponse.json({ success: true, id });
        } else {
            // Create
            if (!password) {
                return NextResponse.json({ error: 'Password is required for new users' }, { status: 400 });
            }
            const newId = crypto.randomUUID();
            await executeCommand(
                'INSERT INTO dashboard_users (id, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
                [newId, email, password, role, now, now]
            );
            return NextResponse.json({ success: true, id: newId });
        }
    } catch (error) {
        console.error('Save user API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// Delete user
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        await executeCommand('DELETE FROM dashboard_users WHERE id = ?', [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete user API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
