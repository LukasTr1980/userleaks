import { CanvasSupportState } from "../store/canvasStore.types"

export const SUPPORT_CHECK_DATA = (state: CanvasSupportState) => [
    { label: 'Canvas 2D API Support check', value: state.canvasSupported ? 'Supported' : 'Not Supported' },
    { label: 'Canvas Text API', value: state.textApiSupported ? 'Supported' : 'Not Supported' },
    { label: 'Canvas toDataUrl', value: state.toDataUrlSupported ? 'Supported' : 'Not Supported' },
];

export const CANVAS_SIGNATURE_DATA = (state: CanvasSupportState) => [
    { label: 'Canvas Fingerprint', value: state.canvasSignature || 'Not available' },
];

export const CANVAS_DETAILS_DATA = (state: CanvasSupportState) => [
    {
        label: 'Canvas File Details',
        value: state.canvasDataUrl ? (
            <img
            src={state.canvasDataUrl}
            alt="Canvas Rendered"
            className="border border-gray-300"
            />
        ) : 'Not available',
    },
    { label: 'Canvas File Size', value: state.canvasSizeInBytes ? `${state.canvasSizeInBytes}` : 'Not available' },
    { label: 'Canvas number of Colors', value: state.numberOfColors || 'Not available' },
];