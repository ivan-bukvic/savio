import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Allowed origins for redirect URLs
const ALLOWED_ORIGINS = [
  "https://xztjwxosevpwciappbyq.lovableproject.com",
  "https://savio.lovable.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

function isValidOrigin(origin: string): boolean {
  if (!origin || typeof origin !== "string") return false;
  try {
    const url = new URL(origin);
    return ALLOWED_ORIGINS.some(allowed => {
      const allowedUrl = new URL(allowed);
      return url.origin === allowedUrl.origin;
    });
  } catch {
    return false;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_API");

    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_API not configured");
      throw new Error("Stripe is not configured");
    }

    // Get the authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("No authorization header provided");
      throw new Error("No authorization header");
    }

    // Create Supabase client with user's token
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Get user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Auth error:", userError);
      throw new Error("Not authenticated");
    }

    console.log("Creating portal session for user:", user.email);

    // Get and validate return URL from request body
    const { origin } = await req.json();
    
    let returnUrl: string;
    if (isValidOrigin(origin)) {
      returnUrl = `${origin}/app`;
    } else {
      console.warn("Invalid origin provided, using fallback:", origin);
      returnUrl = "http://localhost:5173/app";
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    // Find customer by email
    const customers = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    if (customers.data.length === 0) {
      console.log("No Stripe customer found for:", user.email, "- redirecting to checkout");
      return new Response(JSON.stringify({ error: "NO_CUSTOMER", message: "No billing account found" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const customer = customers.data[0];
    console.log("Found Stripe customer:", customer.id);

    // Create billing portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: returnUrl,
    });

    console.log("Portal session created:", portalSession.url);

    return new Response(JSON.stringify({ url: portalSession.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error creating portal session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
