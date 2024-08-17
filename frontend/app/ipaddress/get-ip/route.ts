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

  let clienthostname = null;
  let geoIpData = null;

  try {
    if (ipv4) {
      const [hostname] = await dns.reverse(ipv4);
      clienthostname = hostname;
    }
  } catch (error) {
    logger.error('Reverse DNS lookup failed:', error);
  }

  if (accountId && licenseKey && ipv4) {
    logger.info('MaxMind GeoIP lookup initiated...');
    try {
      const client = new WebServiceClient(accountId, licenseKey);

      const geoResponse = await client.city(ipv4);

      geoIpData = {
        city: geoResponse.city?.names || null,
        continent: geoResponse.continent?.code || null,
        country: geoResponse.country?.isoCode || null,
        locationLatitude: geoResponse.location?.latitude || null,
        locationLongitude: geoResponse.location?.longitude || null,
        locationTimezone: geoResponse.location?.timeZone || null,
        postal: geoResponse.postal?.code || null,
      };
    } catch (error) {
      logger.error('MaxMind GeoIP lookup failed:', error);
    }
  }

  return NextResponse.json({
    ipv4: ipv4 || null,
    ipv6: ipv6 || null,
    clienthostname: clienthostname || null,
    geoip: geoIpData || null,
  });
}