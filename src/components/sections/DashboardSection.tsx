import { IncomeVsExpensesChart } from "@/components/IncomeVsExpensesChart";
import { ExpenseBreakdownChart } from "@/components/ExpenseBreakdownChart";
import { SavingsGoals } from "@/components/SavingsGoals";
import { DebtOverview } from "@/components/DebtOverview";
import { ProDashboardAICard } from "@/components/ProDashboardAICard";

interface DashboardSectionProps {
  isPro?: boolean;
  onNavigateToInsights?: () => void;
  onUpgrade?: () => void;
}

export const DashboardSection = ({
  isPro = false,
  onNavigateToInsights = () => {},
  onUpgrade = () => {},
}: DashboardSectionProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">Welcome back! Here's your financial overview</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <IncomeVsExpensesChart />
        <ExpenseBreakdownChart />
      </div>

      {/* Goals and Debt Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <SavingsGoals />
        <DebtOverview />
      </div>

      {/* AI Analysis Section - Pro Gated */}
      <ProDashboardAICard
        isPro={isPro}
        onNavigateToInsights={onNavigateToInsights}
        onUpgrade={onUpgrade}
      />
    </div>
  );
};
