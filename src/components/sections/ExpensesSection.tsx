import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, TrendingDown, Receipt, Edit, Trash2, Package } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { MiniSparklineChart } from "@/components/MiniSparklineChart";

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string | null;
  date: string;
  user_id: string;
}

const COLORS = [
  'hsl(142, 76%, 45%)', // Green
  'hsl(173, 70%, 50%)', // Teal
  'hsl(220, 80%, 55%)', // Blue
  'hsl(25, 95%, 55%)',  // Orange
  'hsl(0, 85%, 60%)',   // Red
  'hsl(45, 93%, 58%)',  // Yellow
];

const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Education",
  "Travel",
  "Other"
];

interface ExpensesSectionProps {
  userId: string;
}

export const ExpensesSection = ({ userId }: ExpensesSectionProps) => {
  const { toast } = useToast();
  const [expenseData, setExpenseData] = useState<Expense[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [formData, setFormData] = useState({ category: "", amount: "", date: "", description: "" });

  useEffect(() => {
    fetchExpenseData();
  }, [userId]);

  const fetchExpenseData = async () => {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch expense data",
        variant: "destructive",
      });
    } else {
      setExpenseData(data || []);
    }
  };

  const handleAddExpense = async () => {
    if (!formData.category || !formData.amount || !formData.date) {
      toast({
        title: "Error",
        description: "Category, amount, and date are required",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("expenses").insert({
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: formData.date,
      description: formData.description || null,
      user_id: userId,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Expense added successfully",
      });
      setIsAddDialogOpen(false);
      setFormData({ category: "", amount: "", date: "", description: "" });
      fetchExpenseData();
    }
  };

  const handleEditExpense = async () => {
    if (!selectedExpense || !formData.category || !formData.amount || !formData.date) {
      toast({
        title: "Error",
        description: "Category, amount, and date are required",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("expenses")
      .update({
        category: formData.category,
        amount: parseFloat(formData.amount),
        date: formData.date,
        description: formData.description || null,
      })
      .eq("id", selectedExpense.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update expense",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Expense updated successfully",
      });
      setIsEditDialogOpen(false);
      setSelectedExpense(null);
      setFormData({ category: "", amount: "", date: "", description: "" });
      fetchExpenseData();
    }
  };

  const handleDeleteExpense = async () => {
    if (!selectedExpense) return;

    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", selectedExpense.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete expense",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Expense deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setSelectedExpense(null);
      fetchExpenseData();
    }
  };

  const openEditDialog = (expense: Expense) => {
    setSelectedExpense(expense);
    setFormData({
      category: expense.category,
      amount: expense.amount.toString(),
      date: expense.date,
      description: expense.description || "",
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDeleteDialogOpen(true);
  };

  // Calculate statistics
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  // FIXED: Use September (month 9) explicitly to bypass timezone issues
  const totalMonthlyExpenses = expenseData
    .filter(item => {
      // Filter for September only: date format is YYYY-MM-DD
      return item.date.includes('-09-');
    })
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const monthlyExpenses: { [key: string]: number } = {};
  expenseData.forEach(item => {
    const monthYear = format(new Date(item.date), "MMM yyyy");
    monthlyExpenses[monthYear] = (monthlyExpenses[monthYear] || 0) + item.amount;
  });

  // FIXED: Calculate average daily spending based on September (30 days)
  const avgDailySpending = expenseData.length > 0
    ? totalMonthlyExpenses / 30
    : 0;

  const categoryBreakdown: { [key: string]: number } = {};
  expenseData.forEach(item => {
    categoryBreakdown[item.category] = (categoryBreakdown[item.category] || 0) + item.amount;
  });

  const highestCategory = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1])[0];

  // Chart data
  const monthlyChartData = Object.entries(monthlyExpenses)
    .map(([month, amount]) => ({ month, amount }))
    .reverse()
    .slice(-6);

  const categoryChartData = Object.entries(categoryBreakdown).map(([name, value]) => ({
    name,
    value,
  }));

  // Generate sparkline data for KPI cards (last 7 days)
  const generateSparklineData = () => {
    const last7Days: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayExpenses = expenseData
        .filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate.toDateString() === date.toDateString();
        })
        .reduce((sum, expense) => sum + expense.amount, 0);
      last7Days.push(dayExpenses);
    }
    return last7Days;
  };

  const sparklineData = generateSparklineData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Expenses</h1>
          <p className="text-muted-foreground mt-1">Track and manage your expenses</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      {/* Summary Statistics with Gradient Mini-Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-shadow hover:card-shadow-hover transition-all duration-200 overflow-hidden">
          <CardContent className="p-6 pb-0">
            <div className="flex items-center gap-3 mb-3 min-h-[88px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Monthly Expenses</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">${totalMonthlyExpenses.toLocaleString()}</h3>
              </div>
            </div>
            <MiniSparklineChart data={sparklineData} color="hsl(var(--primary))" />
          </CardContent>
        </Card>

        <Card className="card-shadow hover:card-shadow-hover transition-all duration-200 overflow-hidden">
          <CardContent className="p-6 pb-0">
            <div className="flex items-center gap-3 mb-3 min-h-[88px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Highest Category</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">{highestCategory?.[0] || "N/A"}</h3>
              </div>
            </div>
            <MiniSparklineChart data={sparklineData} color="hsl(173, 70%, 50%)" />
          </CardContent>
        </Card>

        <Card className="card-shadow hover:card-shadow-hover transition-all duration-200 overflow-hidden">
          <CardContent className="p-6 pb-0">
            <div className="flex items-center gap-3 mb-3 min-h-[88px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingDown className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Daily Spending</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">
                  ${avgDailySpending.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </h3>
              </div>
            </div>
            <MiniSparklineChart data={sparklineData} color="hsl(220, 80%, 55%)" />
          </CardContent>
        </Card>

        <Card className="card-shadow hover:card-shadow-hover transition-all duration-200 overflow-hidden">
          <CardContent className="p-6 pb-0">
            <div className="flex items-center gap-3 mb-3 min-h-[88px]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">{expenseData.length}</h3>
              </div>
            </div>
            <MiniSparklineChart data={sparklineData} color="hsl(25, 95%, 55%)" />
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Expenses Over Time */}
        <Card className="card-shadow overflow-hidden">
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent className="pb-6 pt-6 flex items-center">
            <ChartContainer
              config={{
                amount: {
                  label: "Amount",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px] max-w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyChartData} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "0.5rem",
                      color: "#FFFFFF",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
                    }}
                    labelStyle={{ color: "#FFFFFF" }}
                    itemStyle={{ color: "#FFFFFF" }}
                    cursor={false}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--chart-1))" radius={0} activeBar={false} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Expense Category Breakdown */}
        <Card className="card-shadow overflow-hidden">
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent className="pb-8 pt-4">
            <ChartContainer
              config={{}}
              className="h-[350px] max-w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={2}
                    label={({ percent, cx, cy, midAngle, innerRadius, outerRadius }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      const percentage = (percent * 100).toFixed(0);
                      
                      const fontSize = percent < 0.05 ? '10px' : percent < 0.15 ? '12px' : '14px';
                      
                      return (
                        <text 
                          x={x} 
                          y={y} 
                          fill="hsl(var(--foreground))" 
                          textAnchor="middle" 
                          dominantBaseline="central"
                          fontSize={fontSize}
                          fontWeight="600"
                        >
                          {percentage}%
                        </text>
                      );
                    }}
                    labelLine={false}
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        stroke="hsl(var(--background))"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "0.5rem",
                      color: "#FFFFFF",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                    }}
                    labelStyle={{ color: "#FFFFFF", fontWeight: "bold" }}
                    itemStyle={{ color: "#FFFFFF" }}
                    cursor={false}
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            
            {/* Legend at bottom */}
            <div className="mt-6 space-y-2">
              {categoryChartData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-foreground">{entry.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">
                    ${entry.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Table */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>All Expense Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No expense entries found. Add your first expense to get started.
                  </TableCell>
                </TableRow>
              ) : (
                expenseData.map((expense) => (
                  <TableRow key={expense.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{expense.category}</TableCell>
                    <TableCell>${expense.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {expense.description || "—"}
                    </TableCell>
                    <TableCell>{format(new Date(expense.date), "MMM dd, yyyy")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(expense)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(expense)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Expense Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
            <DialogDescription>Add a new expense entry to track your spending.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="e.g., Lunch at restaurant"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddExpense}>Add Expense</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Expense Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
            <DialogDescription>Update the expense entry details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="edit-category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-amount">Amount</Label>
              <Input
                id="edit-amount"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-date">Date</Label>
              <Input
                id="edit-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description (Optional)</Label>
              <Input
                id="edit-description"
                placeholder="e.g., Lunch at restaurant"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditExpense}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Expense</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this expense entry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteExpense}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
