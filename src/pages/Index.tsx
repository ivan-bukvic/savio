import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { IncomeSection } from "@/components/sections/IncomeSection";
import { Loader2 } from "lucide-react";

type ActiveSection = "dashboard" | "income" | "expenses" | "goals" | "insights" | "settings";

const Index = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<ActiveSection>("dashboard");

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (!session) {
          navigate("/auth");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection />;
      case "income":
        return <IncomeSection userId={session!.user.id} />;
      case "expenses":
        return <div className="text-muted-foreground">Expenses section coming soon...</div>;
      case "goals":
        return <div className="text-muted-foreground">Goals section coming soon...</div>;
      case "insights":
        return <div className="text-muted-foreground">Insights section coming soon...</div>;
      case "settings":
        return <div className="text-muted-foreground">Settings section coming soon...</div>;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </DashboardLayout>
  );
};

export default Index;
