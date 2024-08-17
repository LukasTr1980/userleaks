'use client';

import { useEffect } from "react";
import { useIpaddressStore } from "../store/ipaddressStore";
import Spinner from "../components/Spinner";

export default function Page() {
    const { ipaddress, retrieveIpaddress } = useIpaddressStore();

    useEffect(() => {
        retrieveIpaddress();
    }, [retrieveIpaddress]);

    const isLoading = ipaddress === null;

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className='grid pb-2 px-2'>
                <h3>My IP Address</h3>
            </div>
            <table className="table-auto">
                <tbody>
                    <tr>
                        <td>IPv4 Address</td>
                        <td>{ipaddress?.ipv4 || 'Not available'}</td>
                    </tr>
                    <tr>
                        <td>IPv6 Address</td>
                        <td>{ipaddress?.ipv6 || 'Not available'}</td>
                    </tr>
                    <tr>
                        <td>Hostname</td>
                        <td>{ipaddress?.clienthostname || 'Not available'}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}