import { model, type ModelConfig } from '../dsl';

export const PhotoVerifier = model<ModelConfig>({
  id: "model:atlas:photo-verifier:v1.0.0",
  version: "1.0.0",
  name: "Water Point Photo Verifier",
  provider: "AtlasAI",
  purpose: "Verifies borehole repair completion from photos",
  risk_register: {
    accuracy: 0.95,
    fairness: 0.88,
    explainability: "LIME",
    privacy: "differential-privacy"
  },
  provenance: {
    training_data: ["did:data:water-points:2023"],
    training_method: "transfer-learning",
    audit_report: "audit:2023-11-15:atlas-photo-verifier"
  },
  explainability_hooks: {
    feature_importance: true,
    counterfactual_explanations: true
  }
});
