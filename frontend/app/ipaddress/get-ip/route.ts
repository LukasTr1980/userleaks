import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const forwardedFor = request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || '127.0.0.1';
    const ipAddresses = forwardedFor.split(',').map(ip => ip.trim());
  
    const ipv4 = ipAddresses.find(ip => ip.includes('.'));
    const ipv6 = ipAddresses.find(ip => ip.includes(':'));
  
    return NextResponse.json({
      ipv4: ipv4 || null,
      ipv6: ipv6 || null,
    });
  }