import type { AtlasLangProgram } from './ast';
import { validateSteward } from './stewards';
import { validateCovenant } from './covenants';
import { validateModel } from './models';
import { validateToken } from './tokens';
import { validateFlow } from './flows';

// Validation error structure
export interface ValidationError {
  file: string;
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning';
}

// Validate the entire program
export function validateProgram(program: AtlasLangProgram): ValidationError[] {
  const errors: ValidationError[] = [];

  program.declarations.forEach(declaration => {
    const location = declaration.sourceLocation;
    
    switch (declaration.type) {
      case 'StewardDeclaration':
        validateSteward(declaration.config).forEach(msg => {
          errors.push({
            file: location.file,
            line: location.line,
            column: location.column,
            message: msg,
            severity: 'error'
          });
        });
        break;
        
      case 'CovenantDeclaration':
        validateCovenant(declaration.config).forEach(msg => {
          errors.push({
            file: location.file,
            line: location.line,
            column: location.column,
            message: msg,
            severity: 'error'
          });
        });
        break;
        
      case 'ModelDeclaration':
        validateModel(declaration.config).forEach(msg => {
          errors.push({
            file: location.file,
            line: location.line,
            column: location.column,
            message: msg,
            severity: 'error'
          });
        });
        break;
        
      case 'TokenDeclaration':
        validateToken(declaration.config).forEach(msg => {
          errors.push({
            file: location.file,
            line: location.line,
            column: location.column,
            message: msg,
            severity: 'error'
          });
        });
        break;
        
      case 'FlowDeclaration':
        validateFlow(declaration.config).forEach(msg => {
          errors.push({
            file: location.file,
            line: location.line,
            column: location.column,
            message: msg,
            severity: 'error'
          });
        });
        break;
    }
  });

  // Additional cross-declaration validation
  errors.push(...validateCrossDeclarations(program));

  return errors;
}

// Validate cross-declaration relationships
function validateCrossDeclarations(program: AtlasLangProgram): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check for duplicate token symbols
  const tokenSymbols = new Map<string, { file: string; line: number; column: number }>();
  program.declarations.forEach(declaration => {
    if (declaration.type === 'TokenDeclaration') {
      const symbol = declaration.config.symbol;
      if (tokenSymbols.has(symbol)) {
        const existing = tokenSymbols.get(symbol)!;
        errors.push({
          file: declaration.sourceLocation.file,
          line: declaration.sourceLocation.line,
          column: declaration.sourceLocation.column,
          message: `Duplicate token symbol '${symbol}'. Already defined at ${existing.file}:${existing.line}:${existing.column}`,
          severity: 'error'
        });
      } else {
        tokenSymbols.set(symbol, declaration.sourceLocation);
      }
    }
  });

  // Check that models referenced in covenants exist in the program
  const existingModels = new Set<string>();
  program.declarations.forEach(declaration => {
    if (declaration.type === 'ModelDeclaration') {
      existingModels.add(declaration.config.id);
    }
  });

  program.declarations.forEach(declaration => {
    if (declaration.type === 'CovenantDeclaration') {
      Object.values(declaration.config.models).forEach(model => {
        if (!existingModels.has(model.id)) {
          errors.push({
            file: declaration.sourceLocation.file,
            line: declaration.sourceLocation.line,
            column: declaration.sourceLocation.column,
            message: `Model '${model.id}' not declared in program`,
            severity: 'warning'
          });
        }
      });
    }
  });

  return errors;
}

// Helper to print validation errors
export function printErrors(errors: ValidationError[]): string {
  if (errors.length === 0) {
    return 'No errors found';
  }

  return errors.map(error => {
    const severity = error.severity.toUpperCase();
    return `${severity} ${error.file}:${error.line}:${error.column}: ${error.message}`;
  }).join('\n');
}
