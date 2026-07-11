import { NextResponse } from 'next/server';
import { queryRows, executeCommand } from '../../../../lib/db';

// Get all media library items
export async function GET() {
    try {
        const media = await queryRows(
            'SELECT * FROM media_library ORDER BY createdAt DESC'
        );
        return NextResponse.json({ success: true, data: media });
    } catch (error) {
        console.error('Get media API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// Add media item (url is base64 or external url)
export async function POST(request) {
    try {
        const { name, url } = await request.json();

        if (!name || !url) {
            return NextResponse.json({ error: 'Name and URL/data are required' }, { status: 400 });
        }

        const id = crypto.randomUUID();
        const now = new Date().toISOString();

        await executeCommand(
            'INSERT INTO media_library (id, name, url, createdAt) VALUES (?, ?, ?, ?)',
            [id, name, url, now]
        );

        return NextResponse.json({ success: true, data: { id, name, url, createdAt: now } });
    } catch (error) {
        console.error('Save media API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// Delete media item
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Media ID is required' }, { status: 400 });
        }

        await executeCommand('DELETE FROM media_library WHERE id = ?', [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete media API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
