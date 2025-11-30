import { LayoutDashboard, DollarSign, CreditCard, Target, Wallet, Sparkles, Settings, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { NavLink } from "./NavLink";
const menuItems = [{
  icon: LayoutDashboard,
  label: "Dashboard",
  path: "/app"
}, {
  icon: DollarSign,
  label: "Income",
  path: "/app/income"
}, {
  icon: CreditCard,
  label: "Expenses",
  path: "/app/expenses"
}, {
  icon: Target,
  label: "Goals",
  path: "/app/goals"
}, {
  icon: Sparkles,
  label: "AI Insights",
  path: "/app/ai-insights"
}, {
  icon: Settings,
  label: "Settings",
  path: "/app/settings"
}];
export const DashboardSidebar = () => {
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
        return <NavLink 
              key={item.label} 
              to={item.path}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 text-muted-foreground hover:bg-muted hover:text-foreground"
              activeClassName="bg-primary/10 text-primary"
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>;
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