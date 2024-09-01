'use client';

import React from "react";
import Loading from "../loading";
import { RenderTableRowProps } from "../types";

export const renderTableRows = ({ data, isLoading }: RenderTableRowProps) => {
    return (
        <>
            {data.map((item, index) => (
                <tr key={index}>
                    <td className="w-1/3">{item.label}</td>
                    <td className={item.label === 'Hostname' ? 'break-all' : ''}>
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <span className={item.value === 'Not available' ? 'text-gray-300' : ''}>
                                {item.value || 'Not available'}
                            </span>
                        )}
                    </td>
                </tr>
            ))}
        </>
    );
};