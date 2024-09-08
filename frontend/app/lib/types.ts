import React from "react";

export type booleanToStringType = (value: boolean | null | undefined) => string;

export type RenderFlagIconType = (code: string | null, type: 'country' | 'continent') => React.JSX.Element | null;

export type TimezoneType = (timezone: string | null | undefined) =>  string;