import { Button } from "@/components/ui/button";

const AtlasFooter = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build with AtlasLang?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join the covenant-first programming movement and build systems that serve both people and planet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" variant="secondary" className="font-semibold text-lg px-8 py-3">
              Download AtlasLang
            </Button>
            <Button size="lg" variant="outline" className="font-semibold text-lg px-8 py-3 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
              Join Community
            </Button>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-8">
            <p className="text-primary-foreground/70">
              © 2024 Atlas Sanctum. Building regenerative systems for a covenant-first world.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AtlasFooter;