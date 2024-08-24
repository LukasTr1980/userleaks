import { NextRequest, NextResponse } from "next/server";
import logger from "../../lib/logger";

const RIPE_API_BASE_URL = "https://stat.ripe.net/data";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const ipv4 = searchParams.get("ipv4");

    if (!ipv4) {
        logger.error("No IPv4 Address found in Zustand store");
        return;
    }

    const ripeApiUrl = `${RIPE_API_BASE_URL}/abuse-contact-finder/data.json?resource=${ipv4}`;

    try {
        logger.info(`Querying RIPEstat API for IP: ${ipv4}`);
        const response = await fetch(ripeApiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch data from RIPEstat API');
        }

        const data = await response.json();
        const abuseContacts = data?.data?.abuse_contacts || [];

        return NextResponse.json({ abuseContacts });
    } catch (error) {
        logger.error(`RIPEstat lookup failed for IP ${ipv4}`, error);
        return;
    }

}