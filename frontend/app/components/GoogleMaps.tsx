import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { GoogleMapsProps } from "./types";

const GoogleMaps: React.FC<GoogleMapsProps> = ({ latitude, longitude }) => {
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
                <AdvancedMarker position={{ lat: latitude, lng: longitude }} />
            </Map>
        </APIProvider>
    );
};

export default GoogleMaps;