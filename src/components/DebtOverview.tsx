import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CreditCard, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DebtData {
  name: string;
  amount: number;
  monthly: number;
}

export const DebtOverview = () => {
  const [debtData, setDebtData] = useState<DebtData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: debtsData } = await supabase
        .from('debts')
        .select('debt_name, balance, minimum_payment')
        .eq('user_id', user.id)
        .order('balance', { ascending: false });

      const chartData = debtsData?.map((debt) => ({
        name: debt.debt_name,
        amount: Number(debt.balance),
        monthly: Number(debt.minimum_payment),
      })) || [];

      setDebtData(chartData);
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
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Debt Overview & Payoff Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        {debtData.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No debts tracked. Great job!</p>
        ) : (
          <>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">Total Debt</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  ${debtData.reduce((sum, debt) => sum + debt.amount, 0).toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">Monthly Payment</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  ${debtData.reduce((sum, debt) => sum + debt.monthly, 0).toLocaleString()}
                </p>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={debtData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              type="number"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
              <Bar dataKey="amount" fill="hsl(var(--chart-1))" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
};
