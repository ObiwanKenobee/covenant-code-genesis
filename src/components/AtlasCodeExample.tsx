const AtlasCodeExample = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            See AtlasLang in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Covenant contracts that encode ethics, governance, and regenerative outcomes directly in code.
          </p>
        </div>
        
        <div className="bg-code-bg border border-border rounded-lg p-8 shadow-soft overflow-x-auto">
          <pre className="text-sm text-foreground font-mono leading-relaxed">
{`// Steward identity
steward LocalCouncil {
  id: "did:ke:lc:001"
  attestations: ["council-auth"]
}

// Covenant for water credit issuance
covenant BoreholeCovenant between [LocalCouncil, AtlasCouncil] {
  purpose: "Verified borehole repairs create WaterCredits"

  guard pre disburse_repair(r) {
    require model["photoVerifier"].run(r.image_hash) == true
  }

  on commit disburse_repair(r) {
    let credit = covenant_token.mint(holder = r.community, amount = 100)
    ledger.append("water_credit", credit.provenance())
  }
}`}
          </pre>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-2xl mb-3">🔗</div>
            <h3 className="font-semibold text-lg mb-2 text-foreground">Policy as Code</h3>
            <p className="text-muted-foreground text-sm">
              Encode governance rules directly in smart contracts
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="font-semibold text-lg mb-2 text-foreground">Auditable by Default</h3>
            <p className="text-muted-foreground text-sm">
              Every state change carries provenance metadata
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-3">🌊</div>
            <h3 className="font-semibold text-lg mb-2 text-foreground">Impact Tracking</h3>
            <p className="text-muted-foreground text-sm">
              Built-in primitives for regenerative outcomes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtlasCodeExample;