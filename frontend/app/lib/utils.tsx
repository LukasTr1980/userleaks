import { CapitalizeBooleanType, RenderFlagIconType } from "./types";

export const capitalizeBoolean: CapitalizeBooleanType = (value) => {
    if (value === null || value === undefined) {
        return 'Not available';
    }
    const strValue = value.toString();
    return strValue.charAt(0).toUpperCase() + strValue.slice(1);
}

export const renderFlagIcon: RenderFlagIconType = (code, type) => {
    if (!code) return null;
    const normalizedCode = code.toLowerCase();
    return <span className={`fi fi-${normalizedCode}`} title={`${type === 'country' ? 'Country' : 'Continent'}: ${code}`}></span>
}