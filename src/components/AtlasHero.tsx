import { Button } from "@/components/ui/button";
import heroImage from "@/assets/atlas-hero.jpg";

const AtlasHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-earth-gradient">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-hero-gradient opacity-90" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary-foreground">
            AtlasLang
            <span className="block text-4xl md:text-5xl font-medium text-primary-foreground/90 mt-4">
              🌍🕊️
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/95 max-w-4xl mx-auto leading-relaxed font-medium">
            A <strong>covenant-first programming language</strong> for building ethical, 
            auditable, and regenerative systems.
          </p>
        </div>
        
        <div className="mb-12">
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto mb-8">
            More than a programming language — it's a <em>covenant framework</em> for 
            safe AI, transparent ledgers, and regenerative outcomes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="font-semibold text-lg px-8 py-3">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="font-semibold text-lg px-8 py-3 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
              View Documentation
            </Button>
          </div>
        </div>

        <div className="text-primary-foreground/70 text-sm">
          The official language of <strong>Atlas Sanctum</strong>
        </div>
      </div>
    </section>
  );
};

export default AtlasHero;