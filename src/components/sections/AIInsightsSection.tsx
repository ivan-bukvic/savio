import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Shield,
  Target,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AIInsightsSectionProps {
  userId: string;
}

interface AIAnalysis {
  summary: string;
  spendingPatterns: {
    topCategory: string;
    trend: "increasing" | "decreasing" | "stable";
    suggestion: string;
  };
  incomeStability: {
    status: "stable" | "variable" | "declining";
    description: string;
  };
  savingsAnalysis: {
    rate: number;
    goalProgress: string;
    recommendation: string;
  };
  recommendedActions: string[];
  riskFlags: string[];
}

export const AIInsightsSection = ({ userId }: AIInsightsSectionProps) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateInsights = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "generate-ai-insights",
        {
          body: { userId },
        }
      );

      if (fnError) throw fnError;

      if (data.error) {
        throw new Error(data.error);
      }

      setAnalysis(data.analysis);
      toast({
        title: "Analysis Complete",
        description: "Your personalized financial insights are ready.",
      });
    } catch (err: any) {
      console.error("Error generating insights:", err);
      setError(err.message || "Failed to generate insights");
      toast({
        title: "Analysis Failed",
        description: "We couldn't generate insights. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-5 w-5 text-destructive" />;
      case "decreasing":
        return <TrendingDown className="h-5 w-5 text-success" />;
      default:
        return <TrendingUp className="h-5 w-5 text-primary rotate-0" />;
    }
  };

  const getStabilityColor = (status: string) => {
    switch (status) {
      case "stable":
        return "text-success bg-success/10 border-success/20";
      case "variable":
        return "text-accent bg-accent/10 border-accent/20";
      default:
        return "text-destructive bg-destructive/10 border-destructive/20";
    }
  };

  if (error && !analysis) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 md:gap-3">
            <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-gold" />
            AI Insights
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Personalized financial intelligence powered by Savio
          </p>
        </div>

        <Card className="card-shadow overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-destructive via-destructive/80 to-destructive/60" />
          <CardContent className="p-4 md:p-8">
            <div className="flex flex-col items-center justify-center gap-4 py-6 md:py-8">
              <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-6 w-6 md:h-8 md:w-8 text-destructive" />
              </div>
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                  AI Insights Unavailable
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We couldn't retrieve insights. Please try again.
                </p>
              </div>
              <Button onClick={generateInsights} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 md:gap-3">
            <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-gold" />
            AI Insights
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Personalized financial intelligence powered by Savio
          </p>
        </div>
        {analysis && (
          <Button
            onClick={generateInsights}
            disabled={loading}
            variant="outline"
            className="gap-2 w-full sm:w-auto"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        )}
      </div>

      {/* Generate Button - Show when no analysis */}
      {!analysis && !loading && (
        <Card className="card-shadow overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-gold via-gold/80 to-gold/60" />
          <CardContent className="p-4 md:p-8">
            <div className="flex flex-col items-center justify-center gap-4 md:gap-6 py-8 md:py-12">
              <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-gold/10 border-2 border-gold/20">
                <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-gold" />
              </div>
              <div className="text-center max-w-md">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                  Generate AI Insights
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Analyze your income, expenses, goals, and debts to receive
                  personalized financial recommendations.
                </p>
              </div>
              <Button
                size="lg"
                onClick={generateInsights}
                className="gap-2 bg-gold hover:bg-gold/90 text-gold-foreground w-full sm:w-auto"
              >
                <Sparkles className="h-5 w-5" />
                Generate Insights
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <Card className="card-shadow overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-gold via-gold/80 to-gold/60 animate-pulse" />
          <CardContent className="p-4 md:p-8">
            <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-12">
              <Loader2 className="h-10 w-10 md:h-12 md:w-12 animate-spin text-gold" />
              <div className="text-center">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                  Analyzing Your Finances...
                </h3>
                <p className="text-sm text-muted-foreground">
                  This may take a few moments
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysis && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Summary Card */}
          <Card className="card-shadow lg:col-span-2 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-gold via-gold/80 to-gold/60" />
            <CardContent className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-gold" />
                Summary
              </h3>
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                {analysis.summary}
              </p>
            </CardContent>
          </Card>

          {/* Spending Patterns */}
          <Card className="card-shadow">
            <CardContent className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
                {getTrendIcon(analysis.spendingPatterns.trend)}
                Spending Patterns
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Top Category</span>
                  <span className="font-medium text-sm text-foreground">
                    {analysis.spendingPatterns.topCategory}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Trend</span>
                  <span className="font-medium text-sm text-foreground capitalize">
                    {analysis.spendingPatterns.trend}
                  </span>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
                  <p className="text-xs md:text-sm text-foreground">
                    {analysis.spendingPatterns.suggestion}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Income Stability */}
          <Card className="card-shadow">
            <CardContent className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Income Stability
              </h3>
              <div
                className={`p-4 rounded-lg border ${getStabilityColor(
                  analysis.incomeStability.status
                )}`}
              >
                <p className="font-medium text-sm capitalize mb-2">
                  {analysis.incomeStability.status}
                </p>
                <p className="text-xs md:text-sm opacity-90">
                  {analysis.incomeStability.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Savings Analysis */}
          <Card className="card-shadow">
            <CardContent className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-secondary" />
                Savings Goal Analysis
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Savings Rate</span>
                  <span className="font-medium text-sm text-foreground">
                    {analysis.savingsAnalysis.rate}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Goal Progress</span>
                  <span className="font-medium text-sm text-foreground">
                    {analysis.savingsAnalysis.goalProgress}
                  </span>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                  <p className="text-xs md:text-sm text-foreground">
                    {analysis.savingsAnalysis.recommendation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Actions */}
          <Card className="card-shadow">
            <CardContent className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-gold" />
                Recommended Actions
              </h3>
              <ul className="space-y-3">
                {analysis.recommendedActions.map((action, index) => (
                  <li
                    key={index}
                    className="flex gap-3 p-3 rounded-lg bg-gold/5 border border-gold/10"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-gold text-xs font-medium flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-xs md:text-sm text-foreground">{action}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Risk Flags */}
          {analysis.riskFlags.length > 0 && (
            <Card className="card-shadow lg:col-span-2 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-destructive via-destructive/80 to-destructive/60" />
              <CardContent className="p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Risk Flags
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {analysis.riskFlags.map((flag, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20"
                    >
                      <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
                      <p className="text-xs md:text-sm text-foreground">{flag}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
