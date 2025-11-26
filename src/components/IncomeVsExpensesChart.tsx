import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", income: 5200, expenses: 3800 },
  { month: "Feb", income: 5400, expenses: 4100 },
  { month: "Mar", income: 5100, expenses: 3900 },
  { month: "Apr", income: 5600, expenses: 4300 },
  { month: "May", income: 5800, expenses: 4200 },
  { month: "Jun", income: 6000, expenses: 4500 },
  { month: "Jul", income: 5900, expenses: 4400 },
  { month: "Aug", income: 6200, expenses: 4600 },
  { month: "Sep", income: 6100, expenses: 4400 },
  { month: "Oct", income: 6300, expenses: 4700 },
  { month: "Nov", income: 6500, expenses: 4800 },
  { month: "Dec", income: 6800, expenses: 5000 },
];

export const IncomeVsExpensesChart = () => {
  return (
    <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Monthly Income vs. Expenses</CardTitle>
      </CardHeader>
      <CardContent>
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
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Bar dataKey="income" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expenses" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
