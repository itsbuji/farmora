import type {
  ManagerDashboardData,
  AdminDashboardData,
} from "@app-types/dashboard.types";
import fetcher from "@utils/fetcher";

const dashboard = {
  fetchManagerDashboard: (): Promise<ManagerDashboardData> => {
    return fetcher("dashboard/manager");
  },
  fetchAdminDashboard: (): Promise<AdminDashboardData> => {
    return fetcher("dashboard/admin");
  },
};

export default dashboard;
