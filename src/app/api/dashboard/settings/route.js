import { NextResponse } from 'next/server';
import { queryRow, executeCommand } from '../../../../lib/db';

// Get site settings
export async function GET() {
    try {
        const setting = await queryRow(
            "SELECT value FROM site_settings WHERE key = 'general'"
        );
        
        let settingsData = {
            contactEmail: 'hello@garuda.com',
            facebookUrl: '',
            twitterUrl: '',
            instagramUrl: '',
            linkedinUrl: '',
            seoTitle: 'Garuda - Design Agency',
            seoDescription: 'High-end design agency focusing on conversions.'
        };
        
        if (setting && setting.value) {
            try {
                settingsData = JSON.parse(setting.value);
            } catch (e) {
                console.error('Failed to parse settings JSON:', e);
            }
        }
        
        return NextResponse.json({ success: true, data: settingsData });
    } catch (error) {
        console.error('Get settings API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// Update site settings
export async function POST(request) {
    try {
        const settingsData = await request.json();
        
        // Save as JSON string
        const jsonValue = JSON.stringify(settingsData);
        
        await executeCommand(
            "INSERT OR REPLACE INTO site_settings (key, value) VALUES ('general', ?)",
            [jsonValue]
        );
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Save settings API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
