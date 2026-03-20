import type { ImportStatement } from './types';
import type { StewardDeclaration } from './stewards';
import type { CovenantDeclaration } from './covenants';
import type { ModelDeclaration } from './models';
import type { TokenDeclaration } from './tokens';
import type { FlowDeclaration } from './flows';

// Root AST structure for AtlasLang program
export interface AtlasLangProgram {
  type: 'Program';
  declarations: (
    StewardDeclaration | 
    CovenantDeclaration | 
    ModelDeclaration | 
    TokenDeclaration | 
    FlowDeclaration
  )[];
  imports: ImportStatement[];
}

// Helper function to create a source location
export function createSourceLocation(
  file: string, 
  line: number, 
  column: number
): { file: string; line: number; column: number } {
  return { file, line, column };
}
