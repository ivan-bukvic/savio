

## Summary

The "Upgrade to Pro" button fails with "Failed to start checkout" because the Stripe checkout edge function rejects the request origin `https://savio-ai.lovable.app` - it's not in the allowed origins list.

---

## Root Cause

In `supabase/functions/create-checkout/index.ts`, line 11-16:

```typescript
const ALLOWED_ORIGINS = [
  "https://xztjwxosevpwciappbyq.lovableproject.com",
  "https://savio.lovable.app",     // ← Missing the "-ai" version
  "http://localhost:5173",
  "http://localhost:3000",
];
```

The published app URL is `https://savio-ai.lovable.app`, but only `https://savio.lovable.app` is whitelisted.

---

## Solution

Add the correct published URL to the allowed origins list.

---

## Implementation Steps

### Step 1: Update the ALLOWED_ORIGINS array

Modify lines 11-16 in `supabase/functions/create-checkout/index.ts`:

**Before:**
```typescript
const ALLOWED_ORIGINS = [
  "https://xztjwxosevpwciappbyq.lovableproject.com",
  "https://savio.lovable.app",
  "http://localhost:5173",
  "http://localhost:3000",
];
```

**After:**
```typescript
const ALLOWED_ORIGINS = [
  "https://xztjwxosevpwciappbyq.lovableproject.com",
  "https://savio.lovable.app",
  "https://savio-ai.lovable.app",
  "http://localhost:5173",
  "http://localhost:3000",
];
```

### Step 2: Deploy the edge function

The function will be automatically redeployed when the code changes are saved.

---

## Files to Modify

| File | Change |
|------|--------|
| `supabase/functions/create-checkout/index.ts` | Add `https://savio-ai.lovable.app` to `ALLOWED_ORIGINS` |

---

## Expected Outcome

After this change:
- Clicking "Upgrade to Pro" from the published app will successfully redirect to the Stripe checkout page
- Both `savio.lovable.app` and `savio-ai.lovable.app` domains will work correctly

