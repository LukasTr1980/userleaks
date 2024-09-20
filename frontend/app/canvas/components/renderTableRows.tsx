'use client';

import React from "react";
import Loading from "../loading";
import { RenderTableRowProps } from "../types";

export default function renderTableRows({ data, isLoading }: RenderTableRowProps) {
    return (
        <>
            {data.map((item, index) => {
                return (
                    <tr key={index}>
                        <td className="w-1/3">{item.label}</td>
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
                );
            })}
        </>
    );
}
