import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardSidebar } from "./DashboardSidebar";
import { GlobalSearch } from "./GlobalSearch";
import { supabase } from "@/integrations/supabase/client";
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
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
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
