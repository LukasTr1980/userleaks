import { create } from 'zustand';
import { IpaddressState, VCardItem } from './ipaddressStore.types';
import { determineRIR } from '../lib/utils';
import { RIR_API_BASE_URLS } from '../ipaddress/constants';
import { RIRType } from '../ipaddress/types';

export const useIpaddressStore = create<IpaddressState>((set, get) => ({
  ipaddress: null,
  rirData: null,
  rir: null,
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
      if (data.ipv4) {
        const rir = await determineRIR(data.ipv4) as RIRType;
        console.log(`Responsible RIR for IP ${data.ipv4}: ${rir}`);

        set({ rir });

        const rirApiBaseUrls = RIR_API_BASE_URLS[rir];
        if (rirApiBaseUrls) {
          get().retrieveRirData(data.ipv4, rirApiBaseUrls);
        }
      }

    } catch (error) {
      console.error('Failed to retrieve IP address:', error);
      set({ error: 'Failed to retrieve IP address' });
    }
  },

  retrieveRirData: async (ipv4, rirUrl) => {
    try {
      const response = await fetch(`/ipaddress/rir?ipv4=${ipv4}&rirUrl=${rirUrl}`);
      const data = await response.json();

      const handle = data.handle || null;
      const cidr = data.cidr0_cidrs && data.cidr0_cidrs.length > 0
        ? `${data.cidr0_cidrs[0].v4prefix}/${data.cidr0_cidrs[0].length}`
        : null;
      const name = data.name || null;
      const netType = data.type || null;

      let abuseContact = null;

      if (data.remarks && data.remarks.length > 0) {
        for (const remark of data.remarks) {
          const abuseEmail = remark.description.find((desc: string) => desc.toLowerCase().includes('abuse@'));
          if (abuseEmail) {
            abuseContact = abuseEmail;
            break;
          }
        }
      }

      if (!abuseContact && data.entities && data.entities.length > 0) {
        for (const entity of data.entities) {
          const vcard = entity.vcardArray?.[1];

          if (vcard) {
            const emailEntry = vcard.find((item: VCardItem) => item[0] === 'email');
            const hasAbuseRole = entity.roles.includes('abuse');
            const isAbuseEmail = emailEntry && emailEntry[3]?.toLowerCase().includes('abuse');

            if (hasAbuseRole || isAbuseEmail) {
              abuseContact = emailEntry[3];
              break;
            }
          }

          if (entity.remarks && entity.remarks.length > 0) {
            for (const remark of entity.remarks) {
              const abuseEmail = remark.description.find((desc: string) => desc.toLowerCase().includes('abuse@'));
              if (abuseEmail) {
                abuseContact = abuseEmail;
                break;
              }
            }
          }
        }
      }

      set({
        rirData: {
          handle,
          cidr,
          name,
          netType,
          abuseContact
        },
        error: null,
      });
    } catch (error) {
      console.error('Failed to retrieve RIR data:', error);
      set({ error: 'Failed to retrieve RIR data' });
    }
  },
}));
