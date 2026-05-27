import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface StockLevel {
  name: string;
  current: number;
  target: number;
}

interface StockLevelsProps {
  stocks: StockLevel[];
}

export const StockLevels = ({ stocks }: StockLevelsProps) => {
  const theme = useTheme();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Stock Levels
        </Typography>
        {stocks.map((stock, index) => {
          const percentage = (stock.current / stock.target) * 100;
          const isLow = percentage < 50;

          return (
            <Box key={index} sx={{ mb: index !== stocks.length - 1 ? 3 : 0 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {stock.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stock.current} / {stock.target}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.min(percentage, 100)}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: `${theme.palette.divider}`,
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    bgcolor: isLow
                      ? theme.palette.error.main
                      : theme.palette.primary.main,
                  },
                }}
              />
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};
