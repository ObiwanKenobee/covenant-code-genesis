// Base types
export type Address = string; // DID format: did:<method>:<network>:<identifier>
export type Attestation = string; // Attestation type or credential ID
export type ModelID = string; // model:<namespace>:<name>:<version>
export type TokenAmount = number;

// Risk and governance types
export interface RiskRegister {
  accuracy: number;
  fairness: number;
  explainability: string;
  privacy: string;
}

export interface ModelProvenance {
  training_data: string[];
  training_method: string;
  audit_report: string;
}

export interface ExplainabilityHooks {
  feature_importance: boolean;
  counterfactual_explanations: boolean;
}

export interface RedemptionConfig {
  method: string;
  conversion_rate: string;
  expiry: string;
}

export interface TokenGovernance {
  minting: string;
  burning: string;
  redistribution: string;
}

// Source location for error reporting
export interface SourceLocation {
  file: string;
  line: number;
  column: number;
}

// AST base interfaces
export interface ImportStatement {
  type: 'ImportStatement';
  moduleSpecifier: string;
  importedNames: string[];
  sourceLocation: SourceLocation;
}

export interface FunctionDefinition {
  type: 'FunctionDefinition';
  name: string;
  parameters: Parameter[];
  body: any;
  sourceLocation: SourceLocation;
}

export interface Parameter {
  type: 'Parameter';
  name: string;
  typeAnnotation: TypeAnnotation;
  sourceLocation: SourceLocation;
}

export interface TypeAnnotation {
  type: 'TypeAnnotation';
  kind: 'Primitive' | 'Array' | 'Object' | 'Union' | 'Intersection';
  // Specific properties based on kind
  [key: string]: any;
}

export interface Expression {
  type: 'Expression';
  kind: 'Binary' | 'Unary' | 'Call' | 'Identifier' | 'Literal';
  // Specific properties based on kind
  [key: string]: any;
}
