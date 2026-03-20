import { readFileSync } from 'fs';
import { join } from 'path';
import { parseAtlasLang } from './parser';
import { validateProgram, printErrors } from './validator';

// Test function to parse and validate DSL files
function testDSL() {
  try {
    // Read example files
    const stewardCode = readFileSync(join(__dirname, '../examples/stewards.ts'), 'utf8');
    const modelCode = readFileSync(join(__dirname, '../examples/models.ts'), 'utf8');
    const tokenCode = readFileSync(join(__dirname, '../examples/tokens.ts'), 'utf8');
    const flowCode = readFileSync(join(__dirname, '../examples/flows.ts'), 'utf8');
    const covenantCode = readFileSync(join(__dirname, '../examples/covenants.ts'), 'utf8');

    // Parse files
    const stewardProgram = parseAtlasLang(stewardCode, 'stewards.ts');
    const modelProgram = parseAtlasLang(modelCode, 'models.ts');
    const tokenProgram = parseAtlasLang(tokenCode, 'tokens.ts');
    const flowProgram = parseAtlasLang(flowCode, 'flows.ts');
    const covenantProgram = parseAtlasLang(covenantCode, 'covenants.ts');

    // Combine into a single program for validation
    const combinedProgram = {
      type: 'Program',
      declarations: [
        ...stewardProgram.declarations,
        ...modelProgram.declarations,
        ...tokenProgram.declarations,
        ...flowProgram.declarations,
        ...covenantProgram.declarations
      ],
      imports: [
        ...stewardProgram.imports,
        ...modelProgram.imports,
        ...tokenProgram.imports,
        ...flowProgram.imports,
        ...covenantProgram.imports
      ]
    };

    // Validate the program
    const errors = validateProgram(combinedProgram);

    // Print validation results
    console.log('Validation Results:');
    console.log('===================');
    console.log(printErrors(errors));
    console.log('\n');

    // Print program structure
    console.log('Program Structure:');
    console.log('==================');
    console.log(`Total declarations: ${combinedProgram.declarations.length}`);
    const declarationTypes = combinedProgram.declarations.reduce((acc, decl) => {
      acc[decl.type] = (acc[decl.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    console.log('Declaration types:', declarationTypes);

    // Print specific declarations
    console.log('\nStewards:');
    combinedProgram.declarations
      .filter(decl => decl.type === 'StewardDeclaration')
      .forEach(decl => console.log(`  - ${decl.identifier}`));

    console.log('\nModels:');
    combinedProgram.declarations
      .filter(decl => decl.type === 'ModelDeclaration')
      .forEach(decl => console.log(`  - ${decl.identifier}`));

    console.log('\nTokens:');
    combinedProgram.declarations
      .filter(decl => decl.type === 'TokenDeclaration')
      .forEach(decl => console.log(`  - ${decl.identifier}`));

    console.log('\nFlows:');
    combinedProgram.declarations
      .filter(decl => decl.type === 'FlowDeclaration')
      .forEach(decl => console.log(`  - ${decl.identifier}`));

    console.log('\nCovenants:');
    combinedProgram.declarations
      .filter(decl => decl.type === 'CovenantDeclaration')
      .forEach(decl => console.log(`  - ${decl.identifier}`));

  } catch (error) {
    console.error('Error testing DSL:', error);
  }
}

// Run the test
if (require.main === module) {
  testDSL();
}

export { testDSL };
