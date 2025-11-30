import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const categoryColors: { [key: string]: string } = {
  "Housing": "hsl(var(--chart-1))",
  "Food": "hsl(var(--chart-2))",
  "Transportation": "hsl(var(--chart-3))",
  "Entertainment": "hsl(var(--chart-4))",
  "Utilities": "hsl(var(--chart-5))",
  "Others": "hsl(var(--muted-foreground))",
};

export const ExpenseBreakdownChart = () => {
  const [data, setData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: expensesData } = await supabase
        .from('expenses')
        .select('amount, category')
        .eq('user_id', user.id);

      // Aggregate by category
      const categoryTotals: { [key: string]: number } = {};
      
      expensesData?.forEach((expense) => {
        const category = expense.category || 'Others';
        categoryTotals[category] = (categoryTotals[category] || 0) + Number(expense.amount);
      });

      const chartData = Object.entries(categoryTotals).map(([name, value]) => ({
        name,
        value,
        color: categoryColors[name] || categoryColors["Others"],
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
        <CardTitle className="text-lg font-semibold">Expense Breakdown by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "0.5rem",
                color: "#FFFFFF",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
              }}
              labelStyle={{
                color: "#FFFFFF",
              }}
              itemStyle={{
                color: "#FFFFFF",
              }}
              cursor={false}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
