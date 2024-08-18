export interface GeoIpData {
    city: { [key: string]: string } | null,
    continent: string | null,
    country: string | null,
    locationLatitude: number | null,
    locationLongitude: number | null,
    locationTimezone: string | null,
    locationAccuracyRadius: number | null,
    postal: string | null,
    connectionType: { type: string } | null,
    domain: string | null,
    isp: string | null,
    network: string | null,
}

export interface IpaddressState {
    ipaddress: {
        ipv4: string | null;
        ipv6: string | null;
        clienthostname: string | null;
        geoip: GeoIpData | null;
    } | null;
    retrieveIpaddress: () => void;
}