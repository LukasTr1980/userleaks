"use client";

import { useEffect, useState } from 'react';
import { useCanvasSupportStore } from '../store/canvasStore';
import Loading from './loading';
import { RenderTableRowProps } from './types';
import { SUPPORT_CHECK_DATA, CANVAS_DETAILS_DATA, CANVAS_SIGNATURE_DATA } from './constants';
import { useTimeout } from '../components/useTimeout';

export default function Page() {
    const canvasstate = useCanvasSupportStore();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        try {
            canvasstate.checkSupport();
        } catch (error) {
            console.error('Error during canvas support check:', error);
            setHasError(true);
        }
    }, [canvasstate]);

    const isLoading =
        canvasstate.canvasSupported === null ||
        canvasstate.textApiSupported === null ||
        canvasstate.toDataUrlSupported === null ||
        canvasstate.canvasSignature === null ||
        canvasstate.canvasDataUrl === null ||
        canvasstate.canvasSizeInBytes === null ||
        canvasstate.numberOfColors === null;

    const loadingTimeout = useTimeout({ timeoutDuration: 10000, isLoading });

    if (hasError || loadingTimeout) {
        throw new Error('An error occured.');
    }

    const renderTableRows = ({ data, isLoading }: RenderTableRowProps) => {
        return data.map((item, index) => (
            <tr key={index}>
                <td className='w-1/3'>{item.label}</td>
                <td
                    className={`
                    ${item.label === 'Canvas Fingerprint' ? 'break-all' : ''}
                    ${item.label === 'Canvas Image' ? 'h-14' : ''}
                    `}
                >
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <span className={item.value === 'Not available' ? 'text-gray-300' : ''}>
                            {item.value || 'Not available'}
                        </span>
                    )}
                </td>
            </tr>
        ))
    }

    return (
        <>
            <div className='grid  pb-2 px-2'>
                <h4>Canvas Fingerprinting</h4>
            </div>
            <div className='grid px-2'><span className='text-gray-600'>Canvas support:</span></div>
            <table className="table-auto">
                <tbody>
                    {renderTableRows({ data: SUPPORT_CHECK_DATA(canvasstate), isLoading })}
                </tbody>
            </table>
            <div className='grid px-2'><span className='text-gray-600'>Canvas signature:</span></div>
            <table className='table-auto'>
                <tbody>
                    {renderTableRows({ data: CANVAS_SIGNATURE_DATA(canvasstate), isLoading })}
                </tbody>
            </table>
            <div className='grid px-2'><span className='text-gray-600'>Canvas Image Details:</span></div>
            <table className='table-auto'>
                <tbody>
                    {renderTableRows({ data: CANVAS_DETAILS_DATA(canvasstate), isLoading })}
                </tbody>
            </table>
        </>
    );
}
