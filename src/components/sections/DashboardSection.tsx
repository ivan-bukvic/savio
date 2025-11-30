import { IncomeVsExpensesChart } from "@/components/IncomeVsExpensesChart";
import { ExpenseBreakdownChart } from "@/components/ExpenseBreakdownChart";
import { SavingsGoals } from "@/components/SavingsGoals";
import { DebtOverview } from "@/components/DebtOverview";
import { AIAnalysisSection } from "@/components/AIAnalysisSection";

export const DashboardSection = () => {
  return (
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
  );
};
