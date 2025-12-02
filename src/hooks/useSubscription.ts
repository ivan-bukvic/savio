import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SubscriptionTier = "free" | "pro";

interface SubscriptionState {
  tier: SubscriptionTier;
  isPro: boolean;
  loading: boolean;
}

export const useSubscription = (userId: string | null) => {
  const [state, setState] = useState<SubscriptionState>({
    tier: "free",
    isPro: false,
    loading: true,
  });

  useEffect(() => {
    if (!userId) {
      setState({ tier: "free", isPro: false, loading: false });
      return;
    }

    const fetchSubscription = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("subscription_tier")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching subscription:", error);
        setState({ tier: "free", isPro: false, loading: false });
        return;
      }

      const tier = (data?.subscription_tier as SubscriptionTier) || "free";
      setState({
        tier,
        isPro: tier === "pro",
        loading: false,
      });
    };

    fetchSubscription();
  }, [userId]);

  return state;
};
