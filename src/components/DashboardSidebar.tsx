import { useState, useEffect } from "react";
import { LayoutDashboard, DollarSign, CreditCard, Target, Sparkles, Settings, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

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
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
        
        // Fetch profile for full name
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("user_id", user.id)
          .maybeSingle();
        
        if (profile?.full_name) {
          setUserName(profile.full_name);
        } else {
          // Fallback to email prefix
          setUserName(user.email?.split("@")[0] || "User");
        }
      }
    };

    fetchUserData();
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

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

      {/* User Profile Section */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted cursor-pointer transition-colors">
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
            isPro ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white" : "bg-primary/10 text-primary"
          )}>
            {getInitials(userName)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-foreground truncate">{userName || "Loading..."}</span>
            <span className="text-xs text-muted-foreground truncate">
              {isPro ? (
                <span className="text-gold">Pro Member</span>
              ) : (
                userEmail
              )}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};