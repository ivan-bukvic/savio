-- Add subscription_tier column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro'));

-- Update existing profiles to free tier
UPDATE public.profiles SET subscription_tier = 'free' WHERE subscription_tier IS NULL;