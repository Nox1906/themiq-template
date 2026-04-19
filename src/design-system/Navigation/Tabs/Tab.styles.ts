import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    fontWeight: 500,
    fontSize: theme.typography.body2.fontSize,
    textTransform: theme.typography.button.textTransform,
    letterSpacing: theme.typography.button.letterSpacing,
    color: theme.palette.neutral.main,
    "&.Mui-selected": {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  },
}));
