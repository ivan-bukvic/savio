

## Summary

The "Monthly Income vs. Expenses" chart on the Dashboard is empty because it filters data for the **current calendar year (2026)**, but the demo data for `savio@test.com` is dated in **2025**.

The fix will modify the chart to automatically detect the **most recent year** with available data and display that instead of hardcoding the current year.

---

## Root Cause

In `src/components/IncomeVsExpensesChart.tsx`, line 24:
```typescript
const currentYear = new Date().getFullYear();
```
This returns `2026`, but all seeded demo data uses dates from `2025`. The subsequent queries filter by `2026-01-01` to `2026-12-31`, returning zero results.

---

## Solution

Modify the data-fetching logic in `IncomeVsExpensesChart.tsx` to:

1. First, fetch all income and expenses for the user (without a year filter)
2. Determine the most recent year that has data
3. Filter and aggregate by that year for the chart display

This ensures the chart always shows meaningful data regardless of when the demo data was seeded.

---

## Implementation Steps

### Step 1: Update IncomeVsExpensesChart.tsx

Modify the `fetchData` function to:

1. Fetch all income and expense records (remove the year-based date filters)
2. Find the latest year present in the combined data
3. Filter the results to only include entries from that latest year
4. Aggregate and display as before

```text
Changes in src/components/IncomeVsExpensesChart.tsx:

- Remove .gte('date', `${currentYear}-01-01`) and .lte('date', `${currentYear}-12-31`)
- Fetch all income/expenses for the user
- Determine latestYear from the fetched data
- Filter locally by that year before aggregating
```

---

## Technical Details

### Current Code (lines 24-40)
```typescript
const currentYear = new Date().getFullYear();

const { data: incomeData } = await supabase
  .from('income')
  .select('amount, date')
  .eq('user_id', user.id)
  .gte('date', `${currentYear}-01-01`)
  .lte('date', `${currentYear}-12-31`);

const { data: expensesData } = await supabase
  .from('expenses')
  .select('amount, date')
  .eq('user_id', user.id)
  .gte('date', `${currentYear}-01-01`)
  .lte('date', `${currentYear}-12-31`);
```

### Updated Code
```typescript
// Fetch all income (no year filter)
const { data: incomeData } = await supabase
  .from('income')
  .select('amount, date')
  .eq('user_id', user.id);

// Fetch all expenses (no year filter)
const { data: expensesData } = await supabase
  .from('expenses')
  .select('amount, date')
  .eq('user_id', user.id);

// Determine the latest year from the data
const allDates = [
  ...(incomeData || []).map(item => new Date(item.date).getFullYear()),
  ...(expensesData || []).map(item => new Date(item.date).getFullYear()),
];
const latestYear = allDates.length > 0 ? Math.max(...allDates) : new Date().getFullYear();

// Filter data to only include the latest year
const filteredIncome = incomeData?.filter(item => 
  new Date(item.date).getFullYear() === latestYear
) || [];

const filteredExpenses = expensesData?.filter(item => 
  new Date(item.date).getFullYear() === latestYear
) || [];
```

Then use `filteredIncome` and `filteredExpenses` in the aggregation logic instead of `incomeData` and `expensesData`.

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/IncomeVsExpensesChart.tsx` | Update data fetching to auto-detect latest year with data |

---

## Expected Outcome

After this change:
- Logging in as `savio@test.com` will show the seeded 2025 data in the "Monthly Income vs. Expenses" chart
- For users with current-year data, the chart will display their latest year automatically
- No empty chart states for users who have historical data

