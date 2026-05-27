import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800 text-xs">
        <p className="font-bold mb-1">{label}</p>
        <p className="text-green-400">
          Value:{" "}
          <span className="text-white">
            ₹{Number(payload[0].value).toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export const BatchChart = ({
  data,
}: {
  data: { name: string; value: number }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f1f5f9"
        />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          minTickGap={20}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(val) => `₹{val / 1000}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#16a34a"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorValue)"
          dot={{ r: 4, fill: "#16a34a", strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const SeasonChart = ({
  data,
}: {
  data: { name: string; revenue: number; expense: number }[];
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f1f5f9"
        />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(val) => `₹{val / 1000}k`}
        />
        <Tooltip
          cursor={{ fill: "#f8fafc" }}
          contentStyle={{
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
          }}
        />
        <Legend verticalAlign="top" height={36} iconType="circle" />
        <Bar
          dataKey="revenue"
          fill="#16a34a"
          radius={[4, 4, 0, 0]}
          barSize={24}
        />
        <Bar
          dataKey="expense"
          fill="#f43f5e"
          radius={[4, 4, 0, 0]}
          barSize={24}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const PerformanceCharts = { BatchChart, SeasonChart };

export default PerformanceCharts;
