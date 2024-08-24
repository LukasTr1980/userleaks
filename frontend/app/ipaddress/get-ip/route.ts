import { NextRequest, NextResponse } from "next/server";
import { promises as dns } from "dns";
import { WebServiceClient } from "@maxmind/geoip2-node";
import logger from "../../lib/logger";

const accountId = process.env.MAXMIND_ACCOUNT_ID;
const licenseKey = process.env.MAXMIND_LICENSE_KEY;

const devIp = '188.34.152.146';

export async function GET(request: NextRequest) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  logger.debug(`Environment: ${process.env.NODE_ENV}`);
  logger.debug(`MaxMind Account ID: ${accountId}`);

  const forwardedFor = isDevelopment
    ? devIp
    : request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || '127.0.0.1';

  logger.info(`IP Address used for lookup: ${forwardedFor}`);

  const ipAddresses = forwardedFor.split(',').map(ip => ip.trim());

  const ipv4 = ipAddresses.find(ip => ip.includes('.'));
  const ipv6 = ipAddresses.find(ip => ip.includes(':'));

  let clienthostname = 'Not available';
  let IpData = null;

  if (ipv4) {
    try {
      const [hostname] = await dns.reverse(ipv4);
      clienthostname = hostname || 'Not available';
    } catch (error) {
      if (Error instanceof Error) {
        const dnsError = error as { code?: string };
        if (dnsError.code === 'ENOTFOUND') {
          logger.info(`No reverse DNS entry for IP ${ipv4}. Returning 'Not available'.`);
        } else {
          logger.error(`Reverse DNS lookup failed for IP ${ipv4}:`, error);
        }
      }
    }
  }

  if (accountId && licenseKey && ipv4) {
    logger.info('MaxMind GeoIP lookup initiated...');
    try {
      const client = new WebServiceClient(accountId, licenseKey);

      const maxmindResponse = await client.insights(ipv4);

      IpData = {
        city: maxmindResponse.city?.names || null,
        continent: maxmindResponse.continent?.code || null,
        country: maxmindResponse.country?.isoCode || null,
        locationLatitude: maxmindResponse.location?.latitude || null,
        locationLongitude: maxmindResponse.location?.longitude || null,
        locationTimezone: maxmindResponse.location?.timeZone || null,
        locationAccuracyRadius: maxmindResponse.location?.accuracyRadius || null,
        postal: maxmindResponse.postal?.code || null,
        connectionType: maxmindResponse.traits?.connectionType || null,
        domain: maxmindResponse.traits?.domain || null,
        isp: maxmindResponse.traits?.isp || null,
        network: maxmindResponse.traits?.network || null,
        isAnonymous: maxmindResponse.traits.isAnonymous || null,
        isAnonymousVpn: maxmindResponse.traits?.isAnonymousVpn || null,
        isPublicProxy: maxmindResponse.traits.isPublicProxy || null,
        isResidentialProxy: maxmindResponse.traits.isResidentialProxy || null,
        isTorExitNode: maxmindResponse.traits.isTorExitNode || null,
      };
    } catch (error) {
      logger.error('MaxMind GeoIP lookup failed:', error);
    }
  }

  return NextResponse.json({
    ipv4: ipv4 || null,
    ipv6: ipv6 || null,
    clienthostname: clienthostname,
    ipData: IpData || null,
  });
}