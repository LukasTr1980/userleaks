'use client';

import { useState, useEffect } from 'react';
import { UseTimeoutProps, UseTimeoutReturn } from './types';

export function useTimeout({ timeoutDuration = 5000, isLoading }: UseTimeoutProps): UseTimeoutReturn {
    const [loadingTimeout, setLoadingTimeout] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setLoadingTimeout(false);
            return;
        }

        const timeoutId = setTimeout(() => {
            setLoadingTimeout(true);
        }, timeoutDuration);

        return () => clearTimeout(timeoutId);
    }, [isLoading, timeoutDuration]);

    return loadingTimeout;
}