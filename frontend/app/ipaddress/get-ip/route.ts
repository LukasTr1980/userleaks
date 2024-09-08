import { NextRequest, NextResponse } from "next/server";
import { promises as dns } from "dns";
import { WebServiceClient } from "@maxmind/geoip2-node";
import { getTimeForTimeZone } from "../../lib/utils";

const accountId = process.env.MAXMIND_ACCOUNT_ID;
const licenseKey = process.env.MAXMIND_LICENSE_KEY;

const devIp = process.env.DEV_IP;

export async function GET(request: NextRequest) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const forwardedFor = isDevelopment
    ? devIp
    : request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || '127.0.0.1';

  console.info(`IP Address used for lookup: ${forwardedFor}`);

  const ipAddresses = (forwardedFor || '127.0.0.1').split(',').map(ip => ip.trim());

  const ipv4 = ipAddresses.find(ip => ip.includes('.'));
  const ipv6 = ipAddresses.find(ip => ip.includes(':'));

  let clienthostname = 'Not available';
  let IpData = null;

  if (ipv4) {
    try {
      const [hostname] = await dns.reverse(ipv4);
      clienthostname = hostname || 'Not available';
    } catch (error) {
      if (error instanceof Error) {
        const dnsError = error as { code?: string };
        if (dnsError.code === 'ENOTFOUND') {
          console.info(`No reverse DNS entry for IP ${ipv4}. Returning 'Not available'.`);
        } else {
          console.error(`Reverse DNS lookup failed for IP ${ipv4}:`, error);
          return NextResponse.json({ message: `Reverse DNS lookup failed for IP ${ipv4}`}, { status: 500 });
        }
      }
    }
  } else {
    clienthostname = 'Not available';
  }

  if (accountId && licenseKey && ipv4) {
    console.info('MaxMind GeoIP lookup initiated...');
    try {
      const client = new WebServiceClient(accountId, licenseKey);

      const maxmindResponse = await client.insights(ipv4);

      const timezone = maxmindResponse.location?.timeZone || null;
      const currentTime = getTimeForTimeZone(timezone);

      IpData = {
        city: maxmindResponse.city?.names || null,
        continent: maxmindResponse.continent?.code || null,
        continentName: maxmindResponse.continent?.names || null,
        country: maxmindResponse.country?.isoCode || null,
        countryName: maxmindResponse.country?.names || null,
        locationLatitude: maxmindResponse.location?.latitude || null,
        locationLongitude: maxmindResponse.location?.longitude || null,
        locationTimezone: timezone || null,
        currentTime: currentTime,
        locationAccuracyRadius: maxmindResponse.location?.accuracyRadius || null,
        postal: maxmindResponse.postal?.code || null,
        connectionType: maxmindResponse.traits?.connectionType || null,
        domain: maxmindResponse.traits?.domain || null,
        isp: maxmindResponse.traits?.isp || null,
        asn: maxmindResponse.traits.autonomousSystemNumber || null,
        network: maxmindResponse.traits?.network || null,
        isAnonymous: maxmindResponse.traits.isAnonymous || null,
        isAnonymousVpn: maxmindResponse.traits?.isAnonymousVpn || null,
        isPublicProxy: maxmindResponse.traits.isPublicProxy || null,
        isResidentialProxy: maxmindResponse.traits.isResidentialProxy || null,
        isTorExitNode: maxmindResponse.traits.isTorExitNode || null,
        queriesRemaining: maxmindResponse.maxmind?.queriesRemaining || null,
      };
      console.info(`Remaining Maxmind Queries: ${IpData.queriesRemaining}`);
    } catch (error) {
      console.error('MaxMind GeoIP lookup failed:', error);
      return NextResponse.json({ message: 'Maxmind GeoIP lookup failed' }, { status: 500 });
    }
  }

  return NextResponse.json({
    ipv4: ipv4 || null,
    ipv6: ipv6 || null,
    clienthostname: clienthostname,
    ipData: IpData || null,
  });
}