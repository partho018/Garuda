import { NextResponse } from 'next/server';
import { queryRows } from '../../../lib/db';

export async function GET() {
    try {
        const posts = await queryRows(
            "SELECT * FROM blog_posts WHERE status = 'published' ORDER BY date DESC, createdAt DESC"
        );

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
        console.error('Get public blogs API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
