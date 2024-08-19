'use client';

import { useEffect } from "react";
import { ErrorBoundaryProps } from "./types";

export default function Error({ error, reset }: ErrorBoundaryProps) {
    useEffect(() => {
        console.error('Error', error);
    }, [error]);

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button
                onClick={() => reset()}
            >
                Try again
            </button>
        </div>
    );
}