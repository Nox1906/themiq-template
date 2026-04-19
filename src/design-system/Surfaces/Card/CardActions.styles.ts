import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
    borderTop: `1px solid ${theme.palette.neutral["100"] ?? theme.palette.neutral.light}`,
    gap: theme.spacing(1),
  },
}));