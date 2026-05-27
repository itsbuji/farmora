import { createTheme } from "@mui/material/styles";

// Primary green colors from Tailwind (used in landing/login)
const greenColors = {
  50: "#f0fdf4",
  100: "#dcfce7",
  200: "#bbf7d0",
  300: "#86efac",
  400: "#4ade80",
  500: "#22c55e",
  600: "#16a34a", // Primary green
  700: "#15803d", // Hover green
  800: "#166534",
  900: "#14532d",
};

// Create the theme
export const theme = createTheme({
  palette: {
    primary: {
      main: greenColors[600], // #16a34a
      light: greenColors[500],
      dark: greenColors[700], // #15803d
      contrastText: "#ffffff",
    },
    secondary: {
      main: greenColors[700],
      light: greenColors[600],
      dark: greenColors[800],
      contrastText: "#ffffff",
    },
    success: {
      main: greenColors[600],
      light: greenColors[500],
      dark: greenColors[700],
    },
    background: {
      default: "#f9fafb", // gray-50
      paper: "#ffffff",
    },
    text: {
      primary: "#111827", // gray-900
      secondary: "#6b7280", // gray-500
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none", // Don't uppercase buttons
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12, // Rounded corners matching the design
  },
  shadows: [
    "none", // 0
    "none", // 1 - Remove shadows by default
    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", // 2
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", // 3
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", // 4
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", // 5
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", // 6
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", // 7
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 8
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 9
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 10
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 11
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 12
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 13
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 14
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 15
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 16
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 17
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 18
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 19
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 20
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 21
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 22
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 23
    "0 25px 50px -12px rgb(0 0 0 / 0.25)", // 24
  ],
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Remove shadows from buttons
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 500,
          padding: "10px 24px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        containedPrimary: {
          backgroundColor: greenColors[600],
          color: "#ffffff",
          "&:hover": {
            backgroundColor: greenColors[700],
          },
        },
        outlined: {
          borderColor: greenColors[600],
          color: greenColors[600],
          "&:hover": {
            borderColor: greenColors[700],
            backgroundColor: `${greenColors[600]}08`,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            "& fieldset": {
              borderColor: "#d1d5db", // gray-300
            },
            "&:hover fieldset": {
              borderColor: greenColors[600],
            },
            "&.Mui-focused fieldset": {
              borderColor: greenColors[600],
              borderWidth: "2px",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        filled: {
          backgroundColor: greenColors[100],
          color: greenColors[800],
          "&:hover": {
            backgroundColor: greenColors[200],
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#f9fafb", // gray-50
          fontWeight: 600,
          color: "#111827", // gray-900
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&.Mui-selected": {
            backgroundColor: greenColors[50],
            color: greenColors[700],
            "&:hover": {
              backgroundColor: greenColors[100],
            },
          },
          "&:hover": {
            backgroundColor: greenColors[50],
          },
        },
      },
    },
  },
});

export default theme;
