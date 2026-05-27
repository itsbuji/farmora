export type WorkingCostRecord = {
  id: number;
  season_id: number;
  master_id: number;
  date: string;
  purpose: string;
  amount: number;
  payment_type: "income" | "expense";
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
};

export type WorkingCostFilterRequest = {
  season_id: number | null;
  start_date: string;
  end_date: string;
};

export type WorkingCostListResponse = {
  income: WorkingCostRecord[];
  expense: WorkingCostRecord[];
};

export type NewWorkingCostRequest = {
  season_id: number | null;
  purpose: string;
  amount: number | string;
  date: string;
  payment_type: "income" | "expense";
};

export type EditWorkingCostRequest = Partial<NewWorkingCostRequest> & {
  id: number;
};

export type EditWorkingCostPayload = Omit<EditWorkingCostRequest, "id">;
