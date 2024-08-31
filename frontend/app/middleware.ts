import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory, RateLimiterRedis, RateLimiterAbstract } from "rate-limiter-flexible";
import Redis from 'redis';
import logger from "./lib/logger";

let rateLimiter: RateLimiterAbstract | null = null;

async function initializeRateLimiter() {
    if (rateLimiter) return;

    if (process.env.USE_REDIS == 'true') {
        logger.info('Initializing Redis-based rate limiter...');
        const redisClient = Redis.createClient({
            url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
            password: process.env.REDIS_PASSWORD,
        });

        redisClient.on('error', (err) => logger.error('Redis client Error', err));

        await redisClient.connect();

        rateLimiter = new RateLimiterRedis({
            storeClient: redisClient,
            points: 10,
            duration: 60 * 10,
            keyPrefix: 'userleaks-rate-limit',
        });
        logger.info('Redis-based rate limiter initialized.');
    } else {
        logger.info('Initializing in-memory rate limiter...');
        rateLimiter = new RateLimiterMemory({
            points: 10,
            duration: 60 * 10,
        });
        logger.info('In-memory rate limiter initialized');
    }
}

export async function middleware(req: NextRequest) {
    await initializeRateLimiter();
    const clientIp = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
    logger.info(`Client IP: ${clientIp} - Attempting to access ${req.nextUrl.pathname}`);

    try {
        if (rateLimiter) {
            await rateLimiter.consume(clientIp);
            logger.info(`Client IP: ${clientIp} - Allowed access to ${req.nextUrl.pathname}`);
            return NextResponse.next();
        }
    } catch (rateLimiterRes) {
        logger.warn(`Client IP: ${clientIp} - Rate limit exceeded. Access denied to ${req.nextUrl.pathname}`);
        const error = new Error('Too many Requests') as Error &{ status?: number };
        error.status = 429
        throw error;
    }
}

export const config = {
    matcher: ['/ipaddress/get-ip']
}