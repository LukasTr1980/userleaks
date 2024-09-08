import { IpData, IpaddressState } from "./types";
import { booleanToString, renderFlagIcon } from "../lib/utils";
import { RirData } from "./types";
import { RIRType } from "./types";

export const DEFAULT_IP_DATA: IpData = {
    city: null,
    continent: null,
    continentName: null,
    country: null,
    countryName: null,
    locationLatitude: null,
    locationLongitude: null,
    locationTimezone: null,
    currentTime: null,
    locationAccuracyRadius: null,
    postal: null,
    connectionType: null,
    domain: null,
    isp: null,
    asn: null,
    network: null,
    isAnonymous: null,
    isAnonymousVpn: null,
    isPublicProxy: null,
    isResidentialProxy: null,
    isTorExitNode: null,
};

export const DEFAULT_RIR_DATA: RirData = {
    handle: null,
    cidr: null,
    name: null,
    netType: null,
    abuseContact: null,
};

export const RIR_API_BASE_URLS: Record<RIRType, string> = {
    "RIPE NCC": "https://rdap.db.ripe.net/ip/",
    "APNIC": "https://rdap.apnic.net/ip/",
    "ARIN": "https://rdap.arin.net/registry/ip/",
    "LACNIC": "https://rdap.lacnic.net/rdap/ip/",
    "AFRINIC": "https://rdap.afrinic.net/rdap/ip/",
};

export const IP_DATA = (ipaddress: IpaddressState['ipaddress']) => [
    {
        label: 'Ipv4 Address',
        value: ipaddress?.ipv4
            ? (
                <span>
                    {renderFlagIcon(ipaddress?.ipData?.country || null, 'country')} {ipaddress.ipv4}
                </span>
            )
            : 'Not available'
    },
    { label: 'Ipv6 Address', value: ipaddress?.ipv6 || 'Not available' },
    { label: 'Hostname', value: ipaddress?.clienthostname || 'Not available' },
];

export const LOCATION_DATA = (ipData: IpData) => [
    { label: 'City', value: ipData.city?.en || 'Not available' },
    {
        label: 'Continent',
        value: ipData.continent
            ? (
                <span>
                    {renderFlagIcon(ipData.continent, 'continent')} {ipData.continentName?.en} ({ipData.continent})
                </span>
            )
            : 'Not available'
    },
    {
        label: 'Country',
        value: ipData.country
            ? (
                <span>
                    {renderFlagIcon(ipData.country, 'country')} {ipData.countryName?.en} ({ipData.country})
                </span>
            )
            : 'Not available'
    },
    {
        label: 'Location (Lat, Long)',
        value: ipData.locationLatitude && ipData.locationLongitude
            ? `${ipData.locationLatitude}, ${ipData.locationLongitude}`
            : 'Not available'
    },
    {
        label: 'AccuracyRadius',
        value: ipData.locationAccuracyRadius != null
            ? `${ipData.locationAccuracyRadius} km`
            : 'Not available'
    },
    { label: 'Timezone', value: ipData.locationTimezone || 'Not available' },
    { label: 'Local Time', value: ipData.currentTime || 'Not available' },
    { label: 'Postal', value: ipData.postal || 'Not available' },
];

export const TRAITS_DATA = (ipData: IpData) => [
    {
        label: 'Internet Service Provider',
        value: ipData.isp ? (
            <span>
                {ipData.isp}
                {ipData.asn ? (
                    <>
                        {' '}
                        (<a
                            href={`https://bgp.tools/as/${ipData.asn}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            AS{ipData.asn}
                        </a>)
                    </>
                ) : ''}
            </span>
        ) : 'Not available',
    },
    {
        label: 'Connection Type',
        value: typeof ipData.connectionType === 'object'
            ? ipData.connectionType?.type || 'Not available'
            : ipData.connectionType || 'Not available'
    },
    { label: 'Network', value: ipData.network || 'Not available' },
    { label: 'Domain', value: ipData.domain || 'Not available' },
];

export const VPN_PROXY_TOR_DATA = (ipData: IpData) => [
    { label: 'Is Anonymous', value: booleanToString(ipData.isAnonymous) },
    { label: 'Is Anonymous VPN', value: booleanToString(ipData.isAnonymousVpn) },
    { label: 'Is Public Proxy', value: booleanToString(ipData.isPublicProxy) },
    { label: 'Is Residential Proxy', value: booleanToString(ipData.isResidentialProxy) },
    { label: 'Is Tor Exit Node', value: booleanToString(ipData.isTorExitNode) },
];

export const RIR_DATA = (rirData: RirData) => [
    { label: 'Net Range', value: rirData.handle || 'Not available' },
    { label: 'CIDR', value: rirData.cidr || 'Not available' },
    { label: 'Net Name', value: rirData.name || 'Not available' },
    { label: 'Net Type', value: rirData.netType || 'Not available' },
    { label: 'Abuse Contact', value: rirData.abuseContact || 'Not available' },
];