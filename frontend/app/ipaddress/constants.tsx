import { IpData, IpaddressState } from "../store/ipaddressStore.types";

export const IP_DATA = (ipaddress: IpaddressState['ipaddress']) => [
    { label: 'Ipv4 Address', value: ipaddress?.ipv4 || 'Not available' },
    { label: 'Ipv6 Address', value: ipaddress?.ipv6 || 'Not available' },
    { label: 'Hostname', value: ipaddress?.clienthostname || 'Not available' },
];

export const LOCATION_DATA = (ipData: IpData) => [
    { label: 'City', value: ipData.city?.en || 'Not available' },
    { label: 'Continent', value: ipData.continent || 'Not available' },
    { label: 'Country', value: ipData.country || 'Not available' },
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

export const TRAITS_DATA = (ipData: IpData) => [
    { label: 'Internet Service Provider', value: ipData.isp || 'Not available' },
    {
        label: 'Connection Type',
        value: typeof ipData.connectionType === 'object'
            ? ipData.connectionType?.type || 'Not available'
            : ipData.connectionType || 'Not available'
    },
    { label: 'Network', value: ipData.network || 'Not available' },
    { label: 'Domain', value: ipData.domain || 'Not available' },
]