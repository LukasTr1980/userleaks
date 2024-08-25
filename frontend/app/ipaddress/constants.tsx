import { IpData, RipeData, IpaddressState } from "../store/ipaddressStore.types";
import { booleanToString, renderFlagIcon } from "../lib/utils";

export const DEFAULT_IP_DATA: IpData = {
    city: null,
    continent: null,
    country: null,
    locationLatitude: null,
    locationLongitude: null,
    locationTimezone: null,
    locationAccuracyRadius: null,
    postal: null,
    connectionType: null,
    domain: null,
    isp: null,
    network: null,
    isAnonymous: null,
    isAnonymousVpn: null,
    isPublicProxy: null,
    isResidentialProxy: null,
    isTorExitNode: null,
};

export const DEFAULT_RIPE_DATA: RipeData = {
    abuseContact: null,
    addressSpaceHierarchy: null,
    prefixOverview: null,
};

export const RIPE_API_QUERIES = [
    "abuse-contact-finder",
    "address-space-hierarchy",
    "prefix-overview",
];

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
                    {renderFlagIcon(ipData.continent, 'continent')} {ipData.continent}
                </span>
            )
            : 'Not available'
    },
    {
        label: 'Country',
        value: ipData.country
            ? (
                <span>
                    {renderFlagIcon(ipData.country, 'country')} {ipData.country}
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
    { label: 'AccuracyRadius', value: `${ipData.locationAccuracyRadius} km` || 'Not available' },
    { label: 'Timezone', value: ipData.locationTimezone || 'Not available' },
    { label: 'Postal', value: ipData.postal || 'Not available' },
];

export const TRAITS_DATA = (ipData: IpData, ripeData: RipeData) => [
    {
        label: 'Internet Service Provider',
        value: ipData.isp ? (
            <span>
                {ipData.isp}
                {ripeData.prefixOverview?.asn ? (
                    <>
                        {' '}
                        (<a
                            href={`https://bgp.tools/as/${ripeData.prefixOverview.asn}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            AS{ripeData.prefixOverview.asn}
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

export const RIPE_DATA = (ripeData: RipeData) => [
    { label: 'Net Range', value: ripeData.addressSpaceHierarchy?.inetnum || 'Not available' },
    { label: 'CIDR', value: ripeData.addressSpaceHierarchy?.resource || 'Not available' },
    { label: 'Net Name', value: ripeData.addressSpaceHierarchy?.netname || 'Not available' },
    { label: 'Net Type', value: ripeData.addressSpaceHierarchy?.status || 'Not available' },
    { label: 'Description', value: ripeData.addressSpaceHierarchy?.descr || 'Not available' },
    {
        label: 'Abuse Contact',
        value: ripeData.abuseContact && ripeData.abuseContact.length > 0
            ? ripeData.abuseContact.join(', ')
            : 'Not available',
    }
];