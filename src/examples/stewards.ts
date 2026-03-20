import { steward, type StewardConfig } from '../dsl';

export const LocalCouncil = steward<StewardConfig>({
  id: "did:ke:lc:001",
  name: "Local Water Council",
  attestations: ["council-auth", "water-quality-expert"],
  thresholds: {
    decision: 0.6, // 60% agreement required
    emergency: 0.8 // 80% agreement for emergencies
  }
});

export const AtlasCouncil = steward<StewardConfig>({
  id: "did:atlas:council:001",
  name: "Atlas Global Council",
  attestations: ["global-governance"],
  thresholds: {
    decision: 0.5,
    emergency: 0.75
  }
});
