import { LayoutDashboard, DollarSign, CreditCard, Target, Sparkles, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

type ActiveSection = "dashboard" | "income" | "expenses" | "goals" | "insights" | "settings";

interface DashboardSidebarProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
}

const menuItems: { icon: any; label: string; section: ActiveSection }[] = [
  { icon: LayoutDashboard, label: "Dashboard", section: "dashboard" },
  { icon: DollarSign, label: "Income", section: "income" },
  { icon: CreditCard, label: "Expenses", section: "expenses" },
  { icon: Target, label: "Goals", section: "goals" },
  { icon: Sparkles, label: "AI Insights", section: "insights" },
  { icon: Settings, label: "Settings", section: "settings" },
];

export const DashboardSidebar = ({ activeSection, onSectionChange }: DashboardSidebarProps) => {
  return <aside className="w-64 border-r border-border bg-card flex flex-col card-shadow">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-border">
        <div className="flex items-center gap-2">
          
          <span className="text-xl font-semibold text-foreground">Savio</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeSection === item.section;
          return (
            <button
              key={item.label}
              onClick={() => onSectionChange(item.section)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted cursor-pointer transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">John Doe</span>
            <span className="text-xs text-muted-foreground">john@example.com</span>
          </div>
        </div>
      </div>
    </aside>;
};