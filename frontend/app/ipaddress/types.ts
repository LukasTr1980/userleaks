export interface RowData {
    label: string;
    value: string | number | boolean | null;
}

export interface ErrorBoundaryProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export interface RenderTableRowProps {
    data: RowData[];
    isLoading: boolean;
}