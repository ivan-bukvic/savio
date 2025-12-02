import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles } from "lucide-react";

interface LockedFeatureScreenProps {
  title: string;
  description: string;
  onUpgrade?: () => void;
}

export const LockedFeatureScreen = ({
  title,
  description,
  onUpgrade,
}: LockedFeatureScreenProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground mt-1">Pro Feature</p>
      </div>

      <Card className="card-shadow overflow-hidden">
        {/* Gold accent line at top */}
        <div className="h-1 bg-gradient-to-r from-gold via-gold/80 to-gold/60" />
        
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center gap-6 py-12">
            {/* Premium lock icon */}
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gold/10 border-2 border-gold/20">
                <Lock className="h-12 w-12 text-gold" />
              </div>
              <div className="absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-gold">
                <Sparkles className="h-4 w-4 text-gold-foreground" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-bold text-foreground mb-3">
                {title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>

            {/* Upgrade button */}
            <Button
              size="lg"
              onClick={onUpgrade}
              className="gap-2 bg-gold hover:bg-gold/90 text-gold-foreground mt-4"
            >
              <Sparkles className="h-4 w-4" />
              Upgrade to Pro
            </Button>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-2xl">
              {[
                { title: "AI Analysis", desc: "Personalized insights" },
                { title: "Smart Recommendations", desc: "Actionable advice" },
                { title: "Risk Detection", desc: "Early warnings" },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="text-center p-4 rounded-lg bg-muted/50 border border-border"
                >
                  <p className="font-medium text-foreground">{feature.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
