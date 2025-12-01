import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Target, TrendingUp, DollarSign, Percent, Edit, Trash2, Loader2 } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { MiniSparklineChart } from "@/components/MiniSparklineChart";

interface SavingsGoal {
  id: string;
  user_id: string;
  goal_name: string;
  target_amount: number;
  current_progress: number;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

interface GoalsSectionProps {
  userId: string;
}

export const GoalsSection = ({ userId }: GoalsSectionProps) => {
  const { toast } = useToast();
  const [goalsData, setGoalsData] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const [formData, setFormData] = useState({ goal_name: "", target_amount: "", current_progress: "", due_date: "" });

  useEffect(() => {
    fetchGoalsData();
  }, [userId]);

  const fetchGoalsData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("savings_goals")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch goals data",
        variant: "destructive",
      });
      setLoading(false);
    } else {
      // If no data, create dummy goals
      if (!data || data.length === 0) {
        await createDummyGoals();
      } else {
        setGoalsData(data || []);
        setLoading(false);
      }
    }
  };

  const createDummyGoals = async () => {
    const dummyGoals = [
      {
        user_id: userId,
        goal_name: "Emergency Fund",
        target_amount: 3000,
        current_progress: 700,
        due_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        user_id: userId,
        goal_name: "Vacation Trip",
        target_amount: 1500,
        current_progress: 1100,
        due_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
      {
        user_id: userId,
        goal_name: "New Laptop",
        target_amount: 2000,
        current_progress: 400,
        due_date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      }
    ];

    const { data, error } = await supabase
      .from("savings_goals")
      .insert(dummyGoals)
      .select();

    if (!error && data) {
      setGoalsData(data);
    }
    setLoading(false);
  };

  const handleAddGoal = async () => {
    if (!formData.goal_name || !formData.target_amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("savings_goals").insert([
      {
        user_id: userId,
        goal_name: formData.goal_name,
        target_amount: parseFloat(formData.target_amount),
        current_progress: parseFloat(formData.current_progress || "0"),
        due_date: formData.due_date || null,
      },
    ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add goal",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Goal added successfully",
      });
      setIsAddDialogOpen(false);
      setFormData({ goal_name: "", target_amount: "", current_progress: "", due_date: "" });
      fetchGoalsData();
    }
  };

  const handleEditGoal = async () => {
    if (!selectedGoal || !formData.goal_name || !formData.target_amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("savings_goals")
      .update({
        goal_name: formData.goal_name,
        target_amount: parseFloat(formData.target_amount),
        current_progress: parseFloat(formData.current_progress || "0"),
        due_date: formData.due_date || null,
      })
      .eq("id", selectedGoal.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update goal",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Goal updated successfully",
      });
      setIsEditDialogOpen(false);
      setSelectedGoal(null);
      setFormData({ goal_name: "", target_amount: "", current_progress: "", due_date: "" });
      fetchGoalsData();
    }
  };

  const handleDeleteGoal = async () => {
    if (!selectedGoal) return;

    const { error } = await supabase
      .from("savings_goals")
      .delete()
      .eq("id", selectedGoal.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete goal",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Goal deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setSelectedGoal(null);
      fetchGoalsData();
    }
  };

  const openEditDialog = (goal: SavingsGoal) => {
    setSelectedGoal(goal);
    setFormData({
      goal_name: goal.goal_name,
      target_amount: goal.target_amount.toString(),
      current_progress: goal.current_progress.toString(),
      due_date: goal.due_date || "",
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (goal: SavingsGoal) => {
    setSelectedGoal(goal);
    setIsDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Calculate KPIs
  const activeGoals = goalsData.filter(g => (g.current_progress / g.target_amount) < 1).length;
  const totalSaved = goalsData.reduce((sum, g) => sum + Number(g.current_progress), 0);
  const totalTarget = goalsData.reduce((sum, g) => sum + Number(g.target_amount), 0);
  const avgCompletion = goalsData.length > 0
    ? goalsData.reduce((sum, g) => sum + (Number(g.current_progress) / Number(g.target_amount)), 0) / goalsData.length * 100
    : 0;

  // Sparkline data for KPI cards
  const sparklineData = [120, 180, 250, 190, 230, 280, 320, 290, 340, 380];

  // Area chart data - simulate monthly progress
  const monthlyProgressData = [
    { month: "Jan", total: 720 },
    { month: "Feb", total: 690 },
    { month: "Mar", total: 740 },
    { month: "Apr", total: 710 },
    { month: "May", total: 760 },
    { month: "Jun", total: 750 },
    { month: "Jul", total: 780 },
    { month: "Aug", total: 740 },
    { month: "Sep", total: 790 },
  ];

  // Bar chart data - goal funding distribution
  const goalFundingData = goalsData.map(goal => ({
    name: goal.goal_name,
    saved: Number(goal.current_progress),
    remaining: Number(goal.target_amount) - Number(goal.current_progress),
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Savings Goals</h1>
          <p className="text-muted-foreground mt-1">Track and manage your financial goals</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Goal
        </Button>
      </div>

      {/* KPI Cards with Mini Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-shadow hover:card-shadow-hover transition-all duration-200 overflow-hidden border-0">
          <CardContent className="p-6 pb-0">
            <div className="flex items-center gap-3 mb-3 min-h-[88px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Active Goals</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">{activeGoals}</h3>
              </div>
            </div>
            <div className="overflow-hidden -mb-1">
              <MiniSparklineChart data={sparklineData} color="hsl(var(--primary))" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow hover:card-shadow-hover transition-all duration-200 overflow-hidden border-0">
          <CardContent className="p-6 pb-0">
            <div className="flex items-center gap-3 mb-3 min-h-[88px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Saved So Far</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">${totalSaved.toLocaleString()}</h3>
              </div>
            </div>
            <div className="overflow-hidden -mb-1">
              <MiniSparklineChart data={sparklineData} color="hsl(173, 70%, 50%)" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow hover:card-shadow-hover transition-all duration-200 overflow-hidden border-0">
          <CardContent className="p-6 pb-0">
            <div className="flex items-center gap-3 mb-3 min-h-[88px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Target Amount</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">${totalTarget.toLocaleString()}</h3>
              </div>
            </div>
            <div className="overflow-hidden -mb-1">
              <MiniSparklineChart data={sparklineData} color="hsl(220, 80%, 55%)" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow hover:card-shadow-hover transition-all duration-200 overflow-hidden border-0">
          <CardContent className="p-6 pb-0">
            <div className="flex items-center gap-3 mb-3 min-h-[88px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Percent className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Completion Rate</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">{avgCompletion.toFixed(1)}%</h3>
              </div>
            </div>
            <div className="overflow-hidden -mb-1">
              <MiniSparklineChart data={sparklineData} color="hsl(25, 95%, 55%)" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Savings Progress Area Chart */}
        <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Overall Savings Progress Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                total: {
                  label: "Total Saved",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyProgressData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value: number) => [`$${value}`, "Total Saved"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    fill="url(#colorTotal)"
                    fillOpacity={1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Goal Funding Distribution Bar Chart */}
        <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Goal Funding Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                saved: {
                  label: "Saved",
                  color: "hsl(142, 76%, 45%)",
                },
                remaining: {
                  label: "Remaining",
                  color: "hsl(45, 93%, 58%)",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={goalFundingData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value: number) => `$${value}`}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: "20px",
                      fontSize: "14px",
                    }}
                  />
                  <Bar dataKey="saved" fill="hsl(142, 76%, 45%)" radius={[0, 0, 0, 0]} barSize={40} />
                  <Bar dataKey="remaining" fill="hsl(45, 93%, 58%)" radius={[0, 0, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Goals Table */}
      <Card className="card-shadow hover:card-shadow-hover transition-all duration-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">All Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Goal Name</TableHead>
                <TableHead>Target Amount</TableHead>
                <TableHead>Current Progress</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Completion</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goalsData.map((goal) => {
                const percentage = (Number(goal.current_progress) / Number(goal.target_amount)) * 100;
                return (
                  <TableRow key={goal.id}>
                    <TableCell className="font-medium">{goal.goal_name}</TableCell>
                    <TableCell>${Number(goal.target_amount).toLocaleString()}</TableCell>
                    <TableCell>${Number(goal.current_progress).toLocaleString()}</TableCell>
                    <TableCell>
                      {goal.due_date ? format(new Date(goal.due_date), "MMM dd, yyyy") : "No deadline"}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={percentage} className="h-2" />
                        <span className="text-xs text-muted-foreground">{percentage.toFixed(0)}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(goal)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(goal)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Goal Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Goal</DialogTitle>
            <DialogDescription>Create a new savings goal to track your progress</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="goal_name">Goal Name</Label>
              <Input
                id="goal_name"
                value={formData.goal_name}
                onChange={(e) => setFormData({ ...formData, goal_name: e.target.value })}
                placeholder="e.g., Emergency Fund"
              />
            </div>
            <div>
              <Label htmlFor="target_amount">Target Amount</Label>
              <Input
                id="target_amount"
                type="number"
                value={formData.target_amount}
                onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
                placeholder="e.g., 3000"
              />
            </div>
            <div>
              <Label htmlFor="current_progress">Current Progress</Label>
              <Input
                id="current_progress"
                type="number"
                value={formData.current_progress}
                onChange={(e) => setFormData({ ...formData, current_progress: e.target.value })}
                placeholder="e.g., 500"
              />
            </div>
            <div>
              <Label htmlFor="due_date">Due Date (Optional)</Label>
              <Input
                id="due_date"
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddGoal}>Add Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Goal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
            <DialogDescription>Update your savings goal details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit_goal_name">Goal Name</Label>
              <Input
                id="edit_goal_name"
                value={formData.goal_name}
                onChange={(e) => setFormData({ ...formData, goal_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit_target_amount">Target Amount</Label>
              <Input
                id="edit_target_amount"
                type="number"
                value={formData.target_amount}
                onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit_current_progress">Current Progress</Label>
              <Input
                id="edit_current_progress"
                type="number"
                value={formData.current_progress}
                onChange={(e) => setFormData({ ...formData, current_progress: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit_due_date">Due Date (Optional)</Label>
              <Input
                id="edit_due_date"
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditGoal}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Goal Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Goal</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedGoal?.goal_name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteGoal}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
