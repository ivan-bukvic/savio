import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, AlertCircle, Lightbulb, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface MonthlyStats {
  incomeGrowth: number;
  savingsRate: number;
  budgetStatus: string;
}

export const AIAnalysisSection = () => {
  const [loading, setLoading] = useState(true);
  const [aiReport, setAiReport] = useState<{ summary: string; suggestions: string } | null>(null);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch latest AI report
      const { data: reportData } = await supabase
        .from('ai_reports')
        .select('summary, suggestions')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      setAiReport(reportData);

      // Calculate monthly stats
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

      // Get current month income/expenses
      const { data: currentIncome } = await supabase
        .from('income')
        .select('amount')
        .eq('user_id', user.id)
        .gte('date', `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`)
        .lte('date', `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-31`);

      const { data: currentExpenses } = await supabase
        .from('expenses')
        .select('amount')
        .eq('user_id', user.id)
        .gte('date', `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`)
        .lte('date', `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-31`);

      // Get last month income
      const { data: lastMonthIncome } = await supabase
        .from('income')
        .select('amount')
        .eq('user_id', user.id)
        .gte('date', `${lastMonthYear}-${String(lastMonth + 1).padStart(2, '0')}-01`)
        .lte('date', `${lastMonthYear}-${String(lastMonth + 1).padStart(2, '0')}-31`);

      const currentIncomeTotal = currentIncome?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;
      const currentExpensesTotal = currentExpenses?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;
      const lastMonthIncomeTotal = lastMonthIncome?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;

      const incomeGrowth = lastMonthIncomeTotal > 0 
        ? ((currentIncomeTotal - lastMonthIncomeTotal) / lastMonthIncomeTotal) * 100 
        : 0;

      const savingsRate = currentIncomeTotal > 0 
        ? ((currentIncomeTotal - currentExpensesTotal) / currentIncomeTotal) * 100 
        : 0;

      const budgetStatus = savingsRate > 20 ? "Excellent" : savingsRate > 10 ? "On Track" : "Needs Attention";

      setMonthlyStats({
        incomeGrowth,
        savingsRate,
        budgetStatus
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
          <CardContent className="flex items-center justify-center h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Parse suggestions if available
  const suggestions = aiReport?.suggestions 
    ? aiReport.suggestions.split('\n').filter(s => s.trim())
    : [];

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
      {monthlyStats && (
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
                <p className="text-2xl font-bold text-foreground">
                  {monthlyStats.incomeGrowth > 0 ? '+' : ''}{monthlyStats.incomeGrowth.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">vs. last month</p>
              </div>
              
              <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium text-primary">Savings Rate</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{monthlyStats.savingsRate.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground mt-1">of total income</p>
              </div>
              
              <div className="rounded-lg bg-accent/10 p-4 border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-accent"></div>
                  <span className="text-sm font-medium text-accent">Budget Status</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{monthlyStats.budgetStatus}</p>
                <p className="text-xs text-muted-foreground mt-1">Based on savings rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Suggestions Preview */}
      {aiReport && suggestions.length > 0 && (
        <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              AI Insights
            </h3>
            
            {aiReport.summary && (
              <div className="mb-4 p-4 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-sm text-foreground">{aiReport.summary}</p>
              </div>
            )}
            
            <div className="space-y-3">
              {suggestions.slice(0, 3).map((suggestion, index) => (
                <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground">{suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
