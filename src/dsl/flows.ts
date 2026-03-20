import type { SourceLocation } from './types';

// Flow step configuration
export interface FlowStep {
  name: string;
  actor: 'Community' | 'AI Model' | 'Steward' | 'Smart Contract';
  fields?: string[];
  model?: string;
  stewards?: string[];
  action?: string;
  validation: string;
}

// Flow configuration
export interface FlowConfig {
  id: string;
  name: string;
  steps: FlowStep[];
  verification_period: string;
  dispute_window: string;
  audit_frequency: string;
}

// AST node for flow declaration
export interface FlowDeclaration {
  type: 'FlowDeclaration';
  identifier: string;
  config: FlowConfig;
  sourceLocation: SourceLocation;
}

// Flow creation function
export function sanctum_flow<T extends FlowConfig>(config: T): T {
  return config;
}

// Validation for MRV flows
export function validateFlow(flow: FlowConfig): string[] {
  const errors: string[] = [];

  // Validate at least one step
  if (flow.steps.length === 0) {
    errors.push('Flow must have at least one step');
  }

  // Validate each step
  flow.steps.forEach((step, index) => {
    // Validate actor
    const validActors = ['Community', 'AI Model', 'Steward', 'Smart Contract'];
    if (!validActors.includes(step.actor)) {
      errors.push(`Step ${index + 1}: Invalid actor type: ${step.actor}`);
    }

    // Validate validation method is specified
    if (!step.validation) {
      errors.push(`Step ${index + 1}: Validation method must be specified`);
    }
  });

  // Validate time durations
  const durationPattern = /^\d+[smhdwMy]$/;
  if (!durationPattern.test(flow.verification_period)) {
    errors.push(`Invalid verification period format: ${flow.verification_period}`);
  }
  if (!durationPattern.test(flow.dispute_window)) {
    errors.push(`Invalid dispute window format: ${flow.dispute_window}`);
  }
  if (!durationPattern.test(flow.audit_frequency)) {
    errors.push(`Invalid audit frequency format: ${flow.audit_frequency}`);
  }

  return errors;
}
