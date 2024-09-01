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