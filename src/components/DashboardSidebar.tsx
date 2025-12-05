import { LayoutDashboard, DollarSign, CreditCard, Target, Sparkles, Settings, Lock, Crown, Loader2, Eye, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ActiveSection = "dashboard" | "income" | "expenses" | "goals" | "insights" | "settings";

interface DashboardSidebarProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
  isPro?: boolean;
  isDemoMode?: boolean;
}

const menuItems: { icon: any; label: string; section: ActiveSection; proOnly?: boolean }[] = [
  { icon: LayoutDashboard, label: "Dashboard", section: "dashboard" },
  { icon: DollarSign, label: "Income", section: "income" },
  { icon: CreditCard, label: "Expenses", section: "expenses" },
  { icon: Target, label: "Goals", section: "goals" },
  { icon: Sparkles, label: "AI Insights", section: "insights", proOnly: true },
];

export const DashboardSidebar = ({ activeSection, onSectionChange, isPro = false, isDemoMode = false }: DashboardSidebarProps) => {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpgradeClick = async () => {
    if (isPro) return;
    
    if (isDemoMode) {
      toast.info("Upgrade is not available in demo mode. Create an account to unlock Pro features!");
      return;
    }
    
    setIsCheckoutLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please log in to upgrade");
        return;
      }

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { origin: window.location.origin },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: unknown) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return (
    <aside className="w-full md:w-64 h-full border-r border-border bg-card flex flex-col card-shadow">
      {/* Logo */}
      <div className="flex h-14 md:h-16 items-center px-4 md:px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl font-semibold text-foreground">Savio</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-3 md:p-4">
        <div className="space-y-1 flex-1">
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
        </div>

        {/* Bottom section: Upgrade + Settings */}
        <div className="space-y-1 mt-auto pt-4 border-t border-border">
          {/* Demo Mode indicator or Upgrade button */}
          {isDemoMode ? (
            <>
              <div className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium bg-gradient-to-r from-amber-400/10 to-orange-500/10 text-amber-500">
                <Eye className="h-5 w-5" />
                <span>Demo Mode</span>
                <span className="ml-auto text-[10px] font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-white px-1.5 py-0.5 rounded">
                  DEMO
                </span>
              </div>
              <button
                onClick={() => navigate("/auth")}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 text-primary hover:bg-primary/10"
              >
                <User className="h-5 w-5" />
                <span>Create Account</span>
              </button>
            </>
          ) : isPro ? (
            <div className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium bg-gradient-to-r from-amber-500/10 to-amber-600/10 text-amber-500">
              <Crown className="h-5 w-5" />
              <span>You're Pro</span>
              <span className="ml-auto text-[10px] font-semibold bg-gradient-to-r from-amber-400 to-amber-600 text-white px-1.5 py-0.5 rounded">
                ✓
              </span>
            </div>
          ) : (
            <button
              onClick={handleUpgradeClick}
              disabled={isCheckoutLoading}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 text-amber-500 hover:bg-amber-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckoutLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Crown className="h-5 w-5" />
              )}
              <span>{isCheckoutLoading ? "Loading..." : "Upgrade to Pro"}</span>
            </button>
          )}

          {/* Settings */}
          <button
            onClick={() => onSectionChange("settings")}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
              activeSection === "settings"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </div>
      </nav>

    </aside>
  );
};
