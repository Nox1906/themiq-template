import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    borderRadius: theme.shape.sm,
    fontSize: theme.typography.body2.fontSize,
    "&.MuiAlert-standardSuccess": {
      backgroundColor:
        theme.palette.success["0"] ?? theme.palette.success.light,
      color: theme.palette.success.dark,
    },
    "&.MuiAlert-standardError": {
      backgroundColor: theme.palette.error["0"] ?? theme.palette.error.light,
      color: theme.palette.error.dark,
    },
    "&.MuiAlert-standardWarning": {
      backgroundColor:
        theme.palette.warning["0"] ?? theme.palette.warning.light,
      color: theme.palette.warning.dark,
    },
    "&.MuiAlert-standardInfo": {
      backgroundColor:
        theme.palette.primary["0"] ?? theme.palette.primary.light,
      color: theme.palette.primary.dark,
    },
  },
}));
