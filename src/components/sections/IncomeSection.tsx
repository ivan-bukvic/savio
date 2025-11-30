import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, TrendingUp, Wallet, Edit, Trash2 } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
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
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Income {
  id: string;
  amount: number;
  source: string;
  date: string;
  user_id: string;
}

const COLORS = [
  'hsl(173, 58%, 39%)', // Teal
  'hsl(142, 76%, 36%)', // Green
  'hsl(221, 83%, 53%)', // Blue
  'hsl(25, 95%, 53%)',  // Orange
  'hsl(48, 96%, 53%)',  // Yellow
];

interface IncomeSectionProps {
  userId: string;
}

export const IncomeSection = ({ userId }: IncomeSectionProps) => {
  const { toast } = useToast();
  const [incomeData, setIncomeData] = useState<Income[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [formData, setFormData] = useState({ source: "", amount: "", date: "" });

  useEffect(() => {
    fetchIncomeData();
  }, [userId]);

  const fetchIncomeData = async () => {
    const { data, error } = await supabase
      .from("income")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch income data",
        variant: "destructive",
      });
    } else {
      setIncomeData(data || []);
    }
  };

  const handleAddIncome = async () => {
    if (!formData.source || !formData.amount || !formData.date) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("income").insert({
      source: formData.source,
      amount: parseFloat(formData.amount),
      date: formData.date,
      user_id: userId,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add income",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Income added successfully",
      });
      setIsAddDialogOpen(false);
      setFormData({ source: "", amount: "", date: "" });
      fetchIncomeData();
    }
  };

  const handleEditIncome = async () => {
    if (!selectedIncome || !formData.source || !formData.amount || !formData.date) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("income")
      .update({
        source: formData.source,
        amount: parseFloat(formData.amount),
        date: formData.date,
      })
      .eq("id", selectedIncome.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update income",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Income updated successfully",
      });
      setIsEditDialogOpen(false);
      setSelectedIncome(null);
      setFormData({ source: "", amount: "", date: "" });
      fetchIncomeData();
    }
  };

  const handleDeleteIncome = async () => {
    if (!selectedIncome) return;

    const { error } = await supabase
      .from("income")
      .delete()
      .eq("id", selectedIncome.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete income",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Income deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setSelectedIncome(null);
      fetchIncomeData();
    }
  };

  const openEditDialog = (income: Income) => {
    setSelectedIncome(income);
    setFormData({
      source: income.source,
      amount: income.amount.toString(),
      date: income.date,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (income: Income) => {
    setSelectedIncome(income);
    setIsDeleteDialogOpen(true);
  };

  // Calculate statistics
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const totalMonthlyIncome = incomeData
    .filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    })
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const monthlyIncomes: { [key: string]: number } = {};
  incomeData.forEach(item => {
    const monthYear = format(new Date(item.date), "MMM yyyy");
    monthlyIncomes[monthYear] = (monthlyIncomes[monthYear] || 0) + item.amount;
  });

  const avgMonthlyIncome = Object.keys(monthlyIncomes).length > 0
    ? Object.values(monthlyIncomes).reduce((sum, val) => sum + val, 0) / Object.keys(monthlyIncomes).length
    : 0;

  const uniqueSources = [...new Set(incomeData.map(item => item.source))].length;

  // Chart data
  const monthlyChartData = Object.entries(monthlyIncomes)
    .map(([month, amount]) => ({ month, amount }))
    .reverse()
    .slice(-6);

  const sourceBreakdown: { [key: string]: number } = {};
  incomeData.forEach(item => {
    sourceBreakdown[item.source] = (sourceBreakdown[item.source] || 0) + item.amount;
  });

  const sourceChartData = Object.entries(sourceBreakdown).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Income</h1>
          <p className="text-muted-foreground mt-1">Manage and track your income sources</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Income
        </Button>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Monthly Income"
          value={`$${totalMonthlyIncome.toLocaleString()}`}
          icon={DollarSign}
        />
        <StatCard
          title="Average Monthly Income"
          value={`$${avgMonthlyIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          icon={TrendingUp}
        />
        <StatCard
          title="Income Sources"
          value={uniqueSources.toString()}
          icon={Wallet}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Income Over Time */}
        <Card className="card-shadow overflow-hidden">
          <CardHeader>
            <CardTitle>Income Over Time</CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
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

        {/* Income Source Breakdown */}
        <Card className="card-shadow overflow-hidden">
          <CardHeader>
            <CardTitle>Income by Source</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <ChartContainer
              config={{}}
              className="h-[450px] max-w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 30, right: 100, bottom: 60, left: 100 }}>
                  <Pie
                    data={sourceChartData}
                    cx="50%"
                    cy="40%"
                    innerRadius={60}
                    outerRadius={85}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={3}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius + 45;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="hsl(var(--foreground))"
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          fontSize={12}
                        >
                          {`${name} ${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                  >
                    {sourceChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                    labelStyle={{ color: "#FFFFFF" }}
                    itemStyle={{ color: "#FFFFFF" }}
                    cursor={false}
                  />
                  <Legend 
                    wrapperStyle={{ 
                      paddingTop: "30px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "12px",
                      justifyContent: "center",
                      marginTop: "20px"
                    }}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Income Table */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>All Income Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomeData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No income entries found. Add your first income entry to get started.
                  </TableCell>
                </TableRow>
              ) : (
                incomeData.map((income) => (
                  <TableRow key={income.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{income.source}</TableCell>
                    <TableCell>${income.amount.toLocaleString()}</TableCell>
                    <TableCell>{format(new Date(income.date), "MMM dd, yyyy")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(income)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(income)}
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

      {/* Add Income Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Income</DialogTitle>
            <DialogDescription>Add a new income entry to track your earnings.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                placeholder="e.g., Salary, Freelance"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              />
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddIncome}>Add Income</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Income Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Income</DialogTitle>
            <DialogDescription>Update the income entry details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-source">Source</Label>
              <Input
                id="edit-source"
                placeholder="e.g., Salary, Freelance"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              />
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditIncome}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Income</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this income entry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteIncome}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
