import { GeoIpData, IpaddressState } from "../store/ipaddressStore.types";

export const IP_DATA = (ipaddress: IpaddressState['ipaddress']) => [
    { label: 'Ipv4 Address', value: ipaddress?.ipv4 || 'Not available' },
    { label: 'Ipv6 Address', value: ipaddress?.ipv6 || 'Not available' },
    { label: 'Hostname', value: ipaddress?.clienthostname || 'Not available' },
];

export const LOCATION_DATA = (geoip: GeoIpData) => [
    { label: 'City', value: geoip.city?.en || 'Not available' },
    { label: 'Continent', value: geoip.continent || 'Not available' },
    { label: 'Country', value: geoip.country || 'Not available' },
    {
        label: 'Location (Lat, Long)',
        value: geoip.locationLatitude && geoip.locationLongitude
            ? `${geoip.locationLatitude}, ${geoip.locationLongitude}`
            : 'Not available'
    },
    { label: 'AccuracyRadius', value: `${geoip.locationAccuracyRadius} km` || 'Not available' },
    { label: 'Timezone', value: geoip.locationTimezone || 'Not available' },
    { label: 'Postal', value: geoip.postal || 'Not available' },
];

export const TRAITS_DATA = (geoip: GeoIpData) => [
    { label: 'Internet Service Provider', value: geoip.isp || 'Not available' },
    {
        label: 'Connection Type',
        value: typeof geoip.connectionType === 'object'
            ? geoip.connectionType?.type || 'Not available'
            : geoip.connectionType || 'Not available'
    },
    { label: 'Network', value: geoip.network || 'Not available' },
    { label: 'Domain', value: geoip.domain || 'Not available' },
]