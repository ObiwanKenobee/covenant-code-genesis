import type { RedemptionConfig, TokenGovernance, SourceLocation } from './types';

// Token configuration
export interface TokenConfig {
  name: string;
  symbol: string;
  decimals: number;
  purpose: string;
  redemption: RedemptionConfig;
  impact_metrics: { [key: string]: boolean };
  governance: TokenGovernance;
}

// AST node for token declaration
export interface TokenDeclaration {
  type: 'TokenDeclaration';
  identifier: string;
  config: TokenConfig;
  sourceLocation: SourceLocation;
}

// Token creation function
export function covenant_token<T extends TokenConfig>(config: T): T {
  return config;
}

// Validation for covenant tokens
export function validateToken(token: TokenConfig): string[] {
  const errors: string[] = [];

  // Validate decimals (0-18)
  if (token.decimals < 0 || token.decimals > 18) {
    errors.push(`Decimals must be between 0 and 18, got ${token.decimals}`);
  }

  // Validate symbol length
  if (token.symbol.length < 1 || token.symbol.length > 10) {
    errors.push(`Symbol must be between 1 and 10 characters, got ${token.symbol.length}`);
  }

  // Validate purpose
  if (!token.purpose || token.purpose.length < 10) {
    errors.push('Purpose must be at least 10 characters long');
  }

  // Validate redemption method
  if (!token.redemption.method) {
    errors.push('Redemption method must be specified');
  }

  return errors;
}
