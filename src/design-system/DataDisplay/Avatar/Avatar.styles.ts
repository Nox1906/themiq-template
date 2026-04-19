import { createStyles } from "../../utils";

export default createStyles((theme) => ({
  root: {
    borderRadius: theme.shape.full,
    backgroundColor:
      theme.palette.primary["100"] ?? theme.palette.primary.light,
    color: theme.palette.primary.dark,
    fontWeight: 600,
    fontSize: theme.typography.body2.fontSize,
  },
}));
