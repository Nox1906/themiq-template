import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    color: theme.palette.neutral["300"] ?? theme.palette.neutral.main,
    "&.Mui-checked": {
      color: theme.palette.primary.main,
    },
    "&.Mui-disabled": {
      color: theme.palette.disabled.contrastText,
    },
  },
}));
