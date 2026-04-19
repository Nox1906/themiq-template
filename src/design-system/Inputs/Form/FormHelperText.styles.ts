import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.palette.neutral.main,
    marginLeft: 0,
    "&.Mui-error": {
      color: theme.palette.error.main,
    },
  },
}));