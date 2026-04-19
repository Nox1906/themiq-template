import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.neutral["100"] ?? theme.palette.neutral.light}`,
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.primary.main,
      height: 3,
      borderRadius: `${theme.shape.xs}px ${theme.shape.xs}px 0 0`,
    },
  },
}));
