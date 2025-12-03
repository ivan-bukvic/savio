import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    // Get user from auth header
    const supabaseAuth = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    
    const { data: { user }, error: userError } = await supabaseAuth.auth.getUser();
    if (userError || !user) {
      throw new Error("Not authenticated");
    }

    console.log("Seeding income data for user:", user.id);

    // Insert dummy income data for December 2025
    const incomeData = [
      { user_id: user.id, source: "Monthly Salary", amount: 5600, date: "2025-12-01" },
      { user_id: user.id, source: "Freelance Project", amount: 3200, date: "2025-12-10" },
      { user_id: user.id, source: "Investment Returns", amount: 450, date: "2025-12-15" },
      { user_id: user.id, source: "Side Gig", amount: 280, date: "2025-12-18" },
    ];

    const { data, error } = await supabase
      .from("income")
      .insert(incomeData)
      .select();

    if (error) {
      console.error("Insert error:", error);
      throw error;
    }

    console.log("Successfully inserted income data:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error seeding income data:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
