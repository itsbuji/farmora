# Pagination Implementation Plan

## Scope

Add pagination to list/table GET endpoints across the app.

---

## Backend: Add Pagination (6 endpoints)

These controllers/services currently use `Model.findAll()` without pagination:

| # | Endpoint | Controller File | Service File |
|---|---|---|---|
| 1 | `GET /api/general-expenses` | `backend/src/controllers/general-expense.controller.js` | `backend/src/services/general-expense.service.js` |
| 2 | `GET /api/general-sales` | `backend/src/controllers/expense-sales.controller.js` | `backend/src/services/expense-sales.service.js` |
| 3 | `GET /api/items/purchase-book` | `backend/src/controllers/purchase.controller.js` | `backend/src/services/purchase.service.js` |
| 4 | `GET /api/purchases/purchase-book` | same as #3 | same as #3 |
| 5 | `GET /api/sales/ledger` | `backend/src/controllers/sales.controller.js` | `backend/src/services/sales.service.js` |

**Pattern to follow** (from `user.controller.js`):
```js
// Controller
const getAll = async (req, res) => {
  const filter = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
  }
  // ... other filters ...
  const result = await service.getAll(filter, req.user)
  res.success(result, { message: '...' })
}
```

```js
// Service — switch from findAll to findAndCountAll
const { count, rows } = await Model.findAndCountAll({ where, limit, offset, ... })
return { page, limit, total: count, data: rows }
```

---

## Backend: No Changes (already paginated — 13 endpoints)

- `GET /api/users`
- `GET /api/farms`
- `GET /api/packages`
- `GET /api/subscriptions`
- `GET /api/roles`
- `GET /api/seasons`
- `GET /api/batches`
- `GET /api/vendors`
- `GET /api/items/categories`
- `GET /api/items` / `GET /api/purchases`
- `GET /api/item-returns`
- `GET /api/sales`

---

## Backend: No Pagination (skip — 25 endpoints)

| Reason | Endpoints |
|---|---|
| Get-by-id (13) | `GET /:id` for users, farms, packages, roles, seasons, batches, vendors, items/categories, items/purchases, item-returns, sales, general-expenses, general-sales |
| Dropdown/names (8) | `vendors/names`, `seasons/names`, `batches/names`, `farms/names`, `items/categories/names`, `items/categories/names/:vendor_id`, `packages/names` |
| Dashboard (2) | `dashboard/admin`, `dashboard/manager` |
| Overview (2) | `overview/batch`, `overview/season` |
| Report (1) | `balance-sheet` |
| Config (1) | `invoice` |
| Static lookup (1) | `permissions` |
| Aggregated (2) | `integration-book`, `working-costs` |

---

## Frontend: Changes Needed

### 1. Build a Pagination UI Component
Create `frontend/src/components/pagination.tsx` — reusable pagination bar (page numbers, prev/next, total count).

### 2. Extend the Pagination Hook
The existing `useGetPaginatedData` at `frontend/src/hooks/use-get-paginated-data.ts` needs to:
- Accept and pass `page`/`limit` params to the API call
- Expose `setPage`, `setLimit` controls
- Return `{ data, page, limit, total, totalPages, isLoading, setPage, setLimit }`

### 3. Update All 18 List Pages to Pass `page`/`limit`

| Page | API File | Component |
|---|---|---|
| Vendors | `frontend/src/api/vendor.api.ts` | `vendors/page.tsx` |
| Seasons | `frontend/src/api/seasons.api.ts` | `seasons/components/table.tsx` |
| Subscriptions | `frontend/src/api/subscription.api.ts` | `subscriptions/components/table.tsx` |
| Purchases | `frontend/src/pages/purchases/api.ts` | `purchases/index.tsx` |
| Items/Categories | `frontend/src/pages/items/api.ts` | `items/page.tsx` |
| Batches | `frontend/src/pages/batches/api.ts` | `batches/index.tsx` |
| Farms | `frontend/src/pages/farms/api.ts` | `farms/index.tsx` |
| Users/Employees | `frontend/src/pages/employees/api.ts` | `employees/page.tsx` |
| Sales | `frontend/src/api/sales.api.ts` | `sales/sale/index.tsx` |
| Item Returns | `frontend/src/api/item-return.api.ts` | `item-returns/components/table.tsx` |
| General Expenses | `frontend/src/api/general-expense.api.ts` | `general-expense/index.tsx` |
| General Sales | `frontend/src/api/general-sales.api.ts` | `general-sales/components/table.tsx` |
| Integration Book | `frontend/src/pages/integration-book/api.ts` | `integration-book/index.tsx` |
| Working Costs | `frontend/src/api/working-cost.api.ts` | `working-cost/index.tsx` |
| Purchase Book | `frontend/src/api/purchase-book.api.ts` | `purchase-book/index.tsx` |
| Sales Ledger | `frontend/src/api/sales-book.api.ts` | `sales-book/components/table.tsx` |

Each page needs to:
- Add `page`/`limit` state
- Pass `page`/`limit` in the API call query params
- Add the Pagination component below the table

### 4. Type Alignment
Ensure all API response types use `ListResponse<T>` (defined at `frontend/src/types/response.types.ts`).

---

## Work Breakdown

| Layer | Changes | Files |
|---|---|---|
| Backend controllers | Add `page`/`limit` parse to 4 controller files | 4 |
| Backend services | Switch `findAll` → `findAndCountAll` for 4 services | 4 |
| Frontend component | Create `<Pagination>` UI component | 1 new |
| Frontend hook | Extend `useGetPaginatedData` with page controls | 1 modify |
| Frontend pages | Wire `page`/`limit` + Pagination component | ~18 files |
