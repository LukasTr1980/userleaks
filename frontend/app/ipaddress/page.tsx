'use client';

import { useEffect, useState } from "react";
import { useIpaddressStore } from "../store/ipaddressStore";
import { IP_DATA, LOCATION_DATA, TRAITS_DATA, VPN_PROXY_TOR_DATA, DEFAULT_IP_DATA } from "./constants";
import { RenderTableRowProps } from "./types";
import { useTimeout } from "../components/useTimeout";
import Loading from "./loading";
import GoogleMaps from '../components/GoogleMaps';

export default function Page() {
    const { ipaddress, retrieveIpaddress } = useIpaddressStore();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        try {
            retrieveIpaddress();
        } catch (error) {
            console.error('Error during retrieve of IP Address:', error);
            setHasError(true);
        }

        retrieveIpaddress();
    }, [retrieveIpaddress]);

    const isIpLoading = ipaddress === null;
    const isLocationAndTraitsLoading = !ipaddress?.ipData;
    const loadingTimeout = useTimeout({ isLoading: isIpLoading });

    if (hasError || loadingTimeout) {
        throw new Error('An Error occurred.')
    }

    const latitude = ipaddress?.ipData?.locationLatitude;
    const longitude = ipaddress?.ipData?.locationLongitude;
    const accuracyRadius = ipaddress?.ipData?.locationAccuracyRadius;
    const ipv4Address = ipaddress?.ipv4;

    const renderTableRows = ({ data, isLoading }: RenderTableRowProps) => {
        return data.map((item, index) => (
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
        ));
    };

    return (
        <>
            <div className='grid pb-2 px-2'>
                <h4>What's my IP Address?</h4>
            </div>

            {/* IP Address Data */}
            <div className='grid px-2'><span className='text-gray-600'>My IP Address:</span></div>
            <table className="table-auto">
                <tbody>
                    {renderTableRows({ data: IP_DATA(ipaddress), isLoading: isIpLoading })}
                </tbody>
            </table>

            {/* Render Location and Traits sections regardless of ipData availability */}
            <div className='grid px-2'><span className='text-gray-600'>IP Address Location:</span></div>
            <table className="table-auto">
                <tbody>
                    {renderTableRows({
                        data: LOCATION_DATA(ipaddress?.ipData || DEFAULT_IP_DATA), // Render with empty object initially
                        isLoading: isLocationAndTraitsLoading, // Show spinner while loading
                    })}
                </tbody>
            </table>

            <div className='grid px-2'><span className='text-gray-600'>Traits:</span></div>
            <table className="table-auto">
                <tbody>
                    {renderTableRows({
                        data: TRAITS_DATA(ipaddress?.ipData || DEFAULT_IP_DATA), // Render with empty object initially
                        isLoading: isLocationAndTraitsLoading, // Show spinner while loading
                    })}
                </tbody>
            </table>

            <div className="grid px-2"><span className="text-gray-600">Proxy, VPN or Tor:</span></div>
            <table className="table-auto">
                <tbody>
                    {renderTableRows({
                        data: VPN_PROXY_TOR_DATA(ipaddress?.ipData || DEFAULT_IP_DATA),
                        isLoading: isLocationAndTraitsLoading,
                    })}
                </tbody>
            </table>

            <div className="grid px-2"><span className="text-gray-600">Where is my IP:</span></div>
            <div className="container w-full h-96">
                {isLocationAndTraitsLoading || !latitude || !longitude || !accuracyRadius || !ipv4Address ? (
                    <Loading />
                ) : (
                    <GoogleMaps latitude={latitude} longitude={longitude} accuracyRadius={accuracyRadius} ipaddress={ipv4Address} />
                )}
            </div>
        </>
    );
}
