import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SearchResult {
  type: "income" | "expenses" | "goals" | "debts" | "ai_reports";
  id: string;
  title: string;
  subtitle: string;
  amount?: number;
  date?: string;
}

interface SearchResults {
  income: SearchResult[];
  expenses: SearchResult[];
  goals: SearchResult[];
  debts: SearchResult[];
  ai_reports: SearchResult[];
}

export const useGlobalSearch = (userId: string | null) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({
    income: [],
    expenses: [],
    goals: [],
    debts: [],
    ai_reports: [],
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const search = useCallback(async (searchTerm: string) => {
    if (!userId || searchTerm.length < 2) {
      setResults({ income: [], expenses: [], goals: [], debts: [], ai_reports: [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    const term = `%${searchTerm}%`;
    const isNumeric = !isNaN(Number(searchTerm));

    try {
      // Run all queries in parallel
      const [incomeRes, expensesRes, goalsRes, debtsRes, aiReportsRes] = await Promise.all([
        // Income search
        supabase
          .from("income")
          .select("id, source, amount, date")
          .eq("user_id", userId)
          .or(`source.ilike.${term}`)
          .limit(5),

        // Expenses search
        supabase
          .from("expenses")
          .select("id, category, description, amount, date")
          .eq("user_id", userId)
          .or(`category.ilike.${term},description.ilike.${term}`)
          .limit(5),

        // Goals search
        supabase
          .from("savings_goals")
          .select("id, goal_name, target_amount, current_progress, due_date")
          .eq("user_id", userId)
          .ilike("goal_name", term)
          .limit(5),

        // Debts search
        supabase
          .from("debts")
          .select("id, debt_name, balance, interest_rate, due_date")
          .eq("user_id", userId)
          .ilike("debt_name", term)
          .limit(5),

        // AI Reports search
        supabase
          .from("ai_reports")
          .select("id, summary, suggestions, created_at")
          .eq("user_id", userId)
          .or(`summary.ilike.${term},suggestions.ilike.${term}`)
          .limit(5),
      ]);

      const formatCurrency = (amount: number) => 
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

      const formatDate = (date: string) => 
        new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

      // Transform results
      const incomeResults: SearchResult[] = (incomeRes.data || []).map((item) => ({
        type: "income" as const,
        id: item.id,
        title: item.source,
        subtitle: `${formatCurrency(item.amount)} • ${formatDate(item.date)}`,
        amount: item.amount,
        date: item.date,
      }));

      const expensesResults: SearchResult[] = (expensesRes.data || []).map((item) => ({
        type: "expenses" as const,
        id: item.id,
        title: item.category,
        subtitle: `${formatCurrency(item.amount)} • ${item.description || formatDate(item.date)}`,
        amount: item.amount,
        date: item.date,
      }));

      const goalsResults: SearchResult[] = (goalsRes.data || []).map((item) => ({
        type: "goals" as const,
        id: item.id,
        title: item.goal_name,
        subtitle: `${formatCurrency(item.current_progress)} / ${formatCurrency(item.target_amount)}`,
        amount: item.target_amount,
        date: item.due_date || undefined,
      }));

      const debtsResults: SearchResult[] = (debtsRes.data || []).map((item) => ({
        type: "debts" as const,
        id: item.id,
        title: item.debt_name,
        subtitle: `Balance: ${formatCurrency(item.balance)} • ${item.interest_rate}% APR`,
        amount: item.balance,
        date: item.due_date || undefined,
      }));

      const aiReportsResults: SearchResult[] = (aiReportsRes.data || []).map((item) => ({
        type: "ai_reports" as const,
        id: item.id,
        title: "AI Report",
        subtitle: item.summary.slice(0, 60) + (item.summary.length > 60 ? "..." : ""),
        date: item.created_at,
      }));

      setResults({
        income: incomeResults,
        expenses: expensesResults,
        goals: goalsResults,
        debts: debtsResults,
        ai_reports: aiReportsResults,
      });
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Debounced search effect
  useEffect(() => {
    if (query.length < 2) {
      setResults({ income: [], expenses: [], goals: [], debts: [], ai_reports: [] });
      return;
    }

    const timer = setTimeout(() => {
      search(query);
    }, 250);

    return () => clearTimeout(timer);
  }, [query, search]);

  const totalResults = 
    results.income.length + 
    results.expenses.length + 
    results.goals.length + 
    results.debts.length + 
    results.ai_reports.length;

  return {
    query,
    setQuery,
    results,
    loading,
    isOpen,
    setIsOpen,
    totalResults,
  };
};
