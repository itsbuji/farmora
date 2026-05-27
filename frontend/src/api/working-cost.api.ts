import type {
  WorkingCostListResponse,
  NewWorkingCostRequest,
} from "@app-types/working-cost.types";
import fetcher from "@utils/fetcher";

const workingCost = {
  fetchAll: (filter: {
    season_id: number;
    start_date?: string;
    end_date?: string;
  }): Promise<WorkingCostListResponse> => {
    const opts = {
      method: "GET" as const,
      filter: filter,
    };
    return fetcher("working-costs", null, opts);
  },
  create: async (payload: NewWorkingCostRequest) =>
    await fetcher("working-costs", JSON.stringify(payload), { method: "POST" }),
};

export default workingCost;
