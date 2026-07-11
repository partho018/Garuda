import { NextResponse } from 'next/server';
import { queryRow } from '../../../../lib/db';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Check user in Cloudflare D1 Database
        const user = await queryRow(
            'SELECT email, role FROM dashboard_users WHERE email = ? AND password = ?',
            [email, password]
        );

        if (user) {
            return NextResponse.json({
                success: true,
                user: {
                    email: user.email,
                    role: user.role
                }
            });
        }

        return NextResponse.json({ success: false, error: 'Incorrect email or password' }, { status: 401 });
    } catch (error) {
        console.error('Login API error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
