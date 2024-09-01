export type booleanToStringType = (value: boolean | null | undefined) => string;

export type RenderFlagIconType = (code: string | null, type: 'country' | 'continent') => JSX.Element | null;