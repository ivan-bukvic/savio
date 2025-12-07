import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Loader2 } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SavingsGoal {
  goal_name: string;
  target_amount: number;
  current_progress: number;
}

export const SavingsGoals = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: goalsData } = await supabase
        .from('savings_goals')
        .select('goal_name, target_amount, current_progress')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      setGoals(goalsData || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
        <CardContent className="flex items-center justify-center h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Savings Goals Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.length === 0 ? (
          <EmptyState
            icon={Target}
            title="No goals yet"
            description="Add your first saving goal to start tracking your progress."
            className="py-8"
          />
        ) : (
          goals.map((goal) => {
            const percentage = (Number(goal.current_progress) / Number(goal.target_amount)) * 100;
            
            return (
              <div key={goal.goal_name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{goal.goal_name}</span>
                  <span className="text-sm text-muted-foreground">
                    ${Number(goal.current_progress).toLocaleString()} / ${Number(goal.target_amount).toLocaleString()}
                  </span>
                </div>
                <div className="space-y-1">
                  <Progress value={percentage} className="h-2" />
                  <span className="text-xs text-muted-foreground">{percentage.toFixed(0)}% Complete</span>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};
