import React from "react";

export interface RowData {
    label: string;
    value: string | number | boolean | React.JSX.Element | null;
}

export interface ErrorBoundaryProps {
    error: Error & { status?: number, digest?: string };
    reset: () => void;
}

export interface RenderTableRowProps {
    data: RowData[];
    isLoading: boolean;
}

export type RIRType = "RIPE NCC" | "APNIC" | "ARIN" | "LACNIC" | "AFRINIC";

export type DetermineRIRType = (ipv4: string) => Promise<string>;

export interface VCardItem {
    0: string;
    1: { type?: string };
    2: string;
    3: string;
}

export interface RirData {
    handle: string | null;
    cidr: string | null;
    name: string | null;
    netType: string | null;
    abuseContact: string | null;
}

export interface IpData {
    city: { [key: string]: string } | null,
    continent: string | null,
    continentName: { [key: string]: string } | null,
    country: string | null,
    countryName: { [key: string]: string } | null,
    locationLatitude: number | null,
    locationLongitude: number | null,
    locationTimezone: string | null,
    currentTime: string | null,
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