import type { RiskRegister, ModelProvenance, ExplainabilityHooks, SourceLocation } from './types';

// Model configuration
export interface ModelConfig {
  id: string; // model:<namespace>:<name>:<version>
  version: string;
  name: string;
  provider: string;
  purpose: string;
  risk_register: RiskRegister;
  provenance: ModelProvenance;
  explainability_hooks: ExplainabilityHooks;
}

// AST node for model declaration
export interface ModelDeclaration {
  type: 'ModelDeclaration';
  identifier: string;
  config: ModelConfig;
  sourceLocation: SourceLocation;
}

// Model creation function
export function model<T extends ModelConfig>(config: T): T {
  return config;
}

// Validation for models
export function validateModel(model: ModelConfig): string[] {
  const errors: string[] = [];

  // Validate model ID format
  const modelPattern = /^model:[a-zA-Z0-9-]+:[a-zA-Z0-9-]+:v[0-9]+\.[0-9]+\.[0-9]+$/;
  if (!modelPattern.test(model.id)) {
    errors.push(`Invalid model ID format: ${model.id}. Should be model:<namespace>:<name>:vX.Y.Z`);
  }

  // Validate risk register values (0-1)
  if (model.risk_register.accuracy < 0 || model.risk_register.accuracy > 1) {
    errors.push(`Accuracy must be between 0 and 1, got ${model.risk_register.accuracy}`);
  }
  if (model.risk_register.fairness < 0 || model.risk_register.fairness > 1) {
    errors.push(`Fairness must be between 0 and 1, got ${model.risk_register.fairness}`);
  }

  // Validate provenance
  if (model.provenance.training_data.length === 0) {
    errors.push('Model must specify training data sources');
  }
  if (!model.provenance.audit_report) {
    errors.push('Model must have an audit report');
  }

  return errors;
}
