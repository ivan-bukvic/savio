import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";

const goals = [
  { name: "Emergency Fund", target: 10000, current: 7500, color: "hsl(var(--chart-1))" },
  { name: "Vacation", target: 3000, current: 1800, color: "hsl(var(--chart-2))" },
  { name: "New Car", target: 15000, current: 5000, color: "hsl(var(--chart-3))" },
  { name: "Home Down Payment", target: 50000, current: 12000, color: "hsl(var(--chart-4))" },
];

export const SavingsGoals = () => {
  return (
    <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Savings Goals Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal) => {
          const percentage = (goal.current / goal.target) * 100;
          
          return (
            <div key={goal.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{goal.name}</span>
                <span className="text-sm text-muted-foreground">
                  ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                </span>
              </div>
              <div className="space-y-1">
                <Progress value={percentage} className="h-2" />
                <span className="text-xs text-muted-foreground">{percentage.toFixed(0)}% Complete</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
