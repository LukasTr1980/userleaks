"use client";

import { useEffect, useState } from 'react';
import { SUPPORT_CHECK_DATA, CANVAS_DETAILS_DATA, CANVAS_SIGNATURE_DATA } from './constants';
import { useTimeout } from '../components/useTimeout';
import { checkCanvasSupport } from './components/checkCanvasSupport';
import { CanvasSupportState } from './types';
import renderTableRows from './components/renderTableRows';

export default function Page() {
    const [canvasState, setCanvasState] = useState<CanvasSupportState>({
        canvasSupported: null,
        textApiSupported: null,
        toDataUrlSupported: null,
        canvasSignature: null,
        canvasDataUrl: null,
        canvasSizeInBytes: null,
        numberOfColors: null,
    });
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const checkSupport = async () => {
            try {
                const supportState = await checkCanvasSupport();
                setCanvasState(supportState);
            } catch (error) {
                console.error('Error during canvas support check:', error);
                setHasError(true);
            }
        };

        checkSupport();
    }, []);

    const isLoading =
        canvasState.canvasSupported === null ||
        canvasState.textApiSupported === null ||
        canvasState.toDataUrlSupported === null ||
        canvasState.canvasSignature === null ||
        canvasState.canvasDataUrl === null ||
        canvasState.canvasSizeInBytes === null ||
        canvasState.numberOfColors === null;

    const loadingTimeout = useTimeout({ timeoutDuration: 10000, isLoading });

    if (hasError || loadingTimeout) {
        throw new Error('An error occured.');
    }

    return (
        <>
            <div className='grid  pb-2 px-2'>
                <h4>Canvas Fingerprinting</h4>
            </div>
            <div className='grid px-2'><span className='text-gray-600'>Canvas support:</span></div>
            <table className="table-auto">
                <tbody>
                    {renderTableRows({ data: SUPPORT_CHECK_DATA(canvasState), isLoading })}
                </tbody>
            </table>
            <div className='grid px-2'><span className='text-gray-600'>Canvas signature:</span></div>
            <table className='table-auto'>
                <tbody>
                    {renderTableRows({ data: CANVAS_SIGNATURE_DATA(canvasState), isLoading })}
                </tbody>
            </table>
            <div className='grid px-2'><span className='text-gray-600'>Canvas Image Details:</span></div>
            <table className='table-auto'>
                <tbody>
                    {renderTableRows({ data: CANVAS_DETAILS_DATA(canvasState), isLoading })}
                </tbody>
            </table>
        </>
    );
}
