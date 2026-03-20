import type { SourceLocation } from './types';
import type { StewardConfig } from './stewards';

// Covenant-specific types
export interface GuardDefinition {
  type: 'GuardDefinition';
  phase: 'pre' | 'post';
  action: string;
  condition: any;
  sourceLocation: SourceLocation;
}

export interface ActionDefinition {
  type: 'ActionDefinition';
  name: string;
  parameters: any[];
  body: any;
  sourceLocation: SourceLocation;
}

export interface SanctionDefinition {
  type: 'SanctionDefinition';
  name: string;
  condition: any;
  penalty: any;
  sourceLocation: SourceLocation;
}

// Covenant configuration
export interface CovenantConfig {
  name: string;
  purpose: string;
  stewards: StewardConfig[];
  models: { [key: string]: { id: string; version: string } };
  guards: {
    pre?: { [key: string]: any };
    post?: { [key: string]: any };
  };
  actions: { [key: string]: any };
  sanctions: { [key: string]: any };
}

// AST node for covenant declaration
export interface CovenantDeclaration {
  type: 'CovenantDeclaration';
  identifier: string;
  config: CovenantConfig;
  sourceLocation: SourceLocation;
}

// Covenant creation function
export function covenant<T extends CovenantConfig>(config: T): T {
  return config;
}

// Validation for covenants
export function validateCovenant(covenant: CovenantConfig): string[] {
  const errors: string[] = [];

  // Validate purpose
  if (!covenant.purpose || covenant.purpose.length < 10) {
    errors.push('Covenant purpose must be at least 10 characters long');
  }

  // Validate stewards
  if (covenant.stewards.length === 0) {
    errors.push('Covenant must have at least one steward');
  }

  // Validate actions
  if (Object.keys(covenant.actions).length === 0) {
    errors.push('Covenant must have at least one action');
  }

  // Validate guards (if defined)
  if (covenant.guards) {
    if (covenant.guards.pre) {
      Object.entries(covenant.guards.pre).forEach(([action, guard]) => {
        if (!covenant.actions[action]) {
          errors.push(`Pre-guard for undefined action: ${action}`);
        }
      });
    }
    if (covenant.guards.post) {
      Object.entries(covenant.guards.post).forEach(([action, guard]) => {
        if (!covenant.actions[action]) {
          errors.push(`Post-guard for undefined action: ${action}`);
        }
      });
    }
  }

  return errors;
}
