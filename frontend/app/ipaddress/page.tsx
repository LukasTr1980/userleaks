'use client';

import { useEffect } from "react";
import { useIpaddressStore } from "../store/ipaddressStore";
import Spinner from "../components/Spinner";
import { IP_DATA, LOCATION_DATA, TRAITS_DATA } from "./constants";
import { RowData } from "./types";

export default function Page() {
    const { ipaddress, retrieveIpaddress } = useIpaddressStore();

    useEffect(() => {
        retrieveIpaddress();
    }, [retrieveIpaddress]);

    const isLoading = ipaddress === null;

    if (isLoading) {
        return <Spinner />;
    }

    const renderTableRows = (data: RowData[]) => {
        return data.map((item, index) => (
            <tr key={index}>
                <td className="w-1/4">{item.label}</td>
                <td className={item.label === 'Hostname' ? 'break-all' : ''}>{item.value}</td>
            </tr>
        ));
    };

    return (
        <>
            <div className='grid pb-2 px-2'>
                <h4>What's my IP Address?</h4>
            </div>

            <div className='grid px-2'><span className='text-gray-600'>My IP Address:</span></div>
            <table className="table-auto">
                <tbody>
                    {renderTableRows(IP_DATA(ipaddress))}
                </tbody>
            </table>

            {ipaddress?.geoip && (
                <>
                    <div className='grid px-2'><span className='text-gray-600'>IP Address Location:</span></div>
                    <table className="table-auto">
                        <tbody>
                            {renderTableRows(LOCATION_DATA(ipaddress.geoip))}
                        </tbody>
                    </table>
                    <div className='grid px-2'><span className='text-gray-600'>Traits:</span></div>
                    <table className="table-auto">
                        <tbody>
                            {renderTableRows(TRAITS_DATA(ipaddress.geoip))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    )
}