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
                <h4>What's my IP Address?</h4>
            </div>
            <div className='grid px-2'><span className='text-gray-600'>My IP Address:</span></div>
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
                        <td className="break-all">{ipaddress?.clienthostname || 'Not available'}</td>
                    </tr>
                </tbody>
            </table>
            <div className='grid px-2'><span className='text-gray-600'>IP Address Location:</span></div>
            <table className="table-auto">
                <tbody>
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
                        <td>Location (Lat, Long)</td>
                        <td>
                            {ipaddress.geoip?.locationLatitude && ipaddress.geoip?.locationLongitude
                                ? `${ipaddress.geoip.locationLatitude}, ${ipaddress.geoip.locationLongitude}`
                                : 'Not available'}
                        </td>
                    </tr>
                    <tr>
                        <td>AccuracyRadius</td>
                        <td>{`${ipaddress.geoip?.locationAccuracyRadius} km` || 'Not available'}</td>
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
            <div className='grid px-2'><span className='text-gray-600'>Traits:</span></div>
            <table className="table-auto">
                <tbody>
                    <tr>
                        <td>Internet Service Provider</td>
                        <td>{ipaddress.geoip?.isp || 'Not available'}</td>
                    </tr>
                    <tr>
                        <td>Connection Type</td>
                        <td>{typeof ipaddress.geoip?.connectionType === 'object' ? ipaddress.geoip.connectionType?.type : ipaddress.geoip?.connectionType || 'Not available'}</td>
                    </tr>
                    <tr>
                        <td>Network</td>
                        <td>{ipaddress.geoip?.network || 'Not available'}</td>
                    </tr>
                    <tr>
                        <td>Domain</td>
                        <td>{ipaddress.geoip?.domain || 'Not available'}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}