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
        <table className="table-auto">
            <thead>
                <tr>
                    <th className="pt-0">What is my My IP Address</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>IPv4 Address</td>
                    <td>{ipaddress?.ipv4 || 'Not available'}</td>
                </tr>
                <tr>
                    <td>IPv6 Address</td>
                    <td>{ipaddress?.ipv6 || 'Not available'}</td>
                </tr>
            </tbody>
        </table>
    )
}