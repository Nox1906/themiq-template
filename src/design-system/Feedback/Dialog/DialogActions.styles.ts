import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    borderTop: `1px solid ${theme.palette.neutral["100"] ?? theme.palette.neutral.light}`,
    gap: theme.spacing(1),
  },
}));