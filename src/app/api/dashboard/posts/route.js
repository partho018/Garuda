import { NextResponse } from 'next/server';
import { queryRows, executeCommand } from '../../../../lib/db';

// Get all posts
export async function GET() {
    try {
        const posts = await queryRows(
            'SELECT * FROM blog_posts ORDER BY createdAt DESC'
        );

        // Convert categories JSON string back to array
        const formatted = posts.map(p => {
            let catsArray = [];
            try {
                catsArray = JSON.parse(p.categories);
            } catch (e) {
                catsArray = p.category ? [p.category] : [];
            }
            return {
                ...p,
                categories: catsArray
            };
        });

        return NextResponse.json({ success: true, data: formatted });
    } catch (error) {
        console.error('Get posts API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// Create or update a post
export async function POST(request) {
    try {
        const data = await request.json();
        const {
            id, title, slug, category, categories, shortDesc, content,
            author, date, tags, status, thumbnail, seoTitle, seoDesc,
            viewCount, scheduledAt
        } = data;

        if (!title || !content) {
            return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
        }

        const now = new Date().toISOString();
        const catsJson = JSON.stringify(categories || [category || 'Other']);
        const primaryCat = category || (categories && categories[0]) || 'Other';

        if (id) {
            // Update existing post
            await executeCommand(
                `UPDATE blog_posts SET 
                    title = ?, slug = ?, category = ?, categories = ?, shortDesc = ?, 
                    content = ?, author = ?, date = ?, tags = ?, status = ?, 
                    thumbnail = ?, seoTitle = ?, seoDesc = ?, viewCount = ?, 
                    scheduledAt = ?, updatedAt = ?
                 WHERE id = ?`,
                [
                    title, slug, primaryCat, catsJson, shortDesc || '', 
                    content, author || 'Admin', date || now.split('T')[0], tags || '', 
                    status || 'draft', thumbnail || '', seoTitle || '', seoDesc || '', 
                    viewCount || 0, scheduledAt || '', now, id
                ]
            );
            return NextResponse.json({ success: true, id });
        } else {
            // Create new post
            const newId = crypto.randomUUID();
            await executeCommand(
                `INSERT INTO blog_posts (
                    id, title, slug, category, categories, shortDesc, content,
                    author, date, tags, status, thumbnail, seoTitle, seoDesc,
                    viewCount, scheduledAt, createdAt, updatedAt
                 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    newId, title, slug, primaryCat, catsJson, shortDesc || '', 
                    content, author || 'Admin', date || now.split('T')[0], tags || '', 
                    status || 'draft', thumbnail || '', seoTitle || '', seoDesc || '', 
                    viewCount || 0, scheduledAt || '', now, now
                ]
            );
            return NextResponse.json({ success: true, id: newId });
        }
    } catch (error) {
        console.error('Save post API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// Delete post(s)
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const idsParam = searchParams.get('ids'); // comma separated for bulk delete

        if (idsParam) {
            const ids = idsParam.split(',').filter(Boolean);
            if (ids.length === 0) {
                return NextResponse.json({ error: 'No IDs specified' }, { status: 400 });
            }
            
            // Build parameter placeholders for SQL: IN (?, ?, ?)
            const placeholders = ids.map(() => '?').join(',');
            await executeCommand(`DELETE FROM blog_posts WHERE id IN (${placeholders})`, ids);
            return NextResponse.json({ success: true });
        }

        if (!id) {
            return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
        }

        await executeCommand('DELETE FROM blog_posts WHERE id = ?', [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete post API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// Bulk update status or category
export async function PUT(request) {
    try {
        const { ids, status, category } = await request.json();

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'Array of post IDs is required' }, { status: 400 });
        }

        const now = new Date().toISOString();
        const placeholders = ids.map(() => '?').join(',');

        if (status !== undefined) {
            await executeCommand(
                `UPDATE blog_posts SET status = ?, updatedAt = ? WHERE id IN (${placeholders})`,
                [status, now, ...ids]
            );
        } else if (category !== undefined) {
            // Update the category and append it to categories array JSON
            // For each post, we should ideally fetch it and update, but for SQLite we can do a simple update:
            // For bulk moving, we will update the primary category. To keep it simple, we can set the categories array
            // to just contain this category.
            const catsJson = JSON.stringify([category]);
            await executeCommand(
                `UPDATE blog_posts SET category = ?, categories = ?, updatedAt = ? WHERE id IN (${placeholders})`,
                [category, catsJson, now, ...ids]
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Bulk update posts API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
