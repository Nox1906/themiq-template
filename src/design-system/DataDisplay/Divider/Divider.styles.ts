import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    borderColor: theme.palette.neutral["100"] ?? theme.palette.neutral.light,
  },
}));