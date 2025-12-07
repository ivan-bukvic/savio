import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, BarChart3 } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export const IncomeVsExpensesChart = () => {
  const [data, setData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const currentYear = new Date().getFullYear();
      
      // Fetch income
      const { data: incomeData } = await supabase
        .from('income')
        .select('amount, date')
        .eq('user_id', user.id)
        .gte('date', `${currentYear}-01-01`)
        .lte('date', `${currentYear}-12-31`);

      // Fetch expenses
      const { data: expensesData } = await supabase
        .from('expenses')
        .select('amount, date')
        .eq('user_id', user.id)
        .gte('date', `${currentYear}-01-01`)
        .lte('date', `${currentYear}-12-31`);

      // Check if there's any data
      const hasAnyData = (incomeData && incomeData.length > 0) || (expensesData && expensesData.length > 0);
      setHasData(hasAnyData);

      // Aggregate by month - only show Jan to Sep
      const monthlyData: { [key: string]: { income: number; expenses: number } } = {};
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
      
      months.forEach((month) => {
        monthlyData[month] = { income: 0, expenses: 0 };
      });

      incomeData?.forEach((item) => {
        const monthIndex = new Date(item.date).getMonth();
        // Only include Jan-Sep (months 0-8)
        if (monthIndex <= 8) {
          const month = months[monthIndex];
          monthlyData[month].income += Number(item.amount);
        }
      });

      expensesData?.forEach((item) => {
        const monthIndex = new Date(item.date).getMonth();
        // Only include Jan-Sep (months 0-8)
        if (monthIndex <= 8) {
          const month = months[monthIndex];
          monthlyData[month].expenses += Number(item.amount);
        }
      });

      const chartData = months.map((month) => ({
        month,
        income: monthlyData[month].income,
        expenses: monthlyData[month].expenses,
      }));

      setData(chartData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
        <CardContent className="flex items-center justify-center h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Monthly Income vs. Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <EmptyState
            icon={BarChart3}
            title="No financial activity yet"
            description="Once you add income or expenses, your monthly overview will appear here."
            className="h-[300px]"
          />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(var(--popover-foreground))",
                }}
                cursor={false}
              />
              <Legend />
              <Bar dataKey="income" fill="hsl(var(--chart-1))" activeBar={false} />
              <Bar dataKey="expenses" fill="hsl(var(--chart-2))" activeBar={false} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
