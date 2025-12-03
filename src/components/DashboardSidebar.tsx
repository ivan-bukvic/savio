import { LayoutDashboard, DollarSign, CreditCard, Target, Sparkles, Settings, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

type ActiveSection = "dashboard" | "income" | "expenses" | "goals" | "insights" | "settings";

interface DashboardSidebarProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
  isPro?: boolean;
}

const menuItems: { icon: any; label: string; section: ActiveSection; proOnly?: boolean }[] = [
  { icon: LayoutDashboard, label: "Dashboard", section: "dashboard" },
  { icon: DollarSign, label: "Income", section: "income" },
  { icon: CreditCard, label: "Expenses", section: "expenses" },
  { icon: Target, label: "Goals", section: "goals" },
  { icon: Sparkles, label: "AI Insights", section: "insights", proOnly: true },
  { icon: Settings, label: "Settings", section: "settings" },
];

export const DashboardSidebar = ({ activeSection, onSectionChange, isPro = false }: DashboardSidebarProps) => {

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col card-shadow">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-foreground">Savio</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.section;
          const isProItem = item.proOnly;
          const isLocked = isProItem && !isPro;

          return (
            <button
              key={item.label}
              onClick={() => onSectionChange(item.section)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive && !isLocked
                  ? isProItem
                    ? "bg-gold/10 text-gold"
                    : "bg-primary/10 text-primary"
                  : isLocked
                  ? "text-muted-foreground/50 hover:bg-muted/50"
                  : isProItem
                  ? "text-gold/80 hover:bg-gold/10 hover:text-gold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isLocked && "opacity-50"
                )}
              />
              <span className={cn(isLocked && "opacity-50")}>{item.label}</span>
              {isLocked && (
                <Lock className="h-3.5 w-3.5 ml-auto text-gold" />
              )}
              {isProItem && isPro && (
                <span className="ml-auto text-[10px] font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded">
                  PRO
                </span>
              )}
            </button>
          );
        })}
      </nav>

    </aside>
  );
};