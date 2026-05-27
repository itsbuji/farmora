// Utility functions to generate random data for dashboard

export const generateSalesData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months.map((month) => ({
    name: month,
    sales: Math.floor(Math.random() * 50000) + 20000,
    expenses: Math.floor(Math.random() * 30000) + 10000,
    profit: Math.floor(Math.random() * 20000) + 5000,
  }));
};

export const generateItemDistribution = () => {
  const categories = [
    "Seeds",
    "Fertilizers",
    "Equipment",
    "Pesticides",
    "Tools",
  ];
  return categories.map((category) => ({
    name: category,
    value: Math.floor(Math.random() * 1000) + 100,
  }));
};

export const generateBatchStatus = () => {
  return [
    { name: "Active", value: Math.floor(Math.random() * 20) + 10 },
    { name: "Completed", value: Math.floor(Math.random() * 50) + 20 },
    { name: "Pending", value: Math.floor(Math.random() * 15) + 5 },
  ];
};

export const generateRecentActivity = () => {
  const activities = [
    "New batch created",
    "Item purchased from vendor",
    "Season started",
    "Item returned",
    "Employee added",
    "Subscription renewed",
  ];

  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    activity: activities[Math.floor(Math.random() * activities.length)],
    time: `${Math.floor(Math.random() * 24)}h ago`,
    value: `₹${Math.floor(Math.random() * 10000) + 1000}`,
  }));
};

export const generateStockLevels = () => {
  const items = [
    "Rice Seeds",
    "Wheat Seeds",
    "Corn Seeds",
    "Fertilizer A",
    "Fertilizer B",
    "Pesticide X",
  ];
  return items.map((item) => ({
    name: item,
    current: Math.floor(Math.random() * 500) + 100,
    target: Math.floor(Math.random() * 300) + 600,
  }));
};

export const generateStats = () => ({
  totalRevenue: Math.floor(Math.random() * 500000) + 100000,
  totalOrders: Math.floor(Math.random() * 500) + 100,
  activeBatches: Math.floor(Math.random() * 30) + 10,
  totalItems: Math.floor(Math.random() * 1000) + 200,
});
