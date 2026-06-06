# Farmora Frontend — UI Inconsistency Report

> Generated from reading the entire frontend codebase.

---

## Architecture Overview

- **Stack**: React 19 + TypeScript + Vite 7 + MUI 7 + Tailwind v4
- **State**: Auth via Context/useReducer, server state via TanStack React Query 5
- **Forms**: React Hook Form 7 (two patterns — `register()` directly vs `RHFTextField` Controller)
- **Dialogs**: Custom HTML/CSS component (not MUI Dialog)
- **Tables**: Custom HTML `<table>` components
- **Styling**: Hybrid MUI `sx` + Tailwind `className` + occasional inline styles

---

## A. Form Handling Patterns (3 approaches in use)

### Pattern 1: `register()` + MUI `<TextField>` (old)
| File | Lines |
|------|-------|
| `src/pages/vendors/components/form.tsx` | 13–82 |
| `src/pages/sales/sale/components/form.tsx` | 121–237 |
| `src/pages/working-cost/components/form.tsx` | 96–108 (uses RHFTextField with select) |
| `src/pages/purchases/components/form.tsx` | 316–331 (register on TextField select) |

### Pattern 2: `RHFTextField` Controller wrapper (newer)
| File | Lines |
|------|-------|
| `src/pages/seasons/components/form.tsx` | 47–55 |
| `src/pages/purchases/components/form.tsx` | 176–184 |
| `src/pages/general-expense/components/form.tsx` | 70–85 |
| `src/pages/integration-book/components/form.tsx` | 65–71 |

### Pattern 3: Plain `<input>` (no MUI, no RHFTextField)
| File | Lines |
|------|-------|
| `src/pages/login/index.tsx` | 60–82 |

**Impact**: Login page looks completely different from all other forms (no MUI styling, no green focus ring, different spacing/padding).

---

## B. Dialog Patterns (custom vs MUI)

- **All CRUD pages**: Use custom `@components/dialog/Dialog.tsx` — pure HTML/CSS overlay with `bg-black/50` backdrop, `max-w-md` width, no transitions
- **`src/pages/purchase-book/index.tsx:108–160`**: Inlines dialog form directly in page (not a separate component), with a "Close" cancel button using `variant="default"` which **doesn't exist in MUI**

---

## C. Page Header / Spacing Inconsistencies

### Pages WITH `mb-6` on the header row
| File | Line |
|------|------|
| `src/pages/working-cost/index.tsx` | 24 |
| `src/pages/integration-book/index.tsx` | 25 |
| `src/pages/general-expense/index.tsx` | 35 |
| `src/pages/sales-book/index.tsx` | 15 |
| `src/pages/purchase-book/index.tsx` | 98 |
| `src/pages/general-sales/index.tsx` | 17 |
| `src/pages/overview/batch/index.tsx` | 7 |
| `src/pages/overview/season/index.tsx` | 7 |

### Pages WITHOUT `mb-6` (table has `mt-6` instead)
| File |
|------|
| `src/pages/seasons/index.tsx` (17–24) |
| `src/pages/vendors/page.tsx` |
| `src/pages/batches/index.tsx` |
| `src/pages/items/page.tsx` |
| `src/pages/purchases/index.tsx` |
| `src/pages/sales/sale/index.tsx` |
| `src/pages/subscriptions/index.tsx` |

---

## D. Filter Wrapper Inconsistencies

| Style | Files |
|-------|-------|
| `<FilterWrapper>` inside `<Card>` | `purchases/components/filter.tsx` |
| Raw div with same Tailwind classes (no FilterWrapper / no Card) | `working-cost`, `integration-book`, `general-expense`, `sales/sale`, `overview/batch`, `overview/season` |

---

## E. Table Wrapper Inconsistencies

| Style | Files |
|-------|-------|
| `<Card>` wrapping `<Table>` | `purchases`, `working-cost`, `integration-book` |
| No Card wrapper | `seasons`, `vendors`, `batches`, `items`, `sales`, `general-expense`, `general-sales`, `purchase-book` |

