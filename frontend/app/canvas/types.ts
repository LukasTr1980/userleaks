import React from "react";

export interface RowData {
    label: string;
    value: string | number | React.JSX.Element | null;
}

export interface ErrorBoundaryProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export interface RenderTableRowProps {
    data: RowData[];
    isLoading: boolean;
}

export interface CanvasSupportState {
    canvasSupported: boolean | null;
    textApiSupported: boolean | null;
    toDataUrlSupported: boolean | null;
    canvasSignature: string | null;
    canvasDataUrl: string | null;
    canvasSizeInBytes: number | null;
    numberOfColors: number | null;
}