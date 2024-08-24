export type NavLinksProps = {
    closeSidebar?: () => void;
};

export interface UseTimeoutProps {
    timeoutDuration?: number;
    isLoading: boolean;
}

export type UseTimeoutReturn = boolean;

export interface AccuracyCircleProps {
    latitude: number;
    longitude: number;
    accuracyRadius: number;
}

export interface GoogleMapsProps {
    latitude: number;
    longitude: number;
    accuracyRadius: number;
    ipaddress: string;
}

export interface CustomMarkerProps {
    latitude: number;
    longitude: number;
    ipaddress: string;
}