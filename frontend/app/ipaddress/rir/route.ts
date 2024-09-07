import { NextRequest, NextResponse } from "next/server";
import { determineRIR } from "../components/determineRIR";
import { RIR_API_BASE_URLS } from "../constants";
import { RIRType, VCardItem } from "../types";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const ipv4 = searchParams.get("ipv4");

    if (!ipv4) {
        console.error('No IPV4 Address found.');
        return NextResponse.json({ error: "No Ipv4 Address provided" }, { status: 400 });
    }

    try {
        const rir = await determineRIR(ipv4) as RIRType;
        console.log(`Responsible RIR for IP ${ipv4}: ${rir}`);

        const rirApiBaseUrl = RIR_API_BASE_URLS[rir];
        if (!rirApiBaseUrl) {
            throw new Error(`No API URL found for RIR: ${rir}`);
        }

        const apiUrl = `${rirApiBaseUrl}${ipv4}`;
        console.info(`Querying RIR RDAP API for IP: ${ipv4} via URL: ${apiUrl}`);

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from RIR RDAP API for IP: ${ipv4}`);
        }

        const rirData = await response.json();
        const handle = rirData.handle || null;
        const cidr = rirData.cidr0_cidrs && rirData.cidr0_cidrs.length > 0
            ? `${rirData.cidr0_cidrs[0].v4prefix}/${rirData.cidr0_cidrs[0].length}`
            : null;
        const name = rirData.name || null;
        const netType = rirData.type || null;

        let abuseContact = null;

        if (rirData.remarks && rirData.remarks.length > 0) {
            for (const remark of rirData.remarks) {
                const abuseEmail = remark.description.find((desc: string) => desc.toLowerCase().includes('abuse@'));
                if (abuseEmail) {
                    abuseContact = abuseEmail;
                    break;
                }
            }
        }

        if (!abuseContact && rirData.entities && rirData.entities.length > 0) {
            for (const entity of rirData.entities) {
                const vcard = entity.vcardArray?.[1];

                if (vcard) {
                    const emailEntry = vcard.find((item: VCardItem) => item[0] === 'email');
                    const hasAbuseRole = entity.roles.includes('abuse');
                    const isAbuseEmail = emailEntry && emailEntry[3]?.toLowerCase().includes('abuse');

                    if (hasAbuseRole || isAbuseEmail) {
                        abuseContact = emailEntry[3];
                        break;
                    }
                }

                if (entity.remarks && entity.remarks.length > 0) {
                    for (const remark of entity.remarks) {
                        const abuseEmail = remark.description.find((desc: string) => desc.toLowerCase().includes('abuse@'));
                        if (abuseEmail) {
                            abuseContact = abuseEmail;
                            break;
                        }
                    }
                }
            }
        }

        return NextResponse.json({
            rir,
            rirData: {
                handle,
                cidr,
                name,
                netType,
                abuseContact
            }
        });
    } catch (error) {
        console.error('Error fetching RIR data:', error);
        return NextResponse.json({ message: 'Failed to retrieve RIR data' }, { status: 500 });
    }
}