---

## F. Loading State Patterns (3 different approaches)

| Approach | Files |
|----------|-------|
| `<DataLoading />` custom component | `seasons/components/table.tsx:38`, `sales/sale/components/table.tsx:54` |
| `<CircularProgress />` from MUI | `dashboard/index.tsx:25`, `dashboard/manager/index.tsx:21` |
| No loading state at all | `purchases`, `working-cost`, `integration-book`, `general-expense`, `general-sales`, `vendors`, `batches`, `items`, `purchase-book`, `sales-book` |

---

## G. Status Display Inconsistencies

- **`sales/sale/components/table.tsx:78–87`**: Custom styled `<span>` with `px-2 py-1 rounded text-xs` and conditional colors (green-100/green-800 for cash, yellow-100/yellow-800 for credit)
- **All other tables**: Plain raw text rendering (e.g., `seasons/components/table.tsx:50` renders `season.status` as-is)

---

## H. Data Fetching Patterns (5 different approaches)

| Approach | Used By |
|----------|---------|
| Custom hooks per entity (`useGet*`, `useAdd*`, `useEdit*`) | `vendors`, `batches`, `items`, `purchases`, `seasons` |
| Generic hooks (`useGetAll`, `useAddForm`, `useEditForm`) | `seasons`, `general-sales` |
| `useGetPaginatedData` | `sales` |
| Inline fetch with `fetcherV2` | `purchase-book/index.tsx:54` |
| Custom event bus for refetch (`document.addEventListener` / `CustomEvent`) | `general-expense`, `overview/batch`, `overview/season` |

---

## I. Button Inconsistencies

- **All pages**: `<Button variant="contained">` — consistent **except**:
- **`purchase-book/index.tsx:151`**: `<Button variant="default">` — **invalid MUI prop** (should be `"outlined"` or `"text"`)
- **`sales/sale/components/filter.tsx:112`**: `<Button size="small">search</Button>` — lowercase "search" vs "Apply Filters" used everywhere else

---

## J. Missing Cancel/Close Button in Dialogs

- **All CRUD add/edit dialogs**: Only have `<Button variant="contained" type="submit">Submit</Button>` — **no Cancel button**
- **Only exception**: `purchase-book/index.tsx:151` has a Close button (but it uses the wrong variant)

---

## K. BUG: Price Card Component

**File**: `src/components/price-card.tsx:19`

```tsx
className={`text-3xl font-bold tracking-tight,
  value > 0 ? " text-green-600" : " text-red-600"`}
```

The `value > 0` expression is inside template literal but evaluated as **string**, not JS expression. The class will always render both "text-green-600" and "text-red-600". Needs to use `${}` interpolation.

---

## L. Dashboard Styling Divergence

| Dashboard | Styling Approach |
|-----------|-----------------|
| **Admin** (`dashboard/index.tsx`) | MUI `sx` prop, MUI `Grid`, MUI `Typography`, MUI `Box` |
| **Manager** (`dashboard/manager/index.tsx`) | Pure Tailwind classes, native HTML tags, inline SVG icons, custom gradients |

These two dashboards look and feel completely different.

---

## M. Typography Inconsistencies

| Context | Style |
|---------|-------|
| Page titles (`PageTitle` component) | `text-2xl font-semibold text-gray-900` |
| Admin dashboard heading | `<Typography variant="h4" sx={{ fontWeight: 700 }}>` |
| Manager dashboard heading | `<h1 className="text-3xl font-bold text-slate-800">` |
| Section headings in tables | `<h2 className="text-xl font-semibold mb-4 text-gray-800">` |

---

## N. Edit Data Loading Patterns

| Guard Pattern | Used By |
|---------------|---------|
| `<Ternary when={dataLoaded}>` | `seasons/components/edit.tsx:32–41` |
| `{dataLoaded ? <Form /> : null}` | `vendors/components/edit.tsx:33–38` |
| No guard (passes data directly) | `integration-book/components/edit.tsx:37–41` |
| Inline `useEffect` fetch (no custom hook) | `general-expense/components/edit.tsx:36–56`, `sales/sale/components/edit.tsx:60–76` |

