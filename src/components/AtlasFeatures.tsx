import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Covenant Contracts",
    description: "Native primitives for multi-signer, ethical agreements with built-in governance.",
    icon: "🤝"
  },
  {
    title: "Steward Identities", 
    description: "Role-based, MPC-controlled actors with attestations and verifiable credentials.",
    icon: "🛡️"
  },
  {
    title: "MRV Workflows",
    description: "Built-in sanctum_flow for monitoring, reporting, and verification of impact.",
    icon: "📊"
  },
  {
    title: "AI Governance",
    description: "First-class model objects with provenance, risk registers, and explainability hooks.",
    icon: "🤖"
  },
  {
    title: "Privacy by Design",
    description: "consent, sealed, enclave, and ephemeral data primitives for secure processing.",
    icon: "🔒"
  },
  {
    title: "Regenerative Finance",
    description: "covenant_token for impact-linked assets & credits with transparent tracking.",
    icon: "🌱"
  }
];

const AtlasFeatures = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Features that Matter
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AtlasLang provides the tools needed for ethical, transparent, and regenerative systems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-soft transition-all duration-300 hover:-translate-y-1 border-border/50">
              <CardHeader className="pb-4">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-card-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AtlasFeatures;