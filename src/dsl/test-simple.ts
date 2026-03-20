import { parseAtlasLang } from './parser';
import { validateProgram, printErrors } from './validator';

// Sample DSL code for testing
const sampleCode = `
import { steward, StewardConfig } from '@atlaslang/dsl';

export const LocalCouncil = steward<StewardConfig>({
  id: "did:ke:lc:001",
  name: "Local Water Council",
  attestations: ["council-auth", "water-quality-expert"],
  thresholds: {
    decision: 0.6,
    emergency: 0.8
  }
});

import { model, ModelConfig } from '@atlaslang/dsl';

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

import { covenant_token, TokenConfig } from '@atlaslang/dsl';

export const WaterCredit = covenant_token<TokenConfig>({
  name: "WaterCredit",
  symbol: "WC",
  decimals: 0,
  purpose: "Reward for verified water access improvements",
  redemption: {
    method: "carbon-offset",
    conversion_rate: "1 WC = 0.1 tCO2",
    expiry: "never"
  },
  impact_metrics: {
    water_access: true,
    health_impact: true,
    climate_impact: false
  },
  governance: {
    minting: "multi-sig",
    burning: "automated",
    redistribution: "community-vote"
  }
});
`;

// Test function
export function testDSL() {
  try {
    console.log('Parsing DSL code...');
    const program = parseAtlasLang(sampleCode, 'test-dsl.ts');
    
    console.log(`Successfully parsed ${program.declarations.length} declarations`);
    
    console.log('\nValidating program...');
    const errors = validateProgram(program);
    
    console.log('\nValidation Results:');
    console.log('===================');
    console.log(printErrors(errors));
    
    if (errors.length === 0) {
      console.log('\n✅ All declarations are valid!');
    }
    
    console.log('\nDeclaration Types:');
    const types = program.declarations.reduce((acc, decl) => {
      acc[decl.type] = (acc[decl.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    Object.entries(types).forEach(([type, count]) => {
      console.log(`  - ${type}: ${count}`);
    });
    
    return {
      program,
      errors,
      success: errors.length === 0
    };
    
  } catch (error) {
    console.error('Error testing DSL:', error);
    return {
      program: null,
      errors: [error],
      success: false
    };
  }
}
