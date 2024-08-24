import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { GoogleMapsProps, AccuracyCircleProps, CustomMarkerProps } from "./types";
import { useEffect } from "react";

const CustomMarker: React.FC<CustomMarkerProps> = ({ latitude, longitude, ipaddress }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !latitude || !longitude || !ipaddress) return;

        const loadMarkerLibrary = async () => {
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

            const markerContent = document.createElement('div');
            markerContent.className = 'custom-marker bg-white border border-gray-300 shadow-lg rounded-lg p-1 text-center text-black';

            const ipText = document.createElement('div');
            ipText.className = 'text-sm';
            ipText.textContent = ipaddress;
            markerContent.appendChild(ipText);

            const arrow = document.createElement('div');
            arrow.className = 'absolute w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white bottom-[-10px] left-1/2 transform -translate-x-1/2';
            markerContent.appendChild(arrow);

            new AdvancedMarkerElement({
                map: map,
                position: { lat: latitude, lng: longitude },
                content: markerContent,
            });
        };

        loadMarkerLibrary().catch((err) => console.error("Error loading marker library: ", err));

    }, [map, latitude, longitude, ipaddress]);

    return null;
};

const AccuracyCircle: React.FC<AccuracyCircleProps> = ({ latitude, longitude, accuracyRadius }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !latitude || !longitude || !accuracyRadius) return;

        const circle = new google.maps.Circle({
            strokeColor: 'blue',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: 'lightblue',
            fillOpacity: 0.35,
            map: map,
            center: { lat: latitude, lng: longitude },
            radius: accuracyRadius * 1000,
        });

        return () => {
            circle.setMap(null);
        };
    }, [map, latitude, longitude, accuracyRadius]);
    return null;
};

const GoogleMaps: React.FC<GoogleMapsProps> = ({ latitude, longitude, accuracyRadius, ipaddress }) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

    if (!apiKey || !mapId) {
        console.error("Error");
        throw new Error('An Error occurred.');
    }

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                defaultCenter={{ lat: latitude, lng: longitude }}
                defaultZoom={8}
                gestureHandling="cooperative"
                disableDefaultUI={true}
                mapId={mapId}
            >
                <CustomMarker latitude={latitude} longitude={longitude} ipaddress={ipaddress} />

                <AccuracyCircle latitude={latitude} longitude={longitude} accuracyRadius={accuracyRadius} />
            </Map>
        </APIProvider>
    );
};

export default GoogleMaps;