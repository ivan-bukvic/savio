import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, TrendingUp, Wallet, Edit, Trash2, BarChart3 } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { EmptyState } from "@/components/ui/empty-state";
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

// Multi-series chart colors matching the design system
const HORIZONTAL_BAR_COLORS = [
  'hsl(180, 65%, 42%)',  // Teal
  'hsl(45, 95%, 60%)',   // Yellow/Orange
  'hsl(195, 70%, 50%)',  // Light blue
  'hsl(150, 55%, 48%)',  // Light green
  'hsl(0, 85%, 60%)',    // Red
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

  // Calculate statistics - use latest month with data instead of current month
  const getLatestMonthIncome = () => {
    if (incomeData.length === 0) return 0;
    
    // Find the latest date in the data
    const sortedByDate = [...incomeData].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const latestDate = new Date(sortedByDate[0].date);
    const latestMonth = latestDate.getMonth();
    const latestYear = latestDate.getFullYear();
    
    return incomeData
      .filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === latestMonth && itemDate.getFullYear() === latestYear;
      })
      .reduce((sum, item) => sum + Number(item.amount), 0);
  };

  const totalMonthlyIncome = getLatestMonthIncome();

  const monthlyIncomes: { [key: string]: number } = {};
  incomeData.forEach(item => {
    const monthYear = format(new Date(item.date), "MMM yyyy");
    monthlyIncomes[monthYear] = (monthlyIncomes[monthYear] || 0) + item.amount;
  });

  const avgMonthlyIncome = Object.keys(monthlyIncomes).length > 0
    ? Object.values(monthlyIncomes).reduce((sum, val) => sum + val, 0) / Object.keys(monthlyIncomes).length
    : 0;

  const uniqueSources = [...new Set(incomeData.map(item => item.source))].length;

  // Chart data - Multi-series for Income Over Time (Jan-Sep only)
  const validMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const monthlyBySource: { [monthYear: string]: { [source: string]: number } } = {};
  const allSources = new Set<string>();
  
  // Initialize all months
  validMonths.forEach(month => {
    monthlyBySource[month] = {};
  });
  
  incomeData.forEach(item => {
    const itemDate = new Date(item.date);
    const monthIndex = itemDate.getMonth();
    // Only include Jan-Sep (months 0-8)
    if (monthIndex <= 8) {
      const monthYear = format(itemDate, "MMM");
      if (!monthlyBySource[monthYear]) {
        monthlyBySource[monthYear] = {};
      }
      monthlyBySource[monthYear][item.source] = (monthlyBySource[monthYear][item.source] || 0) + item.amount;
      allSources.add(item.source);
    }
  });

  const sourcesList = Array.from(allSources).slice(0, 4);
  
  // Build chart data in order Jan-Sep
  const monthlyChartData = validMonths
    .filter(month => monthlyBySource[month] && Object.keys(monthlyBySource[month]).length > 0)
    .map(month => ({
      month,
      ...sourcesList.reduce((acc, source) => ({
        ...acc,
        [source]: monthlyBySource[month][source] || 0,
      }), {}),
    }));

  // Source breakdown for horizontal bar chart
  const sourceBreakdown: { [key: string]: number } = {};
  incomeData.forEach(item => {
    sourceBreakdown[item.source] = (sourceBreakdown[item.source] || 0) + item.amount;
  });

  const totalIncome = Object.values(sourceBreakdown).reduce((sum, val) => sum + val, 0);
  
  const sourceChartData = Object.entries(sourceBreakdown)
    .map(([name, value]) => ({
      name,
      value,
      percentage: totalIncome > 0 ? Math.round((value / totalIncome) * 100) : 0,
    }))
    .sort((a, b) => b.value - a.value);

  const hasData = incomeData.length > 0;

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Income</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">Manage and track your income sources</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Income
        </Button>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Income Over Time - Multi-series bar chart */}
        <Card className="card-shadow overflow-hidden">
          <CardHeader className="p-4 md:p-6 pb-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="text-base md:text-lg">Income Over Time</CardTitle>
              {hasData && (
                <div className="flex items-center gap-3 flex-wrap">
                  {sourcesList.map((source, index) => (
                    <div key={source} className="flex items-center gap-1.5">
                      <div 
                        className="w-2.5 h-2.5 rounded-sm" 
                        style={{ backgroundColor: HORIZONTAL_BAR_COLORS[index % HORIZONTAL_BAR_COLORS.length] }}
                      />
                      <span className="text-xs text-muted-foreground">{source}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-2 md:p-6 pt-0">
            {!hasData ? (
              <EmptyState
                icon={BarChart3}
                title="No income entries yet"
                description="Add your first income source to track earnings over time."
                actionLabel="Add Income"
                onAction={() => setIsAddDialogOpen(true)}
                className="h-[280px] md:h-[320px]"
              />
            ) : (
              <ChartContainer
                config={{}}
                className="h-[280px] md:h-[320px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyChartData} barGap={2} barCategoryGap="15%">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={11} 
                      tick={{ fontSize: 11 }} 
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={11} 
                      tick={{ fontSize: 11 }} 
                      width={55}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                      cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                    />
                    {sourcesList.map((source, index) => (
                      <Bar 
                        key={source}
                        dataKey={source} 
                        fill={HORIZONTAL_BAR_COLORS[index % HORIZONTAL_BAR_COLORS.length]} 
                        radius={0}
                        maxBarSize={18}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        {/* Income by Source - Horizontal bar chart */}
        <Card className="card-shadow overflow-hidden">
          <CardHeader className="p-4 md:p-6 pb-2">
            <CardTitle className="text-base md:text-lg">Income by Source</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-2">
            {!hasData ? (
              <EmptyState
                icon={Wallet}
                title="No income sources added"
                description="Your earnings distribution will appear here once you add income."
                className="h-[280px] md:h-[320px]"
              />
            ) : (
              <div className="space-y-4">
                {sourceChartData.map((entry, index) => (
                  <div key={entry.name} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{entry.name}</span>
                      <span className="text-sm font-semibold text-foreground">{entry.percentage}%</span>
                    </div>
                    <div className="relative h-3 w-full bg-muted rounded-none overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 transition-all duration-500"
                        style={{ 
                          width: `${entry.percentage}%`,
                          backgroundColor: HORIZONTAL_BAR_COLORS[index % HORIZONTAL_BAR_COLORS.length],
                        }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ${entry.value.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Income Table */}
      <Card className="card-shadow overflow-hidden">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg">All Income Entries</CardTitle>
        </CardHeader>
        <CardContent className="p-0 md:p-6 md:pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs md:text-sm">Source</TableHead>
                  <TableHead className="text-xs md:text-sm">Amount</TableHead>
                  <TableHead className="text-xs md:text-sm hidden sm:table-cell">Date</TableHead>
                  <TableHead className="text-xs md:text-sm text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomeData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground text-sm py-8">
                      No income entries found. Add your first income entry to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  incomeData.map((income) => (
                    <TableRow key={income.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium text-xs md:text-sm">{income.source}</TableCell>
                      <TableCell className="text-xs md:text-sm">${income.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-xs md:text-sm hidden sm:table-cell">{format(new Date(income.date), "MMM dd, yyyy")}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1 md:gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEditDialog(income)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
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
          </div>
        </CardContent>
      </Card>

      {/* Add Income Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
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
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddIncome}>Add Income</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Income Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Income</DialogTitle>
            <DialogDescription>Update the details of this income entry.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-source">Source</Label>
              <Input
                id="edit-source"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-amount">Amount</Label>
              <Input
                id="edit-amount"
                type="number"
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
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditIncome}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Income</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this income entry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteIncome}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
