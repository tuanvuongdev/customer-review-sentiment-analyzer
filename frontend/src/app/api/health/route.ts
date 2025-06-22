import { NextResponse } from 'next/server';

export async function GET() {
    try {
        return NextResponse.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            service: 'sentiment-analyzer-frontend',
            version: process.env.npm_package_version || '1.0.0',
            uptime: process.uptime(),
        });
    } catch {
        return NextResponse.json(
            {
                status: 'ERROR',
                timestamp: new Date().toISOString(),
                service: 'sentiment-analyzer-frontend',
                error: 'Health check failed',
            },
            { status: 500 }
        );
    }
} 