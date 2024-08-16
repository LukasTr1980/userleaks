export interface CanvasSupportState {
    canvasSupported: boolean | null;
    textApiSupported: boolean | null;
    toDataUrlSupported: boolean | null;
    canvasSignature: string | null;
    canvasDataUrl: string | null;
    canvasSizeInBytes: number | null;
    numberOfColors: number | null;
    checkSupport: () => void;
}