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
                    <tr>
                        <td>City</td>
                        <td>{ipaddress.geoip?.city?.en || 'Not available'}</td>
                    </tr>
                    <tr>
                        <td>Continent</td>
                        <td>{ipaddress.geoip?.continent || 'Not available'}</td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td>{ipaddress.geoip?.country || 'Not available'}</td>
                    </tr>
                    <tr>
                        <td>Latitude</td>
                        <td>{ipaddress.geoip?.locationLatitude || 'Not available'}</td>
                    </tr>
                    <tr>
                        <td>Longitude</td>
                        <td>{ipaddress.geoip?.locationLongitude || 'Not available'}</td>
                    </tr>
                    <tr>
                        <td>Timezone</td>
                        <td>{ipaddress.geoip?.locationTimezone || 'Not available'}</td>
                    </tr>
                    <tr>
                        <td>Postal</td>
                        <td>{ipaddress.geoip?.postal || 'Not available'}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}