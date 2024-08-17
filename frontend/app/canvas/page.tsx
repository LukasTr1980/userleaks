"use client";

import { useEffect } from 'react';
import { useCanvasSupportStore } from '../store/canvasStore';
import Spinner from '../components/Spinner';

export default function Page() {
    const {
        canvasSupported,
        textApiSupported,
        toDataUrlSupported,
        canvasSignature,
        canvasDataUrl,
        canvasSizeInBytes,
        numberOfColors,
        checkSupport,
    } = useCanvasSupportStore();

    useEffect(() => {
        checkSupport(); // Ensure this function runs only once when the component mounts
    }, [checkSupport]);

    // If any of the required values are null, display the spinner
    const isLoading =
        canvasSupported === null ||
        textApiSupported === null ||
        toDataUrlSupported === null ||
        canvasSignature === null ||
        canvasDataUrl === null ||
        canvasSizeInBytes === null ||
        numberOfColors === null;

    if (isLoading) {
        return <Spinner />;
    }

    // Render the table when everything is loaded (no more "Checking..." messages)
    return (
        <>
            <div className='grid pb-2 px-2'>
                <h3>Canvas Fingerprinting</h3>
            </div>
            <table className="table-auto">
                <tbody>
                    <tr>
                        <td>Canvas 2D API Support Check</td>
                        <td>{canvasSupported ? 'Supported' : 'Not Supported'}</td>
                    </tr>
                    <tr>
                        <td>Canvas Text API</td>
                        <td>{textApiSupported ? 'Supported' : 'Not Supported'}</td>
                    </tr>
                    <tr>
                        <td>Canvas toDataUrl</td>
                        <td>{toDataUrlSupported ? 'Supported' : 'Not Supported'}</td>
                    </tr>
                    <tr>
                        <td>Canvas Fingerprint</td>
                        <td className="break-all">{canvasSignature}</td>
                    </tr>
                    <tr>
                        <td>Canvas File Details</td>
                        <td>
                            {canvasDataUrl && (
                                <img
                                    src={canvasDataUrl}
                                    alt="Canvas Rendered"
                                    className="border border-gray-300"
                                />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Canvas File Size</td>
                        <td>{`${canvasSizeInBytes} bytes`}</td>
                    </tr>
                    <tr>
                        <td>Canvas number of Colors</td>
                        <td>{numberOfColors}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
