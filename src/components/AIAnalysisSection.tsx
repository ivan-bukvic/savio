import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, AlertCircle, Lightbulb } from "lucide-react";

export const AIAnalysisSection = () => {
  return (
    <div className="space-y-4">
      {/* Analysis Button */}
      <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                AI Financial Analysis
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get personalized insights and recommendations based on your financial data
              </p>
            </div>
            <Button size="lg" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Analyze My Finances
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Summary */}
      <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Monthly Summary
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg bg-success/10 p-4 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-success"></div>
                <span className="text-sm font-medium text-success">Income Growth</span>
              </div>
              <p className="text-2xl font-bold text-foreground">+8.5%</p>
              <p className="text-xs text-muted-foreground mt-1">vs. last month</p>
            </div>
            
            <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <span className="text-sm font-medium text-primary">Savings Rate</span>
              </div>
              <p className="text-2xl font-bold text-foreground">26.2%</p>
              <p className="text-xs text-muted-foreground mt-1">of total income</p>
            </div>
            
            <div className="rounded-lg bg-accent/10 p-4 border border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                <span className="text-sm font-medium text-accent">Budget Status</span>
              </div>
              <p className="text-2xl font-bold text-foreground">On Track</p>
              <p className="text-xs text-muted-foreground mt-1">Within limits</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions Preview */}
      <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Smart Suggestions
          </h3>
          
          <div className="space-y-3">
            <div className="flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Reduce dining expenses</p>
                <p className="text-xs text-muted-foreground">You're spending 15% more on dining out compared to your budget</p>
              </div>
            </div>
            
            <div className="flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <AlertCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Increase emergency fund</p>
                <p className="text-xs text-muted-foreground">You're close to your goal! Just $2,500 more to reach your target</p>
              </div>
            </div>
            
            <div className="flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <AlertCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Optimize debt payments</p>
                <p className="text-xs text-muted-foreground">Consider paying off your credit card first to save on interest</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
