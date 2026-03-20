import type { Address, Attestation, SourceLocation } from './types';

// Steward configuration
export interface StewardConfig {
  id: Address;
  name: string;
  attestations: Attestation[];
  thresholds: { [key: string]: number };
}

// AST node for steward declaration
export interface StewardDeclaration {
  type: 'StewardDeclaration';
  identifier: string;
  config: StewardConfig;
  sourceLocation: SourceLocation;
}

// Steward creation function
export function steward<T extends StewardConfig>(config: T): T {
  return config;
}

// Validation for stewards
export function validateSteward(steward: StewardConfig): string[] {
  const errors: string[] = [];

  // Validate DID format
  const didPattern = /^did:[a-z]+:[a-zA-Z0-9-]+:[a-zA-Z0-9-]+$/;
  if (!didPattern.test(steward.id)) {
    errors.push(`Invalid DID format: ${steward.id}`);
  }

  // Validate thresholds (0-1)
  Object.entries(steward.thresholds).forEach(([key, value]) => {
    if (value < 0 || value > 1) {
      errors.push(`Threshold ${key} must be between 0 and 1, got ${value}`);
    }
  });

  // Validate attestations are non-empty
  if (steward.attestations.length === 0) {
    errors.push('Steward must have at least one attestation');
  }

  return errors;
}
