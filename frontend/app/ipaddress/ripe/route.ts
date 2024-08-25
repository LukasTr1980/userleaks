import { NextRequest, NextResponse } from "next/server";
import { RIPE_API_QUERIES, RIPE_API_MAPPINGS } from "../constants";
import logger from "../../lib/logger";

const RIPE_API_BASE_URL = "https://stat.ripe.net/data";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const ipv4 = searchParams.get("ipv4");

    if (!ipv4) {
        logger.error("No IPv4 Address found in Zustand store");
        return NextResponse.json({ error: "No Ipv4 Address provided" }, { status: 400 });
    }

    try {
        const fetchPromises = RIPE_API_QUERIES.map(async (query) => {
            const ripeApiUrl = `${RIPE_API_BASE_URL}/${query}/data.json?resource=${ipv4}`;
            logger.info(`Querying RIPEstat API for IP: ${ipv4}, Query: ${query}`);

            const response = await fetch(ripeApiUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch data from RIPEstat API for query: ${query}`);
            }
            const data = await response.json();

            const key = RIPE_API_MAPPINGS[query];

            if (query ==="address-space-hierarchy") {
                const addressSpace = data?.data?.exact?.[0];
                const resource = data?.data?.resource;

                return {
                    [query]: {
                        resource: resource || null,
                        inetnum: addressSpace ? addressSpace.inetnum : null,
                        netname: addressSpace ? addressSpace.netname : null,
                        descr: addressSpace ? addressSpace.descr : null,
                        status: addressSpace ? addressSpace.status : null,
                    }
                };
            }

            return { [query]: data?.data?.[key] || null }
        });
        
        const queryResultArray = await Promise.all(fetchPromises);

        const results = Object.assign({}, ...queryResultArray);
        return NextResponse.json(results);
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`RIPEstat lookup failed for IP ${ipv4}`, error);
            return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
        }
    }
}