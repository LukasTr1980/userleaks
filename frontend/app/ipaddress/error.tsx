'use client';

import { useEffect } from "react";
import { ErrorBoundaryProps } from "./types";

export default function Error({ error, reset }: ErrorBoundaryProps) {
    useEffect(() => {
        console.error('Error', error);
    }, [error]);

    const isTooManyRequests = error?.status === 429;

    return (
        <div>
            {isTooManyRequests ? (
                <>
                    <h2>Too Many Requests</h2>
                    <p>You have exceeded the rate limit. Please wait a moment and try again later.</p>
                </>
            ) : (
                <>
                    <h2>Something went wrong!</h2>
                    <p>{error?.message || 'An unexpected error occurred.'}</p>
                </>
            )}
            <button onClick={() => reset()}>
                Try again
            </button>
        </div>
    );
}