import { create } from 'zustand';
import { IpaddressState } from './ipaddressStore.types';

export const useIpaddressStore = create<IpaddressState>((set, get) => ({
  ipaddress: null,
  error: null,

  retrieveIpaddress: async () => {
    try {
      const response = await fetch('/ipaddress/get-ip'); // Call the API route
      const data = await response.json();

      set({
        ipaddress: {
          ipv4: data.ipv4 || null,
          ipv6: data.ipv6 || null,
          clienthostname: data.clienthostname || null,
          ipData: {
            city: data.ipData?.city || null,
            continent: data.ipData?.continent || null,
            continentName: data.ipData?.continentName || null,
            country: data.ipData?.country || null,
            countryName: data.ipData?.countryName || null,
            locationLatitude: data.ipData?.locationLatitude || null,
            locationLongitude: data.ipData?.locationLongitude || null,
            locationTimezone: data.ipData?.locationTimezone || null,
            locationAccuracyRadius: data.ipData?.locationAccuracyRadius || null,
            postal: data.ipData?.postal || null,
            connectionType: data.ipData?.connectionType || null,
            domain: data.ipData?.domain || null,
            isp: data.ipData?.isp || null,
            asn: data.ipData?.asn || null,
            network: data.ipData?.network || null,
            isAnonymous: data.ipData?.isAnonymous || null,
            isAnonymousVpn: data.ipData?.isAnonymousVpn || null,
            isPublicProxy: data.ipData?.isPublicProxy || null,
            isResidentialProxy: data.ipData?.isResidentialProxy || null,
            isTorExitNode: data.ipData?.isTorExitNode || null,
          },
        },
      });
    } catch (error) {
      console.error('Failed to retrieve IP address:', error);
      set({ error: 'Failed to retrieve IP address' });
    }
  },
}));
