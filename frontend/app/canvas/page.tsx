"use client";

import { useEffect } from 'react';
import { useCanvasSupportStore } from '../store/canvasStore';
import Spinner from '../components/Spinner';
import { RowData } from './types';
import { SUPPORT_CHECK_DATA, CANVAS_DETAILS_DATA, CANVAS_SIGNATURE_DATA } from './constants';

export default function Page() {
    const canvasstate = useCanvasSupportStore();

    useEffect(() => {
        canvasstate.checkSupport();
    }, [canvasstate]);

    const isLoading =
        canvasstate.canvasSupported === null ||
        canvasstate.textApiSupported === null ||
        canvasstate.toDataUrlSupported === null ||
        canvasstate.canvasSignature === null ||
        canvasstate.canvasDataUrl === null ||
        canvasstate.canvasSizeInBytes === null ||
        canvasstate.numberOfColors === null;

    if (isLoading) {
        return <Spinner />;
    }

    const renderTableRows = (data: RowData[]) => {
        return data.map((item, index) => (
            <tr key={index}>
                <td className='w-1/4'>{item.label}</td>
                <td className={item.label === 'Canvas Fingerprint' ? 'break-all' : ''}>{item.value}</td>
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
                    {renderTableRows(SUPPORT_CHECK_DATA(canvasstate))}
                </tbody>
            </table>
            <div className='grid px-2'><span className='text-gray-600'>Canvas signature:</span></div>
            <table className='table-auto'>
                <tbody>
                    {renderTableRows(CANVAS_SIGNATURE_DATA(canvasstate))}
                </tbody>
            </table>
            <div className='grid px-2'><span className='text-gray-600'>Canvas Image Details:</span></div>
            <table className='table-auto'>
                <tbody>
                    {renderTableRows(CANVAS_DETAILS_DATA(canvasstate))}
                </tbody>
            </table>
        </>
    );
}
