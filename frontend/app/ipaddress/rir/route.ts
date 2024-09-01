import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const ipv4 = searchParams.get("ipv4");
    const rirUrl = searchParams.get("rirUrl");

    if (!ipv4 || !rirUrl) {
        console.error("No IPv4 Address or RIR URL found in Zustand store");
        return NextResponse.json({ error: "No Ipv4 Address or RIR URL provided" }, { status: 400 });
    }

    try {
        const apiUrl = `${rirUrl}${ipv4}`;
        console.info(`Querying RIR RDAP API for IP: ${ipv4} via URL: ${rirUrl}`)

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from RIR RDAP API for IP: ${ipv4}`);
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        if (error instanceof Error) {
            console.error(`RIR RDAP API lookup failed for IP ${ipv4}`, error);
            return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
        }
    }
}