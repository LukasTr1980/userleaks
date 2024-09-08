import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory, RateLimiterAbstract } from "rate-limiter-flexible";

let rateLimiter: RateLimiterAbstract | null = null;

async function initializeRateLimiter() {
    if (rateLimiter) return;

    rateLimiter = new RateLimiterMemory({
        points: 50,
        duration: 60 * 10,
    })
    console.info('In-memory rate limiter initialized');
}

export async function middleware(req: NextRequest) {
    console.info('Middleware execution started');

    await initializeRateLimiter();
    const clientIp = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
    console.info(`Client IP: ${clientIp} - Attempting to access ${req.nextUrl.pathname}`);
    
    try {
        if (rateLimiter) {
            await rateLimiter.consume(clientIp);
            console.info(`Client IP: ${clientIp} - Allowed access to ${req.nextUrl.pathname}`);
            return NextResponse.next()
        }
    } catch (rateLimiterRes) {
        console.warn(`Client IP: ${clientIp} - Rate limit exceeded. Access denied to ${req.nextUrl.pathname}`);
        return NextResponse.json({ message: 'Too many requests, try again later.' }, { status: 429 });
    }

}

export const config = {
    matcher: ['/ipaddress/get-ip']
};