import { covenant_token, type TokenConfig } from '../dsl';

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
