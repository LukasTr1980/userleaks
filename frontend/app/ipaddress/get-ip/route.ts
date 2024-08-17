import { NextRequest, NextResponse } from "next/server";
import { promises as dns } from "dns";
import logger from "../../lib/logger";

export async function GET(request: NextRequest) {
    const forwardedFor = request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || '127.0.0.1';
    const ipAddresses = forwardedFor.split(',').map(ip => ip.trim());
  
    const ipv4 = ipAddresses.find(ip => ip.includes('.'));
    const ipv6 = ipAddresses.find(ip => ip.includes(':'));

    let clienthostname = null;
    try {
      if(ipv4) {
        const [hostname] = await dns.reverse(ipv4);
        clienthostname = hostname;
      }
    } catch (error) {
      logger.error('Reverse DNS lookup failed:', error);
    }

    return NextResponse.json({
      ipv4: ipv4 || null,
      ipv6: ipv6 || null,
      clienthostname: clienthostname || null,
    });
  }