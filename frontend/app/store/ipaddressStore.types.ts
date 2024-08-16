export interface IpaddressState {
    ipaddress: {
        ipv4: string | null;
        ipv6: string | null;
    } | null;
    retrieveIpaddress: () => void;
}