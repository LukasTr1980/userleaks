import { create } from 'zustand';
import { IpaddressState } from './ipaddressStore.types';

export const useIpaddressStore = create<IpaddressState>((set) => ({
  ipaddress: null,

  retrieveIpaddress: async () => {
    try {
      const response = await fetch('/ipaddress/get-ip'); // Call the API route
      const data = await response.json();

      set({
        ipaddress: {
          ipv4: data.ipv4 || null,
          ipv6: data.ipv6 || null,
          clienthostname: data.clienthostname || null,
          geoip: {
            city: data.geoip?.city || null,
            continent: data.geoip?.continent || null,
            country: data.geoip?.country || null,
            locationLatitude: data.geoip?.locationLatitude || null,
            locationLongitude: data.geoip?.locationLongitude || null,
            locationTimezone: data.geoip?.locationTimezone || null,
            locationAccuracyRadius: data.geoip?.locationAccuracyRadius || null,
            postal: data.geoip?.postal || null,
            connectionType: data.geoip?.connectionType || null,
            domain: data.geoip?.domain || null,
          },
        },
      });
    } catch (error) {
      console.error('Failed to retrieve IP address:', error);
    }
  },
}));
