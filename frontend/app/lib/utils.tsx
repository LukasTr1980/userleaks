import { booleanToStringType, RenderFlagIconType, TimezoneType } from "./types";
import { format } from "date-fns";
import { toZonedTime } from 'date-fns-tz';

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

export const getTimeForTimeZone: TimezoneType = (timezone) => {
    if (!timezone) {
        return 'Timezone not available';
    }

    const now = new Date();
    const zonedTime = toZonedTime(now, timezone);

    return format(zonedTime, 'EEE dd/MM/yyyy HH:mm:ssXXX');
}