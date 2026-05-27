import { Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@mui/material/styles";

interface SalesChartProps {
  data: Array<{
    name: string;
    sales: number;
    expenses: number;
    profit: number;
  }>;
}

export const SalesChart = ({ data }: SalesChartProps) => {
  const theme = useTheme();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Sales Overview
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
            />
            <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: theme.shape.borderRadius,
              }}
            />
            <Legend />
            <Bar
              dataKey="sales"
              fill={theme.palette.primary.main}
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              fill={theme.palette.error.main}
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="profit"
              fill={theme.palette.success.main}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
