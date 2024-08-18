export type NavLinksProps = {
    closeSidebar?: () => void;
};

export interface UseTimeoutProps {
    timeoutDuration?: number;
    isLoading: boolean;
}

export type UseTimeoutReturn = boolean;