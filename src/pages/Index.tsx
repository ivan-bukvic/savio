import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { IncomeSection } from "@/components/sections/IncomeSection";
import { ExpensesSection } from "@/components/sections/ExpensesSection";
import { GoalsSection } from "@/components/sections/GoalsSection";
import { AIInsightsSection } from "@/components/sections/AIInsightsSection";
import { SettingsSection } from "@/components/sections/SettingsSection";
import { LockedFeatureScreen } from "@/components/LockedFeatureScreen";
import { useSubscription } from "@/hooks/useSubscription";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ActiveSection = "dashboard" | "income" | "expenses" | "goals" | "insights" | "settings";

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<ActiveSection>("dashboard");
  const { toast } = useToast();

  const { isPro, loading: subscriptionLoading } = useSubscription(
    session?.user?.id || null
  );

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        
        if (!session) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleUpgrade = () => {
    toast({
      title: "Upgrade to Pro",
      description: "Pro subscription management coming soon. Contact support to upgrade.",
    });
  };

  if (loading || subscriptionLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <DashboardSection
            isPro={isPro}
            onNavigateToInsights={() => setActiveSection("insights")}
            onUpgrade={handleUpgrade}
          />
        );
      case "income":
        return <IncomeSection userId={session.user.id} />;
      case "expenses":
        return <ExpensesSection userId={session.user.id} />;
      case "goals":
        return <GoalsSection userId={session.user.id} />;
      case "insights":
        if (!isPro) {
          return (
            <LockedFeatureScreen
              title="AI Insights — Pro Feature"
              description="Upgrade to Pro to access personalized financial insights powered by Savio Intelligence."
              onUpgrade={handleUpgrade}
            />
          );
        }
        return <AIInsightsSection userId={session.user.id} />;
      case "settings":
        return (
          <SettingsSection
            userId={session.user.id}
            userEmail={session.user.email || ""}
            isPro={isPro}
            onUpgrade={handleUpgrade}
          />
        );
      default:
        return (
          <DashboardSection
            isPro={isPro}
            onNavigateToInsights={() => setActiveSection("insights")}
            onUpgrade={handleUpgrade}
          />
        );
    }
  };

  return (
    <DashboardLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      isPro={isPro}
    >
      {renderSection()}
    </DashboardLayout>
  );
};

export default Index;
