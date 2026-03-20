import { covenant, type CovenantConfig } from '../dsl';
import { LocalCouncil, AtlasCouncil } from './stewards';
import { PhotoVerifier } from './models';
import { WaterCredit } from './tokens';

interface RepairRequest {
  id: string;
  community: string;
  image_hash: string;
  location: { lat: number; lng: number };
  timestamp: Date;
}

export const BoreholeCovenant = covenant<CovenantConfig>({
  name: "Borehole Water Credit Covenant",
  purpose: "Verified borehole repairs create WaterCredits",
  stewards: [LocalCouncil, AtlasCouncil],
  models: {
    photoVerifier: {
      id: PhotoVerifier.id,
      version: PhotoVerifier.version
    }
  },
  guards: {
    pre: {
      disburse_repair: (request: RepairRequest) => {
        return true;
      }
    },
    post: {
      disburse_repair: (request: RepairRequest, credit: any) => {
        return credit.holder === request.community;
      }
    }
  },
  actions: {
    disburse_repair: (request: RepairRequest) => {
      const credit = {
        holder: request.community,
        amount: 100,
        purpose: "Borehole repair completion"
      };

      return credit;
    }
  },
  sanctions: {
    invalid_verification: (steward: any) => {
      return {
        type: "suspension",
        duration: "30d",
        reason: "Invalid photo verification"
      };
    }
  }
});
