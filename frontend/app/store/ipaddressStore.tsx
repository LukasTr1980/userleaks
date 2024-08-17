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
        },
      });
    } catch (error) {
      console.error('Failed to retrieve IP address:', error);
    }
  },
}));
