export interface IpData {
    city: { [key: string]: string } | null,
    continent: string | null,
    continentName: { [key: string]: string } | null,
    country: string | null,
    countryName: { [key: string]: string } | null,
    locationLatitude: number | null,
    locationLongitude: number | null,
    locationTimezone: string | null,
    locationAccuracyRadius: number | null,
    postal: string | null,
    connectionType: { type: string } | null,
    domain: string | null,
    isp: string | null,
    asn: number | null,
    network: string | null,
    isAnonymous: boolean | null,
    isAnonymousVpn: boolean | null,
    isPublicProxy: boolean | null,
    isResidentialProxy: boolean | null,
    isTorExitNode: boolean | null,
}

export interface IpaddressState {
    ipaddress: {
        ipv4: string | null;
        ipv6: string | null;
        clienthostname: string | null;
        ipData: IpData | null;
    } | null;

    error: string | null,

    retrieveIpaddress: () => void;
}