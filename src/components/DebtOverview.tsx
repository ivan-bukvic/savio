import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CreditCard } from "lucide-react";

const debtData = [
  { name: "Credit Card", amount: 3500, monthly: 200 },
  { name: "Student Loan", amount: 15000, monthly: 350 },
  { name: "Car Loan", amount: 8000, monthly: 280 },
  { name: "Personal Loan", amount: 2000, monthly: 150 },
];

export const DebtOverview = () => {
  return (
    <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Debt Overview & Payoff Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
