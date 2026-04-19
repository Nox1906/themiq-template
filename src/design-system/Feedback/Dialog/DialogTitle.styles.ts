import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    padding: `${theme.spacing(3)} ${theme.spacing(3)} ${theme.spacing(1)}`,
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.palette["neutral-dark"].main,
  },
}));
