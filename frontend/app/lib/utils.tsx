import { CapitalizeBooleanType } from "./types";

export const capitalizeBoolean: CapitalizeBooleanType = (value) => {
    if (value === null || value === undefined) {
        return 'Not available';
    }
    const strValue = value.toString();
    return strValue.charAt(0).toUpperCase() + strValue.slice(1);
}