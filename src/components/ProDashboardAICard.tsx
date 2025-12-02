import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Lock } from "lucide-react";

interface ProDashboardAICardProps {
  isPro: boolean;
  onNavigateToInsights: () => void;
  onUpgrade?: () => void;
}

export const ProDashboardAICard = ({
  isPro,
  onNavigateToInsights,
  onUpgrade,
}: ProDashboardAICardProps) => {
  if (isPro) {
    return (
      <Card className="card-shadow hover:card-shadow-hover transition-all duration-200 overflow-hidden">
        {/* Gold accent line */}
        <div className="h-1 bg-gradient-to-r from-gold via-gold/80 to-gold/60" />
        
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center gap-4 py-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 border border-gold/20">
              <Sparkles className="h-7 w-7 text-gold" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                AI Financial Analysis
              </h3>
              <p className="text-sm text-muted-foreground">
                Get personalized insights powered by Savio Intelligence
              </p>
            </div>
            <Button
              onClick={onNavigateToInsights}
              className="gap-2 bg-gold hover:bg-gold/90 text-gold-foreground"
            >
              <Sparkles className="h-4 w-4" />
              Generate Insights
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Non-Pro locked version
  return (
    <Card className="card-shadow hover:card-shadow-hover transition-all duration-200 overflow-hidden">
      {/* Gold accent line */}
      <div className="h-1 bg-gradient-to-r from-gold/50 via-gold/30 to-gold/20" />
      
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center gap-4 py-6">
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted border border-border">
              <Sparkles className="h-7 w-7 text-muted-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold">
              <Lock className="h-3 w-3 text-gold-foreground" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              AI Financial Analysis
              <span className="ml-2 text-xs font-medium text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                PRO
              </span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Unlock Pro to receive intelligent financial summaries and recommendations
            </p>
          </div>
          <Button
            onClick={onUpgrade}
            variant="outline"
            className="gap-2 border-gold/50 text-gold hover:bg-gold/10"
          >
            <Sparkles className="h-4 w-4" />
            Upgrade to Pro
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
