import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    fontSize: theme.typography.caption.fontSize,
    "& .MuiBreadcrumbs-separator": {
      color: theme.palette.neutral.main,
    },
    "& a": {
      color: theme.palette.primary.main,
      textDecoration: "none",
      fontWeight: 500,
      "&:hover": {
        textDecoration: "underline",
        color: theme.palette.primary.dark,
      },
    },
  },
}));