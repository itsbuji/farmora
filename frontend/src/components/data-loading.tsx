import { useTheme, alpha } from "@mui/material";

const DataLoading = () => {
  const theme = useTheme();

  // Create a very light gray-tinted green (85% gray + 15% primary color)
  const iconColor = alpha(theme.palette.primary.main, 0.15);
  const textColor = alpha(theme.palette.primary.main, 0.2);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="mb-4" style={{ color: iconColor }}>
        <svg
          className="w-16 h-16 mx-auto animate-spin"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium mb-1" style={{ color: textColor }}>
        Loading...
      </h3>
      <p className="text-sm" style={{ color: alpha(textColor, 0.7) }}>
        Please wait while we fetch the data
      </p>
    </div>
  );
};

export default DataLoading;
