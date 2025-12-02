import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, User, LogOut, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  const navigate = useNavigate();
  const { isPro: isProUser } = useSubscription(userId);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id || null);
    });
  }, []);

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

  const handleBilling = () => {
    // Navigate to settings section for billing/upgrade
    onSectionChange("settings");
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
                <Avatar className={`h-9 w-9 cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 ${isProUser ? 'ring-2 ring-amber-400/50' : ''}`}>
                  <AvatarFallback className={`${isProUser ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 'bg-primary'} text-primary-foreground`}>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-1 bg-gradient-to-r from-primary to-primary/60" />
                <div className="py-1">
                  <DropdownMenuItem 
                    onClick={handleBilling}
                    className={`mx-1 my-0.5 rounded-md cursor-pointer transition-colors ${
                      isProUser 
                        ? 'hover:bg-amber-500/10 focus:bg-amber-500/10' 
                        : 'hover:bg-accent focus:bg-accent'
                    }`}
                  >
                    <CreditCard className={`mr-2 h-4 w-4 ${isProUser ? 'text-amber-500' : ''}`} />
                    <span className={isProUser ? 'text-amber-600 dark:text-amber-400 font-medium' : ''}>
                      Billing
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
