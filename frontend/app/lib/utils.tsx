import { booleanToStringType, RenderFlagIconType } from "./types";

export const booleanToString: booleanToStringType = (value) => {
    if (value === true) {
        return 'True';
    }
    return 'False';
}

export const renderFlagIcon: RenderFlagIconType = (code, type) => {
    if (!code) return null;
    const normalizedCode = code.toLowerCase();
    return <span className={`fi fi-${normalizedCode}`} title={`${type === 'country' ? 'Country' : 'Continent'}: ${code}`}></span>
}