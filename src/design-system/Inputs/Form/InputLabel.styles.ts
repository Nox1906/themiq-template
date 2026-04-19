import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.neutral.main,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
    "&.Mui-error": {
      color: theme.palette.error.main,
    },
  },
}));
