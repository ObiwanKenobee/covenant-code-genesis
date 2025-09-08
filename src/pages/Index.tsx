import AtlasHero from "@/components/AtlasHero";
import AtlasFeatures from "@/components/AtlasFeatures";
import AtlasCodeExample from "@/components/AtlasCodeExample";
import AtlasFooter from "@/components/AtlasFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <AtlasHero />
      <AtlasFeatures />
      <AtlasCodeExample />
      <AtlasFooter />
    </div>
  );
};

export default Index;