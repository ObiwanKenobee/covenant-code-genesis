import { sanctum_flow, type FlowConfig } from '../dsl';

export const BoreholeMRV = sanctum_flow<FlowConfig>({
  id: "flow:mrv:borehole-repair:v1",
  name: "Borehole Repair MRV",
  steps: [
    {
      name: "Request Submission",
      actor: "Community",
      fields: ["id", "community", "location", "image_hash", "timestamp"],
      validation: "community-attestation"
    },
    {
      name: "Photo Verification",
      actor: "AI Model",
      model: "model:atlas:photo-verifier:v1.0.0",
      validation: "model-confidence"
    },
    {
      name: "Council Approval",
      actor: "Steward",
      stewards: ["LocalCouncil"],
      validation: "majority-vote"
    },
    {
      name: "Credit Issuance",
      actor: "Smart Contract",
      action: "disburse_repair",
      validation: "auto-execution"
    }
  ],
  verification_period: "24h",
  dispute_window: "7d",
  audit_frequency: "quarterly"
});
