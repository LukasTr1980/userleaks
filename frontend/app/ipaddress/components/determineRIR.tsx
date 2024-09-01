import { DetermineRIRType } from "../types";

export const determineRIR: DetermineRIRType = async (ipv4) => {
    try {
        const response = await fetch(`https://rdap.org/ip/${ipv4}`);
        const data = await response.json();

        if (data && data.port43) {
            if (data.port43.includes('ripe')) {
                return 'RIPE NCC';
            } else if (data.port43.includes('apnic')) {
                return 'APNIC';
            } else if (data.port43.includes('arin')) {
                return 'ARIN';
            } else if (data.port43.includes('lacnic')) {
                return 'LACNIC';
            } else if (data.port43.includes('afrinic')) {
                return 'AFRINIC';
            }
        }

        return 'Unknown RIR';
    } catch (error) {
        console.error('Error determining RIR:', error);
        return 'Unknown RIR';
    }
}