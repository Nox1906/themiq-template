import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    padding: `${theme.spacing(1)} ${theme.spacing(2)} ${theme.spacing(2)}`,
    borderTop: `1px solid ${theme.palette.neutral["100"] ?? theme.palette.neutral.light}`,
    color: theme.palette.neutral.dark,
    fontSize: theme.typography.body2.fontSize,
  },
}));