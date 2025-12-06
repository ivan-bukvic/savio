import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Demo credentials are stored server-side only
const DEMO_USER_EMAIL = "demo@savio.app";
const DEMO_USER_PASSWORD = "DemoUser123!";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase configuration");
      throw new Error("Server configuration error");
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.log("Attempting demo login...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: DEMO_USER_EMAIL,
      password: DEMO_USER_PASSWORD,
    });

    if (error) {
      console.error("Demo login error:", error.message);
      throw new Error("Demo login failed");
    }

    console.log("Demo login successful");

    return new Response(
      JSON.stringify({
        session: data.session,
        user: data.user,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    console.error("Error in demo-login function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
