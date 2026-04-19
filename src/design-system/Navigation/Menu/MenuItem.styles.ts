import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    borderRadius: theme.shape.xs,
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette["neutral-dark"].main,
    minHeight: 36,
    "&:hover": {
      backgroundColor: theme.palette.primary["0"] ?? theme.palette.primary.light,
      color: theme.palette.primary.dark,
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary["0"] ?? theme.palette.primary.light,
      color: theme.palette.primary.main,
      fontWeight: 500,
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
}));