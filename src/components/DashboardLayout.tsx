import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, User, LogOut, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardSidebar } from "./DashboardSidebar";
import { GlobalSearch } from "./GlobalSearch";
import { supabase } from "@/integrations/supabase/client";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";

type ActiveSection = "dashboard" | "income" | "expenses" | "goals" | "insights" | "settings";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
  isPro?: boolean;
}

export const DashboardLayout = ({ children, activeSection, onSectionChange, isPro = false }: DashboardLayoutProps) => {
  const [isDark, setIsDark] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [isBillingLoading, setIsBillingLoading] = useState(false);
  const navigate = useNavigate();
  const { isPro: isProUser } = useSubscription(userId);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        
        // Fetch profile for full name
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("user_id", user.id)
          .maybeSingle();
        
        if (profile?.full_name) {
          setUserName(profile.full_name);
        } else {
          setUserName(user.email?.split("@")[0] || "User");
        }
      }
    };

    fetchUserData();
  }, []);

  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
      navigate("/auth");
    }
  };

  const handleBilling = async () => {
    setIsBillingLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please log in first");
        return;
      }

      if (isProUser) {
        // Pro users go to Stripe Customer Portal
        const { data, error } = await supabase.functions.invoke("create-portal-session", {
          body: { origin: window.location.origin },
        });

        if (error) throw error;
        if (data?.url) {
          window.location.href = data.url;
        }
      } else {
        // Free users go to checkout
        const { data, error } = await supabase.functions.invoke("create-checkout", {
          body: { origin: window.location.origin },
        });

        if (error) throw error;
        if (data?.url) {
          window.location.href = data.url;
        }
      }
    } catch (error: any) {
      console.error("Billing error:", error);
      toast.error(isProUser ? "Failed to open billing portal." : "Failed to start checkout.");
    } finally {
      setIsBillingLoading(false);
    }
  };

  const handleNavigateToSection = (section: string) => {
    onSectionChange(section as ActiveSection);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <DashboardSidebar activeSection={activeSection} onSectionChange={onSectionChange} isPro={isPro} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 card-shadow">
          <GlobalSearch userId={userId} onNavigateToSection={handleNavigateToSection} />
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 rounded-lg px-3 py-1.5 hover:bg-muted cursor-pointer transition-colors">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    isProUser ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white' : 'bg-primary/10 text-primary'
                  }`}>
                    {userName ? getInitials(userName) : <User className="h-4 w-4" />}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-foreground truncate max-w-[120px]">{userName || "Loading..."}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {isProUser ? (
                        <span className="text-amber-500">Pro Member</span>
                      ) : (
                        "Free Plan"
                      )}
                    </span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-1 bg-gradient-to-r from-primary to-primary/60" />
                <div className="py-1">
                  <DropdownMenuItem 
                    onClick={handleBilling}
                    disabled={isBillingLoading}
                    className={`mx-1 my-0.5 rounded-md cursor-pointer transition-colors ${
                      isProUser 
                        ? 'hover:bg-amber-500/10 focus:bg-amber-500/10' 
                        : 'hover:bg-accent focus:bg-accent'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isBillingLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CreditCard className={`mr-2 h-4 w-4 ${isProUser ? 'text-amber-500' : ''}`} />
                    )}
                    <span className={isProUser ? 'text-amber-600 dark:text-amber-400 font-medium' : ''}>
                      {isBillingLoading ? "Loading..." : isProUser ? "Manage Billing" : "Upgrade to Pro"}
                    </span>
                    {isProUser && (
                      <span className="ml-auto text-xs bg-gradient-to-r from-amber-400 to-amber-600 text-white px-1.5 py-0.5 rounded-full">
                        Pro
                      </span>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 bg-border/50" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="mx-1 my-0.5 rounded-md cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10 text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
