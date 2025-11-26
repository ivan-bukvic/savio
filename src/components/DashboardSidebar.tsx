import { LayoutDashboard, DollarSign, CreditCard, Target, Wallet, Sparkles, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: DollarSign, label: "Income", active: false },
  { icon: CreditCard, label: "Expenses", active: false },
  { icon: Target, label: "Goals", active: false },
  { icon: Wallet, label: "Debts", active: false },
  { icon: Sparkles, label: "AI Insights", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export const DashboardSidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <aside className="w-64 border-r bg-sidebar text-sidebar-foreground flex flex-col card-shadow" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
      {/* Logo */}
      <div className="flex h-16 items-center px-6" style={{ borderBottom: "1px solid hsl(var(--sidebar-border))" }}>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Sparkles className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-sidebar-foreground">Savio</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          
          return (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4" style={{ borderTop: "1px solid hsl(var(--sidebar-border))" }}>
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-sidebar-accent cursor-pointer transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary/30 text-sidebar-primary-foreground text-sm font-medium">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">John Doe</span>
            <span className="text-xs text-sidebar-foreground/60">john@example.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
