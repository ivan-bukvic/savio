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
import { useDemoMode, isDemoUser } from "@/hooks/useDemoMode";
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
  const { isDemoMode, setDemoMode } = useDemoMode();

  const { isPro, loading: subscriptionLoading } = useSubscription(
    session?.user?.id || null
  );

  // Handle demo mode login via secure edge function
  useEffect(() => {
    const handleDemoLogin = async () => {
      const isDemo = searchParams.get('demo') === 'true';
      
      if (isDemo) {
        setLoading(true);
        try {
          // Use secure edge function for demo login
          const { data, error } = await supabase.functions.invoke("demo-login");

          if (error) {
            console.error("Demo login error:", error);
            toast({
              title: "Demo Unavailable",
              description: "Unable to start demo mode. Please try again later.",
              variant: "destructive",
            });
            navigate("/auth");
            return;
          }

          if (data?.session) {
            // Set the session from the edge function response
            await supabase.auth.setSession({
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token,
            });
            
            setDemoMode(true);
            
            // Seed demo data and ensure profile exists
            try {
              const { data: seedResult } = await supabase.functions.invoke("seed-demo-data");
              console.log("Seed result:", seedResult);
            } catch (seedError) {
              console.error("Error seeding demo data:", seedError);
            }
            
            // Set session after seeding to ensure profile exists
            setSession(data.session);
            
            toast({
              title: "Welcome to Savio Demo!",
              description: "Explore all features with sample data. Changes won't be saved.",
            });
          }
        } catch (err) {
          console.error("Demo login error:", err);
          navigate("/auth");
        } finally {
          setLoading(false);
        }
      }
    };

    handleDemoLogin();
  }, [searchParams, navigate, setDemoMode, toast]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        
        // Check if it's demo user
        if (isDemoUser(session?.user?.email)) {
          setDemoMode(true);
        }
        
        if (!session && searchParams.get('demo') !== 'true') {
          navigate("/auth");
        }
      }
    );

    // Only check session if not in demo mode
    if (searchParams.get('demo') !== 'true') {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        
        // Check if it's demo user
        if (isDemoUser(session?.user?.email)) {
          setDemoMode(true);
        }
        
        setLoading(false);
        if (!session) {
          navigate("/auth");
        }
      });
    }

    return () => subscription.unsubscribe();
  }, [navigate, searchParams, setDemoMode]);

  const handleUpgrade = () => {
    if (isDemoMode) {
      toast({
        title: "Demo Mode",
        description: "Upgrade is not available in demo mode. Sign up for a real account to access Pro features!",
      });
      return;
    }
    
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
          {searchParams.get('demo') === 'true' && (
            <p className="text-muted-foreground">Loading demo experience...</p>
          )}
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // In demo mode, allow AI Insights access
  const effectiveIsPro = isDemoMode || isPro;

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <DashboardSection
            isPro={effectiveIsPro}
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
        if (!effectiveIsPro) {
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
            isPro={effectiveIsPro}
            onUpgrade={handleUpgrade}
            isDemoMode={isDemoMode}
          />
        );
      default:
        return (
          <DashboardSection
            isPro={effectiveIsPro}
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
      isPro={effectiveIsPro}
      isDemoMode={isDemoMode}
    >
      {renderSection()}
    </DashboardLayout>
  );
};

export default Index;