---

## O. BUG: Working Cost Payment Type Labels

**File**: `src/pages/working-cost/components/form.tsx:104`

```tsx
<MenuItem value="income">Expense</MenuItem>
<MenuItem value="expense">Income</MenuItem>
```

Labels and values are **swapped**. Selecting "Expense" sends `income`, selecting "Income" sends `expense`.

---

## P. BUG: Duplicate setErrors Call

**File**: `src/pages/general-expense/components/edit.tsx:69–70`

```tsx
setErrors(res.error);
setErrors(res.error);  // duplicate
```

---

## Q. Commented-Out / Dead Code

| File | Lines | Description |
|------|-------|-------------|
| `integration-book/components/form.tsx` | 89–100 | Commented-out payment type select |
| `sales/sale/components/edit.tsx` | 38–56 | Commented-out react-query imports and hooks |

---

## R. Console Logs in Production Code

| File | Line | Statement |
|------|------|-----------|
| `src/pages/purchases/components/table.tsx` | 63 | `console.log(item)` |
| `src/pages/working-cost/components/table.tsx` | 21 | `console.log(income, expense, totals)` |
| `src/pages/sales/sale/components/edit.tsx` | 91 | `console.log(methods.watch())` |

---

## S. Missing Edit Capability

- **`working-cost/index.tsx`**: Has `AddWorkingCost` but **no edit** (no `EditWorkingCost` import or dialog)
- **`purchase-book/index.tsx`**: Has add but no edit
- **`sales-book/index.tsx`**: Has add but no edit

---

## T. Responsive Issues

- Custom `Dialog` (`dialog/Dialog.tsx`) uses `max-w-md` — may be too narrow on larger screens
- `FilterWrapper` (`filter-wrapper.tsx`) has no responsive breakpoints
- Login page uses `hidden lg:flex` for hero — may not handle all tablet sizes
- Some filter grids use `md:grid-cols-3` or `md:grid-cols-6` without proper handling for small screens

---

## U. Color Scheme Deviations

| Component | Color Used | Notes |
|-----------|-----------|-------|
| `TableHeaderCell` | `bg-green-600 text-white` | Hardcoded, not using theme token |
| Sidebar active | `!bg-green-50 !text-green-700` | Consistent but bypasses MUI theme |
| Manager dashboard | `text-slate-800`, `text-slate-500` | Introduces "slate" (gray family deviation) |
| Manager dashboard | `text-emerald-300`, `text-rose-300` | Introduces emerald/rose (outside green palette) |

---

## V. Fetcher System Inconsistency

| Fetcher | Behavior |
|---------|----------|
| `fetcher.ts` | Throws `ValidationError` / `NetworkError` |
| `fetcherV2.ts` | Returns `{ status, data, error }` object (no throw) |

Both are used across the codebase. Pages using custom hooks tend to use `fetcher.ts` (throwing), while pages using `fetcherV2` handle responses inline with `if (res.status === "success")`.

---

## Priority Summary

| Priority | Issue |
|----------|-------|
| 🔴 High | `price-card.tsx` class bug (K) |
| 🔴 High | Working cost payment type swapped labels (O) |
| 🔴 High | `purchase-book` invalid `variant="default"` (I) |
| 🟠 Medium | 3 different form patterns across app (A) |
| 🟠 Medium | No cancel button in most dialogs (J) |
| 🟠 Medium | Dashboard divergence (L) |
| 🟠 Medium | Missing edit on working-cost, purchase-book, sales-book (S) |
| 🟠 Medium | No loading states on most pages (F) |
| 🟡 Low | Console logs in production (R) |
| 🟡 Low | Commented-out code blocks (Q) |
| 🟡 Low | Duplicate `setErrors` call (P) |
| 🟡 Low | Color scheme deviations (U) |
