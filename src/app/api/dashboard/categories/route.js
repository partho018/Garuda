import { NextResponse } from 'next/server';
import { queryRows, executeCommand } from '../../../../lib/db';

// Get all categories
export async function GET() {
    try {
        const categories = await queryRows(
            'SELECT * FROM blog_categories ORDER BY name ASC'
        );
        return NextResponse.json({ success: true, data: categories });
    } catch (error) {
        console.error('Get categories API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// Create or update a category
export async function POST(request) {
    try {
        const { id, name } = await request.json();

        if (!name || !name.trim()) {
            return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
        }

        const trimmedName = name.trim();

        if (id) {
            // Update
            await executeCommand(
                'UPDATE blog_categories SET name = ? WHERE id = ?',
                [trimmedName, id]
            );
            return NextResponse.json({ success: true, id });
        } else {
            // Create
            const newId = crypto.randomUUID();
            await executeCommand(
                'INSERT INTO blog_categories (id, name) VALUES (?, ?)',
                [newId, trimmedName]
            );
            return NextResponse.json({ success: true, id: newId });
        }
    } catch (error) {
        console.error('Save category API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// Delete category
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
        }

        await executeCommand('DELETE FROM blog_categories WHERE id = ?', [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete category API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
