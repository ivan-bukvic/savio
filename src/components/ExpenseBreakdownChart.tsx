import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Housing", value: 1200, color: "hsl(var(--chart-1))" },
  { name: "Food", value: 600, color: "hsl(var(--chart-2))" },
  { name: "Transportation", value: 400, color: "hsl(var(--chart-3))" },
  { name: "Entertainment", value: 300, color: "hsl(var(--chart-4))" },
  { name: "Utilities", value: 250, color: "hsl(var(--chart-5))" },
  { name: "Others", value: 350, color: "hsl(var(--muted-foreground))" },
];

export const ExpenseBreakdownChart = () => {
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
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
