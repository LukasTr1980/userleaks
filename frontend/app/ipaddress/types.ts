export interface RowData {
    label: string;
    value: string | number | boolean | JSX.Element | null;
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