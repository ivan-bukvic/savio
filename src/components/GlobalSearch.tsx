import { useRef, useEffect, useState } from "react";
import { Search, DollarSign, CreditCard, Target, FileText, TrendingDown, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGlobalSearch, SearchResult } from "@/hooks/useGlobalSearch";
import { cn } from "@/lib/utils";

interface GlobalSearchProps {
  userId: string | null;
  onNavigateToSection?: (section: string) => void;
}

const typeConfig = {
  income: {
    icon: DollarSign,
    label: "Income",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  expenses: {
    icon: CreditCard,
    label: "Expenses",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  goals: {
    icon: Target,
    label: "Goals",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  debts: {
    icon: TrendingDown,
    label: "Debts",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  ai_reports: {
    icon: FileText,
    label: "AI Reports",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
};

export const GlobalSearch = ({ userId, onNavigateToSection }: GlobalSearchProps) => {
  const { query, setQuery, results, loading, isOpen, setIsOpen, totalResults } = useGlobalSearch(userId);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Flatten results for keyboard navigation
  const flatResults: SearchResult[] = [
    ...results.income,
    ...results.expenses,
    ...results.goals,
    ...results.debts,
    ...results.ai_reports,
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || flatResults.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < flatResults.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : flatResults.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && flatResults[selectedIndex]) {
          handleResultClick(flatResults[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    // Navigate to the appropriate section
    if (onNavigateToSection) {
      const sectionMap: Record<string, string> = {
        income: "income",
        expenses: "expenses",
        goals: "goals",
        debts: "dashboard",
        ai_reports: "insights",
      };
      onNavigateToSection(sectionMap[result.type] || "dashboard");
    }
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const renderResultSection = (type: keyof typeof typeConfig, items: SearchResult[], startIndex: number) => {
    if (items.length === 0) return null;

    const config = typeConfig[type];
    const Icon = config.icon;

    return (
      <div key={type} className="py-2">
        <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {config.label}
        </div>
        {items.map((item, idx) => {
          const globalIndex = startIndex + idx;
          const isSelected = selectedIndex === globalIndex;

          return (
            <button
              key={item.id}
              onClick={() => handleResultClick(item)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors",
                isSelected ? "bg-accent" : "hover:bg-muted/50"
              )}
            >
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", config.bgColor)}>
                <Icon className={cn("h-4 w-4", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  // Calculate start indices for keyboard navigation
  const incomeStartIndex = 0;
  const expensesStartIndex = results.income.length;
  const goalsStartIndex = expensesStartIndex + results.expenses.length;
  const debtsStartIndex = goalsStartIndex + results.goals.length;
  const aiReportsStartIndex = debtsStartIndex + results.debts.length;

  return (
    <div ref={containerRef} className="relative flex-1 max-w-[200px] sm:max-w-xs md:max-w-xl">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <Input
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-xs md:placeholder:text-sm"
        />
        {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground shrink-0" />}
        {query && !loading && (
          <button onClick={handleClear} className="p-1 hover:bg-muted rounded-full transition-colors shrink-0">
            <X className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50 max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : totalResults === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">No results found.</p>
              <p className="text-xs">Try a different search term.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {renderResultSection("income", results.income, incomeStartIndex)}
              {renderResultSection("expenses", results.expenses, expensesStartIndex)}
              {renderResultSection("goals", results.goals, goalsStartIndex)}
              {renderResultSection("debts", results.debts, debtsStartIndex)}
              {renderResultSection("ai_reports", results.ai_reports, aiReportsStartIndex)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
