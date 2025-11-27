import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { DashboardLayout } from "@/components/DashboardLayout";
import { IncomeVsExpensesChart } from "@/components/IncomeVsExpensesChart";
import { ExpenseBreakdownChart } from "@/components/ExpenseBreakdownChart";
import { SavingsGoals } from "@/components/SavingsGoals";
import { DebtOverview } from "@/components/DebtOverview";
import { AIAnalysisSection } from "@/components/AIAnalysisSection";
import { Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (!session) {
          navigate("/auth");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your financial overview</p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IncomeVsExpensesChart />
          <ExpenseBreakdownChart />
        </div>

        {/* Goals and Debt Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SavingsGoals />
          <DebtOverview />
        </div>

        {/* AI Analysis Section */}
        <AIAnalysisSection />
      </div>
    </DashboardLayout>
  );
};

export default Index;
